//SPRITES
const TIMER_CHAR_HEIGHT = 32;
const TIMER_CHAR_WIDTH = 16;

let songGhostStageGastly, songGhostStageHaunter, songGhostStageGengar;

let sfx00, sfx01, sfx02, sfx03, sfx04, sfx05, sfx06, sfx07, sfx08, sfx09,
    sfx0A, sfx0B, sfx0C, sfx0D, sfx0E, sfx0F, sfx10, sfx11, sfx12, sfx13,
    sfx14, sfx15, sfx16, sfx17, sfx18, sfx19, sfx1A, sfx1B, sfx1C, sfx1D,
    sfx1E, sfx1F, sfx20, sfx21, sfx22, sfx23, sfx24, sfx25, sfx26, sfx27,
    sfx28, sfx29, sfx2A, sfx2B, sfx2C, sfx2D, sfx2E, sfx2F, sfx30, sfx31,
    sfx32, sfx33, sfx34, sfx35, sfx36, sfx37, sfx38, sfx39, sfx3A, sfx3B,
    sfx3C, sfx3D, sfx3E, sfx3F, sfx40, sfx41, sfx42, sfx43, sfx44, sfx45,
    sfx46, sfx47, sfx48, sfx49, sfx4A, sfx4B, sfx4C, sfx4D, sfx4E;

let currentSong;

/**
 * Loads in memory all the audio files
 */
