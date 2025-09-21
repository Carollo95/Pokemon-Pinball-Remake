// Centralized audio system using native Web Audio API for performance.


class AudioManager {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.musicTracks = {};
        this.sfx = {};
        this.currentMusic = null;
        this.isMusicMuted = false;
        this.isSfxMuted = false;

        // Master gain nodes
        this.musicGain = this.audioContext.createGain();
        this.musicGain.connect(this.audioContext.destination);

        this.sfxGain = this.audioContext.createGain();
        this.sfxGain.connect(this.audioContext.destination);
    }

    async _loadAudio(path) {
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
            return audioBuffer;
        } catch (error) {
            console.error(`Failed to load audio: ${path}`, error);
            return null;
        }
    }

    registerMusic(id, path, { loop = true, baseVolume = MUSIC_VOLUME } = {}) {
        return this._loadAudio(`${path}.mp3`).then(buffer => {
            if (buffer) {
                this.musicTracks[id] = { buffer, loop, baseVolume };
            }
        });
    }

    registerSFX(id, path, { baseVolume = SFX_VOLUME } = {}) {
        return this._loadAudio(`${path}.mp3`).then(buffer => {
            if (buffer) {
                this.sfx[id] = { buffer, baseVolume };
            }
        });
    }

    // --- Playback Control ---


    playMusic(id, { restart = true, fade = true } = {}) {
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }

        if (this.currentMusic && this.currentMusic.id === id && !restart) {
            return; // Already playing and restart is false
        }

        this.stopMusic({ fade });

        const track = this.musicTracks[id];
        if (!track) {
            console.error(`Music track not found: ${id}`);
            return;
        }

        const source = this.audioContext.createBufferSource();
        source.buffer = track.buffer;
        source.loop = track.loop;

        const gainNode = this.audioContext.createGain();
        gainNode.connect(this.musicGain);

        source.connect(gainNode);
        source.start(0);

        if (fade) {
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(track.baseVolume, this.audioContext.currentTime + 1.0);
        } else {
            gainNode.gain.value = track.baseVolume;
        }

        this.currentMusic = { id, source, gainNode, baseVolume: track.baseVolume };
    }

    stopMusic({ fade = true } = {}) {
        if (!this.currentMusic) return;

        const music = this.currentMusic;
        this.currentMusic = null;

        if (fade) {
            music.gainNode.gain.setValueAtTime(music.gainNode.gain.value, this.audioContext.currentTime);
            music.gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 1.0);
            setTimeout(() => {
                // Checking if source is still valid before stopping
                if (music.source.context && music.source.context.state === 'running') {
                   music.source.stop();
                }
            }, 1000);
        } else {
            music.source.stop();
        }
    }

    playSFX(id) {
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }

        const sound = this.sfx[id];
        if (!sound) {
            console.error(`SFX not found: ${id}`);
            return;
        }

        const source = this.audioContext.createBufferSource();
        source.buffer = sound.buffer;

        const gainNode = this.audioContext.createGain();
        gainNode.gain.value = sound.baseVolume;

        source.connect(gainNode);
        gainNode.connect(this.sfxGain);
        source.start(0);
    }

    interruptWithSFX(id) {
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }

        const sound = this.sfx[id];
        if (!sound) {
            console.error(`SFX not found for interrupt: ${id}`);
            return;
        }

        const musicToResumeId = this.currentMusic ? this.currentMusic.id : null;
        if (musicToResumeId) {
            this.stopMusic({ fade: false });
        }

        const source = this.audioContext.createBufferSource();
        source.buffer = sound.buffer;
        const gainNode = this.audioContext.createGain();
        gainNode.gain.value = sound.baseVolume;
        source.connect(gainNode);
        gainNode.connect(this.sfxGain);

        source.onended = () => {
            if (musicToResumeId) {
                this.playMusic(musicToResumeId, { restart: true, fade: true });
            }
        };

        source.start(0);
    }


    // --- Mute Control ---

    muteMusic(mute) {
        this.isMusicMuted = mute;
        this.musicGain.gain.setValueAtTime(mute ? 0 : 1, this.audioContext.currentTime);
    }

    muteSFX(mute) {
        this.isSfxMuted = mute;
        this.sfxGain.gain.setValueAtTime(mute ? 0 : 1, this.audioContext.currentTime);
    }
}

// --- Singleton and Preload Setup ---

let Audio = null;

function getAudio() {
    if (!Audio) {
        Audio = new AudioManager();
    }
    return Audio;
}

