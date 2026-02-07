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

        this._lastSfxTime = new Map();
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
        return Promise.all([
            this._loadAudio(`${path}_intro.mp3`),
            this._loadAudio(`${path}_loop.mp3`)
        ]).then(([introBuffer, loopBuffer]) => {
            if (introBuffer && loopBuffer) {
                this.musicTracks[id] = { introBuffer, loopBuffer, baseVolume };
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

    registerCRY(id, path, { baseVolume = SFX_VOLUME } = {}) {
        return this._loadAudio(`${path}.ogg`).then(buffer => {
            if (buffer) {
                this.sfx[id] = { buffer, baseVolume };
            }
        });
    }

    // --- Playback Control ---


    playMusic(id, { restart = true, fade = false } = {}) {
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }

        if (this.currentMusic && this.currentMusic.id === id && !restart) {
            return;
        }

        this.stopMusic({ fade: false });

        const track = this.musicTracks[id];
        if (!track) {
            console.error(`Music track not found: ${id}`);
            return;
        }

        // Create intro source
        const introSource = this.audioContext.createBufferSource();
        introSource.buffer = track.introBuffer;
        introSource.loop = false;

        const gainNode = this.audioContext.createGain();
        gainNode.gain.value = track.baseVolume;
        gainNode.connect(this.musicGain);

        introSource.connect(gainNode);
        introSource.start(0);

        // Store current music info
        this.currentMusic = { id, introSource, gainNode, baseVolume: track.baseVolume };

        // When intro ends, start loop
        introSource.onended = () => {
            try { introSource.disconnect(); } catch {}

            // Check if music was stopped during intro
            if (!this.currentMusic || this.currentMusic.id !== id) {
                try { gainNode.disconnect(); } catch {}
                return;
            }

            // Create loop source
            const loopSource = this.audioContext.createBufferSource();
            loopSource.buffer = track.loopBuffer;
            loopSource.loop = true;

            loopSource.connect(gainNode);
            loopSource.start(0);

            // Update current music reference
            this.currentMusic.loopSource = loopSource;
            delete this.currentMusic.introSource;

            loopSource.onended = () => {
                try { loopSource.disconnect(); } catch {}
                try { gainNode.disconnect(); } catch {}
            };
        };
    }

    stopMusic({ fade = true } = {}) {
        if (!this.currentMusic) return;

        const music = this.currentMusic;
        this.currentMusic = null;

        const doStopAndDisconnect = () => {
            if (music.introSource) {
                try { music.introSource.stop(); } catch {}
                try { music.introSource.disconnect(); } catch {}
            }
            if (music.loopSource) {
                try { music.loopSource.stop(); } catch {}
                try { music.loopSource.disconnect(); } catch {}
            }
            try { music.gainNode.disconnect(); } catch {}
        };

        doStopAndDisconnect();
    }

    playSFX(id, cooldown = 0) {
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }

        const now = (typeof performance !== 'undefined' ? performance.now() : Date.now());
        const last = this._lastSfxTime.get(id) || 0;
        if (cooldown > 0 && (now - last) < cooldown) {
            return;
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

        source.onended = () => {
            try { source.disconnect(); } catch {}
            try { gainNode.disconnect(); } catch {}
        };

        source.start(0);

        this._lastSfxTime.set(id, now);
    }

    playSFXsequence(ids) {
        return ids.reduce((p, id) => p.then(() => new Promise(resolve => {
            const src = this.audioContext.createBufferSource();
            src.buffer = this.sfx[id].buffer;
            const g = this.audioContext.createGain();
            g.gain.value = this.sfx[id].baseVolume;
            src.connect(g); g.connect(this.sfxGain);
            src.onended = () => { try{src.disconnect();}catch{} try{g.disconnect();}catch{} resolve(); };
            src.start(0);
        })), Promise.resolve());
    }

    playCry(id) {
        this.playSFX("cry-" + id);
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
            try { source.disconnect(); } catch {}
            try { gainNode.disconnect(); } catch {}
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

    dispose() {
        try {
            this.stopMusic({ fade: false });
        } catch {}

        try { this.musicGain.disconnect(); } catch {}
        try { this.sfxGain.disconnect(); } catch {}

        for (const k in this.musicTracks) {
            if (this.musicTracks[k]) {
                this.musicTracks[k].introBuffer = null;
                this.musicTracks[k].loopBuffer = null;
            }
            delete this.musicTracks[k];
        }
        for (const k in this.sfx) {
            if (this.sfx[k]) this.sfx[k].buffer = null;
            delete this.sfx[k];
        }

        if (this._lastSfxTime) {
            try { this._lastSfxTime.clear(); } catch {}
        }

        if (this.audioContext && this.audioContext.state !== 'closed') {
            try { this.audioContext.close(); } catch {}
        }

        this.audioContext = null;
        this.musicGain = null;
        this.sfxGain = null;
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

if (typeof window !== 'undefined') {
    window.addEventListener('pagehide', () => {
        if (Audio) {
            try { Audio.dispose(); } catch {}
            Audio = null;
        }
    }, { once: true });
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
    promises.push(audio.registerMusic('redField', 'assets/audio/Red_Field_Theme', { loop: true }));
    promises.push(audio.registerMusic('catchEmEvolutionModeRedField', 'assets/audio/Catch_em_Evolution_Mode_Red_Field', { loop: true }));
    promises.push(audio.registerMusic('blueField', 'assets/audio/Blue_Field_Theme', { loop: true }));
    promises.push(audio.registerMusic('catchEmEvolutionModeBlueField', 'assets/audio/Catch_em_Evolution_Mode_Blue_Field', { loop: true }));
    promises.push(audio.registerMusic('mapMode', 'assets/audio/Field_MapMode', { loop: true }));

    // SFX
    promises.push(audio.registerSFX('sfx00', 'assets/audio/sfx/SFX-00')); //Red field ditto close
    promises.push(audio.registerSFX('sfx01', 'assets/audio/sfx/SFX-01'));
    promises.push(audio.registerSFX('sfx02', 'assets/audio/sfx/SFX-02'));
    promises.push(audio.registerSFX('sfx03', 'assets/audio/sfx/SFX-03')); //Evolution chooser change selection
    promises.push(audio.registerSFX('sfx04', 'assets/audio/sfx/SFX-04')); //Well ball on capture area
    promises.push(audio.registerSFX('sfx05', 'assets/audio/sfx/SFX-05')); //Red field Bellsprout eat
    promises.push(audio.registerSFX('sfx06', 'assets/audio/sfx/SFX-06')); //Red field Bellsprout spit AND capture pokemon hit
    promises.push(audio.registerSFX('sfx07', 'assets/audio/sfx/SFX-07')); //Red field Staryu active
    promises.push(audio.registerSFX('sfx08', 'assets/audio/sfx/SFX-08')); //Bonus scenario hit
    promises.push(audio.registerSFX('sfx09', 'assets/audio/sfx/SFX-09')); //Slot machin spin
    promises.push(audio.registerSFX('sfx0A', 'assets/audio/sfx/SFX-0A')); //Ball launch
    promises.push(audio.registerSFX('sfx0B', 'assets/audio/sfx/SFX-0B')); //Pokemon entering ball
    promises.push(audio.registerSFX('sfx0C', 'assets/audio/sfx/SFX-0C')); //Flipper moved
    promises.push(audio.registerSFX('sfx0D', 'assets/audio/sfx/SFX-0D')); //Multiplier hit
    promises.push(audio.registerSFX('sfx0E', 'assets/audio/sfx/SFX-0E')); //red field Voltorb Bumper hit
    promises.push(audio.registerSFX('sfx0F', 'assets/audio/sfx/SFX-0F')); //red field Travel Diglett hit
    promises.push(audio.registerSFX('sfx10', 'assets/audio/sfx/SFX-10')); //Pikachu lighting
    promises.push(audio.registerSFX('sfx11', 'assets/audio/sfx/SFX-11')); //Spinner charge 16
    promises.push(audio.registerSFX('sfx12', 'assets/audio/sfx/SFX-12')); //Spinner charge 1
    promises.push(audio.registerSFX('sfx13', 'assets/audio/sfx/SFX-13')); //Spinner charge 2
    promises.push(audio.registerSFX('sfx14', 'assets/audio/sfx/SFX-14')); //Spinner charge 3
    promises.push(audio.registerSFX('sfx15', 'assets/audio/sfx/SFX-15')); //Spinner charge 4
    promises.push(audio.registerSFX('sfx16', 'assets/audio/sfx/SFX-16')); //Spinner charge 5
    promises.push(audio.registerSFX('sfx17', 'assets/audio/sfx/SFX-17')); //Spinner charge 6
    promises.push(audio.registerSFX('sfx18', 'assets/audio/sfx/SFX-18')); //Spinner charge 7
    promises.push(audio.registerSFX('sfx19', 'assets/audio/sfx/SFX-19')); //Spinner charge 8
    promises.push(audio.registerSFX('sfx1A', 'assets/audio/sfx/SFX-1A')); //Spinner charge 9
    promises.push(audio.registerSFX('sfx1B', 'assets/audio/sfx/SFX-1B')); //Spinner charge 10
    promises.push(audio.registerSFX('sfx1C', 'assets/audio/sfx/SFX-1C')); //Spinner charge 11
    promises.push(audio.registerSFX('sfx1D', 'assets/audio/sfx/SFX-1D')); //Spinner charge 12
    promises.push(audio.registerSFX('sfx1E', 'assets/audio/sfx/SFX-1E')); //Spinner charge 13
    promises.push(audio.registerSFX('sfx1F', 'assets/audio/sfx/SFX-1F')); //Spinner charge 14
    promises.push(audio.registerSFX('sfx20', 'assets/audio/sfx/SFX-20')); //Spinner charge 15
    promises.push(audio.registerSFX('sfx21', 'assets/audio/sfx/SFX-21')); //Well capture ball
    promises.push(audio.registerSFX('sfx22', 'assets/audio/sfx/SFX-22')); //Spinner got full
    promises.push(audio.registerSFX('sfx23', 'assets/audio/sfx/SFX-23')); //Go to bonus stage TODO
    promises.push(audio.registerSFX('sfx24', 'assets/audio/sfx/SFX-24')); //Field ball loss
    promises.push(audio.registerSFX('sfx25', 'assets/audio/sfx/SFX-25')); //Field map travel complete
    promises.push(audio.registerSFX('sfx26', 'assets/audio/sfx/SFX-26')); //Pokemon evolved
    promises.push(audio.registerSFX('sfx27', 'assets/audio/sfx/SFX-27'));
    promises.push(audio.registerSFX('sfx28', 'assets/audio/sfx/SFX-28'));
    promises.push(audio.registerSFX('sfx29', 'assets/audio/sfx/SFX-29')); //Pokemon captured
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
    promises.push(audio.registerSFX('sfx3A', 'assets/audio/sfx/SFX-3A')); //Ball upgrade
    promises.push(audio.registerSFX('sfx3B', 'assets/audio/sfx/SFX-3B'));
    promises.push(audio.registerSFX('sfx3C', 'assets/audio/sfx/SFX-3C'));
    promises.push(audio.registerSFX('sfx3D', 'assets/audio/sfx/SFX-3D'));
    promises.push(audio.registerSFX('sfx3E', 'assets/audio/sfx/SFX-3E')); //Bonus ball screen progress
    promises.push(audio.registerSFX('sfx3F', 'assets/audio/sfx/SFX-3F')); //Close gate on bonus level
    promises.push(audio.registerSFX('sfx40', 'assets/audio/sfx/SFX-40'));
    promises.push(audio.registerSFX('sfx41', 'assets/audio/sfx/SFX-41')); //Ball Wiggle AND Rubber band
    promises.push(audio.registerSFX('sfx42', 'assets/audio/sfx/SFX-42')); //Slots small
    promises.push(audio.registerSFX('sfx43', 'assets/audio/sfx/SFX-43')); //Slots saver, multiplier, evolution, pika...
    promises.push(audio.registerSFX('sfx44', 'assets/audio/sfx/SFX-44')); //Evolution item collected
    promises.push(audio.registerSFX('sfx45', 'assets/audio/sfx/SFX-45')); //Evolution last item collected
    promises.push(audio.registerSFX('sfx46', 'assets/audio/sfx/SFX-46')); //Evolution item appears
    promises.push(audio.registerSFX('sfx47', 'assets/audio/sfx/SFX-47')); //Evolution item missed
    promises.push(audio.registerSFX('sfx48', 'assets/audio/sfx/SFX-48')); //Landscape spinner
    promises.push(audio.registerSFX('sfx49', 'assets/audio/sfx/SFX-49')); //Timer 20s
    promises.push(audio.registerSFX('sfx4A', 'assets/audio/sfx/SFX-4A')); //Timer 10s
    promises.push(audio.registerSFX('sfx4B', 'assets/audio/sfx/SFX-4B')); //Timer 5s
    promises.push(audio.registerSFX('sfx4C', 'assets/audio/sfx/SFX-4C'));
    promises.push(audio.registerSFX('sfx4D', 'assets/audio/sfx/SFX-4D')); //Upgrade master ball
    promises.push(audio.registerSFX('sfx4E', 'assets/audio/sfx/SFX-4E')); //Pikachu saver cry
    promises.push(audio.registerSFX('sfx4E', 'assets/audio/sfx/SFX-4F')); //Pikachu double kickback
    

    for (let i = 1; i <= 151; i++) {
        promises.push(audio.registerCRY("cry-" + pad3(i), 'assets/audio/cries/' + pad3(i)));
    }

    return Promise.all(promises);
}