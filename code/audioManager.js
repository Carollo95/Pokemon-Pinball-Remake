// Centralized audio system

const MAX_SIMULTANEOUS_SFX = 12;
const SFX_POOL_SIZE = 4;
const MUSIC_FADE_MS = 300;
const MUSIC_DUCK_GAIN = 0.25;

class AudioManager {
    constructor() {
        this.registry = new Map();          // id -> { id, type, files: [p5.SoundFile], poolIndex, baseVolume, loop }
        this.currentMusic = null;
        this.musicId = null;
        this.mutedMusic = false;
        this.mutedSFX = false;
        this.pendingFade = null;

        // Web Audio graph (using p5.sound's audio context)
        this.ac = getAudioContext();
        this.masterGain = this.ac.createGain();
        this.musicGain = this.ac.createGain();
        this.sfxGain = this.ac.createGain();

        // Light compression on SFX bus to avoid harsh summing -> system limiter
        this.sfxCompressor = this.ac.createDynamicsCompressor();
        this.sfxCompressor.threshold.setValueAtTime(-18, this.ac.currentTime);
        this.sfxCompressor.knee.setValueAtTime(24, this.ac.currentTime);
        this.sfxCompressor.ratio.setValueAtTime(8, this.ac.currentTime);
        this.sfxCompressor.attack.setValueAtTime(0.003, this.ac.currentTime);
        this.sfxCompressor.release.setValueAtTime(0.25, this.ac.currentTime);

        this.musicGain.connect(this.masterGain);
        this.sfxGain.connect(this.sfxCompressor);
        this.sfxCompressor.connect(this.masterGain);
        this.masterGain.connect(this.ac.destination);

        this.masterGain.gain.value = 1;
        this.musicGain.gain.value = 1;
        this.sfxGain.gain.value = 1;

        this.activeSFXCount = 0;
        this.duckStack = 0;          // number of SFX that keep the music muted
        this.savedMusicGain = 1;     // original gain before first duck
    }

    resumeContext() {
        if (this.ac.state === 'suspended') {
            this.ac.resume();
        }
    }

    registerMusic(id, path, { loop = true, baseVolume = 0.6 } = {}) {
        this._register(id, path, 'music', loop, baseVolume);
    }

    registerSFX(id, path, { baseVolume = 0.5 } = {}) {
        this._register(id, path, 'sfx', false, baseVolume);
    }

    _register(id, path, type, loop, baseVolume) {
        if (this.registry.has(id)) return;
        // Pre-create pool
        const files = [];
        for (let i = 0; i < (type === 'sfx' ? SFX_POOL_SIZE : 1); i++) {
            const sf = loadSound(path + '.mp3');
            sf.playMode('restart');
            sf.setVolume(baseVolume);
            if (type === 'music') sf.setLoop(loop);
            files.push(sf);
        }
        this.registry.set(id, {
            id, type, files,
            poolIndex: 0,
            baseVolume,
            loop
        });
    }

    playMusic(id, { restart = true, fade = true } = {}) {
        if (this.mutedMusic) return;
        if (this.musicId === id && !restart) return;
        this.stopMusic({ fade });

        const entry = this.registry.get(id);
        if (!entry || entry.type !== 'music') return;

        const sf = entry.files[0];
        this.currentMusic = sf;
        this.musicId = id;
        this._routeToMusic(sf);
        if (fade) this._fadeIn(sf, MUSIC_FADE_MS);
        else sf.play();
    }

    stopMusic({ fade = true } = {}) {
        if (!this.currentMusic) return;
        const sf = this.currentMusic;
        if (fade) {
            const t0 = this.ac.currentTime;
            const g = this.musicGain.gain;
            g.cancelScheduledValues(t0);
            g.setValueAtTime(g.value, t0);
            g.linearRampToValueAtTime(0, t0 + MUSIC_FADE_MS / 1000);
            setTimeout(() => sf.stop(), MUSIC_FADE_MS);
        } else {
            sf.stop();
        }
        this.currentMusic = null;
        this.musicId = null;
    }