function preloadAudio() {
    songGhostStageGastly = getAudio('assets/audio/GhostStage_Gastly');
    songGhostStageHaunter = getAudio('assets/audio/GhostStage_Haunter');
    songGhostStageGengar = getAudio('assets/audio/GhostStage_Gengar');

    sfx00 = getAudio('assets/audio/sfx/SFX-00');
    sfx01 = getAudio('assets/audio/sfx/SFX-01');
    sfx02 = getAudio('assets/audio/sfx/SFX-02'); //Bonus ball lost
    sfx03 = getAudio('assets/audio/sfx/SFX-03');
    sfx04 = getAudio('assets/audio/sfx/SFX-04');
    sfx05 = getAudio('assets/audio/sfx/SFX-05');
    sfx06 = getAudio('assets/audio/sfx/SFX-06');
    sfx07 = getAudio('assets/audio/sfx/SFX-07');
    sfx08 = getAudio('assets/audio/sfx/SFX-08'); //Bonus scenario hit
    sfx09 = getAudio('assets/audio/sfx/SFX-09');
    sfx0A = getAudio('assets/audio/sfx/SFX-0A');
    sfx0B = getAudio('assets/audio/sfx/SFX-0B');
    sfx0C = getAudio('assets/audio/sfx/SFX-0C'); //FLipper moved
    sfx0D = getAudio('assets/audio/sfx/SFX-0D');
    sfx0E = getAudio('assets/audio/sfx/SFX-0E');
    sfx0F = getAudio('assets/audio/sfx/SFX-0F');
    sfx10 = getAudio('assets/audio/sfx/SFX-10');
    sfx11 = getAudio('assets/audio/sfx/SFX-11');
    sfx12 = getAudio('assets/audio/sfx/SFX-12');
    sfx13 = getAudio('assets/audio/sfx/SFX-13');
    sfx14 = getAudio('assets/audio/sfx/SFX-14');
    sfx15 = getAudio('assets/audio/sfx/SFX-15');
    sfx16 = getAudio('assets/audio/sfx/SFX-16');
    sfx17 = getAudio('assets/audio/sfx/SFX-17');
    sfx18 = getAudio('assets/audio/sfx/SFX-18');
    sfx19 = getAudio('assets/audio/sfx/SFX-19');
    sfx1A = getAudio('assets/audio/sfx/SFX-1A');
    sfx1B = getAudio('assets/audio/sfx/SFX-1B');
    sfx1C = getAudio('assets/audio/sfx/SFX-1C');
    sfx1D = getAudio('assets/audio/sfx/SFX-1D');
    sfx1E = getAudio('assets/audio/sfx/SFX-1E');
    sfx1F = getAudio('assets/audio/sfx/SFX-1F');
    sfx20 = getAudio('assets/audio/sfx/SFX-20');
    sfx21 = getAudio('assets/audio/sfx/SFX-21');
    sfx22 = getAudio('assets/audio/sfx/SFX-22');
    sfx23 = getAudio('assets/audio/sfx/SFX-23');
    sfx24 = getAudio('assets/audio/sfx/SFX-24');
    sfx25 = getAudio('assets/audio/sfx/SFX-25');
    sfx26 = getAudio('assets/audio/sfx/SFX-26');
    sfx27 = getAudio('assets/audio/sfx/SFX-27');
    sfx28 = getAudio('assets/audio/sfx/SFX-28');
    sfx29 = getAudio('assets/audio/sfx/SFX-29');
    sfx2A = getAudio('assets/audio/sfx/SFX-2A'); //Bonus stage cleared
    sfx2B = getAudio('assets/audio/sfx/SFX-2B'); //Gengar step
    sfx2C = getAudio('assets/audio/sfx/SFX-2C'); //Gastly hurt
    sfx2D = getAudio('assets/audio/sfx/SFX-2D'); //Haunter hurt
    sfx2E = getAudio('assets/audio/sfx/SFX-2E'); //Gengar defated
    sfx2F = getAudio('assets/audio/sfx/SFX-2F'); //Hit gravestone
    sfx30 = getAudio('assets/audio/sfx/SFX-30');
    sfx31 = getAudio('assets/audio/sfx/SFX-31');
    sfx32 = getAudio('assets/audio/sfx/SFX-32');
    sfx33 = getAudio('assets/audio/sfx/SFX-33');
    sfx34 = getAudio('assets/audio/sfx/SFX-34');
    sfx35 = getAudio('assets/audio/sfx/SFX-35');
    sfx36 = getAudio('assets/audio/sfx/SFX-36');
    sfx37 = getAudio('assets/audio/sfx/SFX-37'); //Gengar hurt
    sfx38 = getAudio('assets/audio/sfx/SFX-38');
    sfx39 = getAudio('assets/audio/sfx/SFX-39');
    sfx3A = getAudio('assets/audio/sfx/SFX-3A');
    sfx3B = getAudio('assets/audio/sfx/SFX-3B');
    sfx3C = getAudio('assets/audio/sfx/SFX-3C');
    sfx3D = getAudio('assets/audio/sfx/SFX-3D');
    sfx3E = getAudio('assets/audio/sfx/SFX-3E');
    sfx3F = getAudio('assets/audio/sfx/SFX-3F'); //Close gate on bonus level
    sfx40 = getAudio('assets/audio/sfx/SFX-40');
    sfx41 = getAudio('assets/audio/sfx/SFX-41');
    sfx42 = getAudio('assets/audio/sfx/SFX-42');
    sfx43 = getAudio('assets/audio/sfx/SFX-43');
    sfx44 = getAudio('assets/audio/sfx/SFX-44');
    sfx45 = getAudio('assets/audio/sfx/SFX-45');
    sfx46 = getAudio('assets/audio/sfx/SFX-46');
    sfx47 = getAudio('assets/audio/sfx/SFX-47');
    sfx48 = getAudio('assets/audio/sfx/SFX-48');
    sfx49 = getAudio('assets/audio/sfx/SFX-49');
    sfx4A = getAudio('assets/audio/sfx/SFX-4A');
    sfx4B = getAudio('assets/audio/sfx/SFX-4B');
    sfx4C = getAudio('assets/audio/sfx/SFX-4C');
    sfx4D = getAudio('assets/audio/sfx/SFX-4D');
    sfx4E = getAudio('assets/audio/sfx/SFX-4E');  //Gengar cry


}

/**
 * Loads an audio file
 * @param {string} soundName the local path of the file without the extension
 * @returns  the audio file
 */
function getAudio(soundName) {
    sound = loadSound(soundName + ".mp3");
    sound.volume = 0.4;
    return sound;
}

/**
 * Plays the provided song. If another song was being played, then that song is replaced instead of playing both at the same time
 *  @param {*} the song to play
 */