function preloadAudioAssets() {
    const audio = getAudio();
    const promises = [];

    // Music
    promises.push(audio.registerMusic('ghostGastly', 'assets/audio/GhostStage_Gastly_In_The_Graveyard'));
    promises.push(audio.registerMusic('ghostHaunter', 'assets/audio/GhostStage_Haunter_In_The_Graveyard'));
    promises.push(audio.registerMusic('ghostGengar', 'assets/audio/GhostStage_Gengar_In_The_Graveyard'));
    promises.push(audio.registerMusic('moleDiglett', 'assets/audio/MoleStage_Whack_the_Digletts', { loop: true }));
    promises.push(audio.registerMusic('moleDugtrio', 'assets/audio/MoleStage_Whack_Dugtrio', { loop: true }));
    promises.push(audio.registerMusic('catStage', 'assets/audio/CatStage_Meowth'));
    promises.push(audio.registerMusic('sealStage', 'assets/audio/SealStage_Seel'));
    promises.push(audio.registerMusic('cloneStage', 'assets/audio/CloneStage_Mewtwo', { loop: true }));

    // SFX
    promises.push(audio.registerSFX('sfx00', 'assets/audio/sfx/SFX-00')); //Red stage ditto close
    promises.push(audio.registerSFX('sfx01', 'assets/audio/sfx/SFX-01'));
    promises.push(audio.registerSFX('sfx02', 'assets/audio/sfx/SFX-02'));
    promises.push(audio.registerSFX('sfx03', 'assets/audio/sfx/SFX-03'));
    promises.push(audio.registerSFX('sfx04', 'assets/audio/sfx/SFX-04'));
    promises.push(audio.registerSFX('sfx05', 'assets/audio/sfx/SFX-05'));
    promises.push(audio.registerSFX('sfx06', 'assets/audio/sfx/SFX-06'));
    promises.push(audio.registerSFX('sfx07', 'assets/audio/sfx/SFX-07'));
    promises.push(audio.registerSFX('sfx08', 'assets/audio/sfx/SFX-08')); //Bonus scenario hit
    promises.push(audio.registerSFX('sfx09', 'assets/audio/sfx/SFX-09'));
    promises.push(audio.registerSFX('sfx0A', 'assets/audio/sfx/SFX-0A'));
    promises.push(audio.registerSFX('sfx0B', 'assets/audio/sfx/SFX-0B'));
    promises.push(audio.registerSFX('sfx0C', 'assets/audio/sfx/SFX-0C')); //Flipper moved
    promises.push(audio.registerSFX('sfx0D', 'assets/audio/sfx/SFX-0D'));
    promises.push(audio.registerSFX('sfx0E', 'assets/audio/sfx/SFX-0E'));
    promises.push(audio.registerSFX('sfx0F', 'assets/audio/sfx/SFX-0F'));
    promises.push(audio.registerSFX('sfx10', 'assets/audio/sfx/SFX-10'));
    promises.push(audio.registerSFX('sfx11', 'assets/audio/sfx/SFX-11'));
    promises.push(audio.registerSFX('sfx12', 'assets/audio/sfx/SFX-12'));
    promises.push(audio.registerSFX('sfx13', 'assets/audio/sfx/SFX-13'));
    promises.push(audio.registerSFX('sfx14', 'assets/audio/sfx/SFX-14'));
    promises.push(audio.registerSFX('sfx15', 'assets/audio/sfx/SFX-15'));
    promises.push(audio.registerSFX('sfx16', 'assets/audio/sfx/SFX-16'));
    promises.push(audio.registerSFX('sfx17', 'assets/audio/sfx/SFX-17'));
    promises.push(audio.registerSFX('sfx18', 'assets/audio/sfx/SFX-18'));
    promises.push(audio.registerSFX('sfx19', 'assets/audio/sfx/SFX-19'));
    promises.push(audio.registerSFX('sfx1A', 'assets/audio/sfx/SFX-1A'));
    promises.push(audio.registerSFX('sfx1B', 'assets/audio/sfx/SFX-1B'));
    promises.push(audio.registerSFX('sfx1C', 'assets/audio/sfx/SFX-1C'));
    promises.push(audio.registerSFX('sfx1D', 'assets/audio/sfx/SFX-1D'));
    promises.push(audio.registerSFX('sfx1E', 'assets/audio/sfx/SFX-1E'));
    promises.push(audio.registerSFX('sfx1F', 'assets/audio/sfx/SFX-1F'));
    promises.push(audio.registerSFX('sfx20', 'assets/audio/sfx/SFX-20'));
    promises.push(audio.registerSFX('sfx21', 'assets/audio/sfx/SFX-21'));
    promises.push(audio.registerSFX('sfx22', 'assets/audio/sfx/SFX-22'));
    promises.push(audio.registerSFX('sfx23', 'assets/audio/sfx/SFX-23'));
    promises.push(audio.registerSFX('sfx24', 'assets/audio/sfx/SFX-24'));
    promises.push(audio.registerSFX('sfx25', 'assets/audio/sfx/SFX-25'));
    promises.push(audio.registerSFX('sfx26', 'assets/audio/sfx/SFX-26'));
    promises.push(audio.registerSFX('sfx27', 'assets/audio/sfx/SFX-27'));
    promises.push(audio.registerSFX('sfx28', 'assets/audio/sfx/SFX-28'));
    promises.push(audio.registerSFX('sfx29', 'assets/audio/sfx/SFX-29'));
    promises.push(audio.registerSFX('sfx2A', 'assets/audio/sfx/SFX-2A')); //Bonus stage clear
    promises.push(audio.registerSFX('sfx2B', 'assets/audio/sfx/SFX-2B')); //Gengar step
    promises.push(audio.registerSFX('sfx2C', 'assets/audio/sfx/SFX-2C')); //Gastly hurt
    promises.push(audio.registerSFX('sfx2D', 'assets/audio/sfx/SFX-2D')); //Haunter hurt
    promises.push(audio.registerSFX('sfx2E', 'assets/audio/sfx/SFX-2E')); //Gengar defated
    promises.push(audio.registerSFX('sfx2F', 'assets/audio/sfx/SFX-2F')); //Hit gravestone
    promises.push(audio.registerSFX('sfx30', 'assets/audio/sfx/SFX-30')); //Seel hurt
    promises.push(audio.registerSFX('sfx31', 'assets/audio/sfx/SFX-31'));
    promises.push(audio.registerSFX('sfx32', 'assets/audio/sfx/SFX-32')); //Coin caught
    promises.push(audio.registerSFX('sfx33', 'assets/audio/sfx/SFX-33')); //Meowth hurt
    promises.push(audio.registerSFX('sfx34', 'assets/audio/sfx/SFX-34')); //Coin fell
    promises.push(audio.registerSFX('sfx35', 'assets/audio/sfx/SFX-35')); //Diglett hurt
    promises.push(audio.registerSFX('sfx36', 'assets/audio/sfx/SFX-36')); //Dugtrio hurt
    promises.push(audio.registerSFX('sfx37', 'assets/audio/sfx/SFX-37')); //Gengar hurt
    promises.push(audio.registerSFX('sfx38', 'assets/audio/sfx/SFX-38')); //Mewtwo shield destroyed
    promises.push(audio.registerSFX('sfx39', 'assets/audio/sfx/SFX-39')); //Mewtwo hurt
    promises.push(audio.registerSFX('sfx3A', 'assets/audio/sfx/SFX-3A'));
    promises.push(audio.registerSFX('sfx3B', 'assets/audio/sfx/SFX-3B'));
    promises.push(audio.registerSFX('sfx3C', 'assets/audio/sfx/SFX-3C'));
    promises.push(audio.registerSFX('sfx3D', 'assets/audio/sfx/SFX-3D'));
    promises.push(audio.registerSFX('sfx3E', 'assets/audio/sfx/SFX-3E'));
    promises.push(audio.registerSFX('sfx3F', 'assets/audio/sfx/SFX-3F')); //Close gate on bonus level
    promises.push(audio.registerSFX('sfx40', 'assets/audio/sfx/SFX-40'));
    promises.push(audio.registerSFX('sfx41', 'assets/audio/sfx/SFX-41'));
    promises.push(audio.registerSFX('sfx42', 'assets/audio/sfx/SFX-42'));
    promises.push(audio.registerSFX('sfx43', 'assets/audio/sfx/SFX-43'));
    promises.push(audio.registerSFX('sfx44', 'assets/audio/sfx/SFX-44'));
    promises.push(audio.registerSFX('sfx45', 'assets/audio/sfx/SFX-45'));
    promises.push(audio.registerSFX('sfx46', 'assets/audio/sfx/SFX-46'));
    promises.push(audio.registerSFX('sfx47', 'assets/audio/sfx/SFX-47'));
    promises.push(audio.registerSFX('sfx48', 'assets/audio/sfx/SFX-48'));
    promises.push(audio.registerSFX('sfx49', 'assets/audio/sfx/SFX-49')); //Timer 20s
    promises.push(audio.registerSFX('sfx4A', 'assets/audio/sfx/SFX-4A')); //Timer 10s
    promises.push(audio.registerSFX('sfx4B', 'assets/audio/sfx/SFX-4B')); //Timer 5s
    promises.push(audio.registerSFX('sfx4C', 'assets/audio/sfx/SFX-4C'));
    promises.push(audio.registerSFX('sfx4D', 'assets/audio/sfx/SFX-4D'));
    promises.push(audio.registerSFX('sfx4E', 'assets/audio/sfx/SFX-4E')); //Gengar cry

    return Promise.all(promises);
}