    playSFX(id, { allowOverlap = true, priority = 0 } = {}) {
        if (this.mutedSFX) return;
        const entry = this.registry.get(id);
        if (!entry || entry.type !== 'sfx') return;

        if (this.activeSFXCount >= MAX_SIMULTANEOUS_SFX) {
            // Basic priority handling: skip low priority
            if (priority <= 0) return;
        }

        const sf = this._nextSFXInstance(entry, allowOverlap);
        if (!sf) return;

        this._routeToSFX(sf);
        this.activeSFXCount++;
        sf.onended(() => {
            this.activeSFXCount = Math.max(0, this.activeSFXCount - 1);
        });
        sf.play();
    }

    interruptWithSFX(id, { duck = true } = {}) {
        const entry = this.registry.get(id);
        if (!entry || entry.type !== 'sfx') return;

        // Play SFX always (ignore limit for this case)
        const sf = this._nextSFXInstance(entry, true);
        if (!sf) return;
        this._routeToSFX(sf);
        this.activeSFXCount++;
        const prevEnd = sf._onended; // p5 keeps internal callback; we chain it

        sf.onended(() => {
            if (prevEnd) prevEnd();
            this.activeSFXCount = Math.max(0, this.activeSFXCount - 1);
            if (duck && this.currentMusic) {
                this.duckStack = Math.max(0, this.duckStack - 1);
                if (this.duckStack === 0) {
                    this._restoreMusic(this.savedMusicGain);
                }
            }
        });

        if (duck && this.currentMusic) {
            if (this.duckStack === 0) {
                // Save current gain and lower to 0
                this.savedMusicGain = this.musicGain.gain.value;
                this._duckMusicTo(0);
            }
            this.duckStack++;
        }

        sf.play();
    }

    _duckMusicTo(targetGain) {
        const t0 = this.ac.currentTime;
        const g = this.musicGain.gain;
        g.cancelScheduledValues(t0);
        g.setValueAtTime(g.value, t0);
        g.linearRampToValueAtTime(targetGain, t0 + 0.08);
    }

    _restoreMusic(originalGain) {
        const t0 = this.ac.currentTime;
        const g = this.musicGain.gain;
        g.cancelScheduledValues(t0);
        g.setValueAtTime(g.value, t0);
        g.linearRampToValueAtTime(originalGain, t0 + 0.25);
    }

    _nextSFXInstance(entry, allowOverlap) {
        if (!allowOverlap) {
            // Find an instance not playing
            const free = entry.files.find(f => !f.isPlaying());
            if (!free) return null;
            return free;
        }
        entry.poolIndex = (entry.poolIndex + 1) % entry.files.length;
        const sf = entry.files[entry.poolIndex];
        if (sf.isPlaying()) {
            sf.stop(); // restart for 'restart' semantic
        }
        return sf;
    }

    _fadeIn(sf, ms) {
        const t0 = this.ac.currentTime;
        const g = this.musicGain.gain;
        g.setValueAtTime(0, t0);
        sf.play();
        g.linearRampToValueAtTime(1, t0 + ms / 1000);
    }

    _routeToMusic(sf) {
        // p5 routes internally; adjust gain by connecting raw source is complex; rely on master gain with category
        sf.disconnect();
        sf.connect(this.musicGain);
    }

    _routeToSFX(sf) {
        sf.disconnect();
        sf.connect(this.sfxGain);
    }

    muteMusic(m) {
        this.mutedMusic = m;
        this.musicGain.gain.value = m ? 0 : 1;
    }

    muteSFX(m) {
        this.mutedSFX = m;
        this.sfxGain.gain.value = m ? 0 : 1;
    }
}


let Audio = null;

function getAudio() {
    if (!Audio) Audio = new AudioManager();
    return Audio;
}