function playSong(song) {
    if (!MUTE_MUSIC) {
        if (this.currentSong != null) {
            this.currentSong.stop();
        }
        this.currentSong = song;
        this.currentSong.play();
    }
}

/**
 * Stops the song being playd currently
 */
function stopMusic() {
    if (this.currentSong != null) {
        this.currentSong.stop();
    }
}

/**
 * Loads a '.png' image. It will be in grayscale if the debug mode is active
 * @param {string} name the local path of the image without its extension
 * @returns The loaded image
 */
function getImage(name) {
    let image = loadImage(name + ".png");
    if (DEBUG) {
        image.filter(GRAY);
    }
    return image;
}


let bonusStageFrame;
let bonusGhostBackgroundOpen, bonusGhostBackgroundClosed, bonusGhostBackgroundP2Open, bonusGhostBackgroundP2Closed;

let animLeftFlipperUp, animLeftFlipperMiddle, animLeftFlipperDown, animLeftFlipperDownDisabled;
let animRightFlipperUp, animRightFlipperMiddle, animRightFlipperDown, animRightFlipperDownDisabled;

let animTimer = new Array(10);
let animTimerColon;

let stageTextA, stageTextB, stageTextC, stageTextD, stageTextE, stageTextF, stageTextG, stageTextH,
    stageTextI, stageTextJ, stageTextK, stageTextL, stageTextM, stageTextN, stageTextO, stageTextP,
    stageTextQ, stageTextR, stageTextS, stageTextT, stageTextU, stageTextV, stageTextW, stageTextX,
    stageTextY, stageTextZ, stageTextDot, stageTextColon, stageTextExcl, stageTextSpace;

let animGastly, animGastlyHurt;
let animHaunter, animHaunterHurt;
let animGengar, animGengarHurt, animGengarWalk;

function preLoadBackgrounds() {
    bonusGhostBackgroundOpen = getImage('assets/img/bonus-ghost/bonus_ghost_background_open');
    bonusGhostBackgroundClosed = getImage('assets/img/bonus-ghost/bonus_ghost_background');
    bonusGhostBackgroundP2Open = getImage('assets/img/bonus-ghost/bonus_ghost_background_open_p2');
    bonusGhostBackgroundP2Closed = getImage('assets/img/bonus-ghost/bonus_ghost_background_p2');

    bonusStageFrame = getImage('assets/img/bonus_state_frame');
}

/**
 * loads in memory all the animations
 */