// Preload registration function (call inside p5 preload)
function preloadAudioAssets() {
    const audio = getAudio();
    // Music
    audio.registerMusic('ghostGastly', 'assets/audio/GhostStage_Gastly_In_The_Graveyard');
    audio.registerMusic('ghostHaunter', 'assets/audio/GhostStage_Haunter_In_The_Graveyard');
    audio.registerMusic('ghostGengar', 'assets/audio/GhostStage_Gengar_In_The_Graveyard');
    audio.registerMusic('moleDiglett', 'assets/audio/MoleStage_Whack_the_Digletts', { loop: true });
    audio.registerMusic('moleDugtrio', 'assets/audio/MoleStage_Whack_Dugtrio', { loop: true });
    audio.registerMusic('catStage', 'assets/audio/CatStage_Meowth');

    // SFX
    audio.registerSFX('sfx00', 'assets/audio/sfx/SFX-00');
    audio.registerSFX('sfx01', 'assets/audio/sfx/SFX-01');
    audio.registerSFX('sfx02', 'assets/audio/sfx/SFX-02');
    audio.registerSFX('sfx03', 'assets/audio/sfx/SFX-03');
    audio.registerSFX('sfx04', 'assets/audio/sfx/SFX-04');
    audio.registerSFX('sfx05', 'assets/audio/sfx/SFX-05');
    audio.registerSFX('sfx06', 'assets/audio/sfx/SFX-06');
    audio.registerSFX('sfx07', 'assets/audio/sfx/SFX-07');
    audio.registerSFX('sfx08', 'assets/audio/sfx/SFX-08'); //Bonus scenario hit
    audio.registerSFX('sfx09', 'assets/audio/sfx/SFX-09');
    audio.registerSFX('sfx0A', 'assets/audio/sfx/SFX-0A');
    audio.registerSFX('sfx0B', 'assets/audio/sfx/SFX-0B');
    audio.registerSFX('sfx0C', 'assets/audio/sfx/SFX-0C'); //Flipper moved
    audio.registerSFX('sfx0D', 'assets/audio/sfx/SFX-0D');
    audio.registerSFX('sfx0E', 'assets/audio/sfx/SFX-0E');
    audio.registerSFX('sfx0F', 'assets/audio/sfx/SFX-0F');
    audio.registerSFX('sfx10', 'assets/audio/sfx/SFX-10');
    audio.registerSFX('sfx11', 'assets/audio/sfx/SFX-11');
    audio.registerSFX('sfx12', 'assets/audio/sfx/SFX-12');
    audio.registerSFX('sfx13', 'assets/audio/sfx/SFX-13');
    audio.registerSFX('sfx14', 'assets/audio/sfx/SFX-14');
    audio.registerSFX('sfx15', 'assets/audio/sfx/SFX-15');
    audio.registerSFX('sfx16', 'assets/audio/sfx/SFX-16');
    audio.registerSFX('sfx17', 'assets/audio/sfx/SFX-17');
    audio.registerSFX('sfx18', 'assets/audio/sfx/SFX-18');
    audio.registerSFX('sfx19', 'assets/audio/sfx/SFX-19');
    audio.registerSFX('sfx1A', 'assets/audio/sfx/SFX-1A');
    audio.registerSFX('sfx1B', 'assets/audio/sfx/SFX-1B');
    audio.registerSFX('sfx1C', 'assets/audio/sfx/SFX-1C');
    audio.registerSFX('sfx1D', 'assets/audio/sfx/SFX-1D');
    audio.registerSFX('sfx1E', 'assets/audio/sfx/SFX-1E');
    audio.registerSFX('sfx1F', 'assets/audio/sfx/SFX-1F');
    audio.registerSFX('sfx20', 'assets/audio/sfx/SFX-20');
    audio.registerSFX('sfx21', 'assets/audio/sfx/SFX-21');
    audio.registerSFX('sfx22', 'assets/audio/sfx/SFX-22');
    audio.registerSFX('sfx23', 'assets/audio/sfx/SFX-23');
    audio.registerSFX('sfx24', 'assets/audio/sfx/SFX-24');
    audio.registerSFX('sfx25', 'assets/audio/sfx/SFX-25');
    audio.registerSFX('sfx26', 'assets/audio/sfx/SFX-26');
    audio.registerSFX('sfx27', 'assets/audio/sfx/SFX-27');
    audio.registerSFX('sfx28', 'assets/audio/sfx/SFX-28');
    audio.registerSFX('sfx29', 'assets/audio/sfx/SFX-29');
    audio.registerSFX('sfx2A', 'assets/audio/sfx/SFX-2A'); //Bonus stage cleared
    audio.registerSFX('sfx2B', 'assets/audio/sfx/SFX-2B'); //Gengar step
    audio.registerSFX('sfx2C', 'assets/audio/sfx/SFX-2C'); //Gastly hurt
    audio.registerSFX('sfx2D', 'assets/audio/sfx/SFX-2D'); //Haunter hurt
    audio.registerSFX('sfx2E', 'assets/audio/sfx/SFX-2E'); //Gengar defated
    audio.registerSFX('sfx2F', 'assets/audio/sfx/SFX-2F'); //Hit gravestone
    audio.registerSFX('sfx30', 'assets/audio/sfx/SFX-30'); //Seel hurt
    audio.registerSFX('sfx31', 'assets/audio/sfx/SFX-31');
    audio.registerSFX('sfx32', 'assets/audio/sfx/SFX-32'); //Coin caught
    audio.registerSFX('sfx33', 'assets/audio/sfx/SFX-33'); //Meowth hurt
    audio.registerSFX('sfx34', 'assets/audio/sfx/SFX-34'); //Coin fell
    audio.registerSFX('sfx35', 'assets/audio/sfx/SFX-35'); //Diglett hurt
    audio.registerSFX('sfx36', 'assets/audio/sfx/SFX-36'); //Dugtrio hurt
    audio.registerSFX('sfx37', 'assets/audio/sfx/SFX-37'); //Gengar hurt
    audio.registerSFX('sfx38', 'assets/audio/sfx/SFX-38');
    audio.registerSFX('sfx39', 'assets/audio/sfx/SFX-39');
    audio.registerSFX('sfx3A', 'assets/audio/sfx/SFX-3A');
    audio.registerSFX('sfx3B', 'assets/audio/sfx/SFX-3B');
    audio.registerSFX('sfx3C', 'assets/audio/sfx/SFX-3C');
    audio.registerSFX('sfx3D', 'assets/audio/sfx/SFX-3D');
    audio.registerSFX('sfx3E', 'assets/audio/sfx/SFX-3E');
    audio.registerSFX('sfx3F', 'assets/audio/sfx/SFX-3F'); //Close gate on bonus level
    audio.registerSFX('sfx40', 'assets/audio/sfx/SFX-40');
    audio.registerSFX('sfx41', 'assets/audio/sfx/SFX-41');
    audio.registerSFX('sfx42', 'assets/audio/sfx/SFX-42');
    audio.registerSFX('sfx43', 'assets/audio/sfx/SFX-43');
    audio.registerSFX('sfx44', 'assets/audio/sfx/SFX-44');
    audio.registerSFX('sfx45', 'assets/audio/sfx/SFX-45');
    audio.registerSFX('sfx46', 'assets/audio/sfx/SFX-46');
    audio.registerSFX('sfx47', 'assets/audio/sfx/SFX-47');
    audio.registerSFX('sfx48', 'assets/audio/sfx/SFX-48');
    audio.registerSFX('sfx49', 'assets/audio/sfx/SFX-49');
    audio.registerSFX('sfx4A', 'assets/audio/sfx/SFX-4A');
    audio.registerSFX('sfx4B', 'assets/audio/sfx/SFX-4B');
    audio.registerSFX('sfx4C', 'assets/audio/sfx/SFX-4C');
    audio.registerSFX('sfx4D', 'assets/audio/sfx/SFX-4D');
    audio.registerSFX('sfx4E', 'assets/audio/sfx/SFX-4E'); //Gengar cry
}