function preloadAnimations() {
    animLeftFlipperUp = getAnimation('assets/img/left_flipper_up', 48, 48, 1);
    animLeftFlipperMiddle = getAnimation('assets/img/left_flipper_middle', 48, 48, 1);
    animLeftFlipperDown = getAnimation('assets/img/left_flipper_down', 48, 48, 1);
    animLeftFlipperDownDisabled = getAnimation('assets/img/left_flipper_down_disabled', 48, 48, 1);
    animRightFlipperUp = getAnimation('assets/img/right_flipper_up', 48, 48, 1);
    animRightFlipperMiddle = getAnimation('assets/img/right_flipper_middle', 48, 48, 1);
    animRightFlipperDown = getAnimation('assets/img/right_flipper_down', 48, 48, 1);
    animRightFlipperDownDisabled = getAnimation('assets/img/right_flipper_down_disabled', 48, 48, 1);

    for (let i = 0; i < 10; i++) {
        animTimer[i] = getAnimation('assets/img/timer/timer_' + i, TIMER_CHAR_WIDTH, TIMER_CHAR_HEIGHT, 1);
    }
    animTimerColon = getAnimation('assets/img/timer/timer_colon', TIMER_CHAR_WIDTH, TIMER_CHAR_HEIGHT, 1);

    animGastly = getAnimation('assets/img/bonus-ghost/gastly', 64, 64, 1, DEFAULT_ANIMATION_DELAY);
    animGastlyHurt = getAnimation('assets/img/bonus-ghost/gastly_hurt', 64, 64, 1, DEFAULT_ANIMATION_DELAY);

    animHaunter = getAnimation('assets/img/bonus-ghost/haunter', 96, 80, 4, DEFAULT_ANIMATION_DELAY);
    animHaunterHurt = getAnimation('assets/img/bonus-ghost/haunter_hurt', 96, 80, 1, DEFAULT_ANIMATION_DELAY);

    animGengar = getAnimation('assets/img/bonus-ghost/gengar', 96, 128, 3, 16);
    animGengarHurt = getAnimation('assets/img/bonus-ghost/gengar_hurt', 112, 128, 1, DEFAULT_ANIMATION_DELAY);
    animGengarWalk = getAnimation('assets/img/bonus-ghost/gengar_walk', 96, 128, 4, DEFAULT_ANIMATION_DELAY);

    stageTextA = getAnimation('assets/img/stage-text/a', 16, 16, 1);
    stageTextB = getAnimation('assets/img/stage-text/b', 16, 16, 1);
    stageTextC = getAnimation('assets/img/stage-text/c', 16, 16, 1);
    stageTextD = getAnimation('assets/img/stage-text/d', 16, 16, 1);
    stageTextE = getAnimation('assets/img/stage-text/e', 16, 16, 1);
    stageTextF = getAnimation('assets/img/stage-text/f', 16, 16, 1);
    stageTextG = getAnimation('assets/img/stage-text/g', 16, 16, 1);
    stageTextH = getAnimation('assets/img/stage-text/h', 16, 16, 1);
    stageTextI = getAnimation('assets/img/stage-text/i', 16, 16, 1);
    stageTextJ = getAnimation('assets/img/stage-text/j', 16, 16, 1);
    stageTextK = getAnimation('assets/img/stage-text/k', 16, 16, 1);
    stageTextL = getAnimation('assets/img/stage-text/l', 16, 16, 1);
    stageTextM = getAnimation('assets/img/stage-text/m', 16, 16, 1);
    stageTextN = getAnimation('assets/img/stage-text/n', 16, 16, 1);
    stageTextO = getAnimation('assets/img/stage-text/o', 16, 16, 1);
    stageTextP = getAnimation('assets/img/stage-text/p', 16, 16, 1);
    stageTextQ = getAnimation('assets/img/stage-text/q', 16, 16, 1);
    stageTextR = getAnimation('assets/img/stage-text/r', 16, 16, 1);
    stageTextS = getAnimation('assets/img/stage-text/s', 16, 16, 1);
    stageTextT = getAnimation('assets/img/stage-text/t', 16, 16, 1);
    stageTextU = getAnimation('assets/img/stage-text/u', 16, 16, 1);
    stageTextV = getAnimation('assets/img/stage-text/v', 16, 16, 1);
    stageTextW = getAnimation('assets/img/stage-text/w', 16, 16, 1);
    stageTextX = getAnimation('assets/img/stage-text/x', 16, 16, 1);
    stageTextY = getAnimation('assets/img/stage-text/y', 16, 16, 1);
    stageTextZ = getAnimation('assets/img/stage-text/z', 16, 16, 1);
    stageTextDot = getAnimation('assets/img/stage-text/dot', 16, 16, 1);
    stageTextColon = getAnimation('assets/img/stage-text/colon', 16, 16, 1);
    stageTextExcl = getAnimation('assets/img/stage-text/excl', 16, 16, 1);
    stageTextSpace = getAnimation('assets/img/stage-text/space', 16, 16, 1);

}

/**
 * Loads an animation
 * @param {string} name the local path of the image without its extension
 * @param {*} frameHeight the pixel height of each frame
 * @param {*} frameWidth the pixel width of each frame
 * @param {*} imageNum the number of frames on the animation
 * @param {*} delay the number of frames between each frame
 * @returns the loaded animation
 */
function getAnimation(name, frameHeight, frameWidth, imageNum, delay) {
    let sheet = getImage(name);
    if (sheet == undefined) {
        console.log(name);
        console.log(sheet);
    }
    let animation = loadAnimation(sheet, { frameSize: [frameHeight, frameWidth], frameCount: imageNum });
    animation.frameDelay = delay;

    return animation;
}
