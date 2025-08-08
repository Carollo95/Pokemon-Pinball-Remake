//BACKGROUND IMAGES
const BONUS_GHOST_BACKGROUND_OPEN = 'assets/img/bonus-ghost/bonus_ghost_background_open';
const BONUS_GHOST_BACKGROUND = 'assets/img/bonus-ghost/bonus_ghost_background';
const BONUS_GHOST_BACKGROUND_OPEN_P2 = 'assets/img/bonus-ghost/bonus_ghost_background_open_p2';
const BONUS_GHOST_BACKGROUND_P2 = 'assets/img/bonus-ghost/bonus_ghost_background_p2';

//SPRITES
const TIMER_NUMBERS_PREFIX = 'assets/img/timer_';

const LEFT_FLIPPER_DOWN = 'assets/img/left_flipper_down';
const LEFT_FLIPPER_DOWN_DISABLED = 'assets/img/left_flipper_down_disabled';
const LEFT_FLIPPER_MIDDLE = 'assets/img/left_flipper_middle';
const LEFT_FLIPPER_UP = 'assets/img/left_flipper_up';

const RIGHT_FLIPPER_DOWN = 'assets/img/right_flipper_down';
const RIGHT_FLIPPER_DOWN_DISABLED = 'assets/img/right_flipper_down_disabled';
const RIGHT_FLIPPER_MIDDLE = 'assets/img/right_flipper_middle';
const RIGHT_FLIPPER_UP = 'assets/img/right_flipper_up';

const BONUS_GHOST_GASTLY = 'assets/img/bonus-ghost/gastly';
const BONUS_GHOST_GASTLY_HURT = 'assets/img/bonus-ghost/gastly_hurt';
const BONUS_GHOST_HAUNTER_HURT = 'assets/img/bonus-ghost/haunter_hurt';
const BONUS_GHOST_HAUNTER = 'assets/img/bonus-ghost/haunter';
const BONUS_GHOST_GENGAR = 'assets/img/bonus-ghost/gengar';
const BONUS_GHOST_GENGAR_HURT = 'assets/img/bonus-ghost/gengar_hurt';
const BONUS_GHOST_GENGAR_WALK = 'assets/img/bonus-ghost/gengar_walk';

//Audio
const GHOST_STAGE_GASTLY = 'assets/audio/GhostStage_Gastly';
const GHOST_STAGE_HAUNTER = 'assets/audio/GhostStage_Haunter';
const GHOST_STAGE_GENGAR = 'assets/audio/GhostStage_Gengar';

let currentSong;

let songGhostStageGastly, songGhostStageHaunter, songGhostStageGengar;

function preloadAudio() {
    songGhostStageGastly = getAudio(GHOST_STAGE_GASTLY);
    songGhostStageHaunter = getAudio(GHOST_STAGE_HAUNTER);
    songGhostStageGengar = getAudio(GHOST_STAGE_GENGAR);
}

function getAudio(soundName) {
    sound = loadSound(soundName + ".mp3");
    sound.volume = 0.4;
    return sound;
}

function playSong(song) {
    if (this.currentSong != null) {
        this.currentSong.stop();
    }
    this.currentSong = song;
    this.currentSong.play();
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


let animLeftFlipperUp, animLeftFlipperMiddle, animLeftFlipperDown, animLeftFlipperDownDisabled;
let animRightFlipperUp, animRightFlipperMiddle, animRightFlipperDown, animRightFlipperDownDisabled;
let animTimer = new Array(10);
let animTimerColon;

let animGastly, animGastlyHurt;
let animHaunter, animHaunterHurt;
let animGengar, animGengarHurt, animGengarWalk;

function preloadAnimations() {
    animLeftFlipperUp = getAnimation(LEFT_FLIPPER_UP, FLIPPER_IMAGE_WIDHT, FLIPPER_IMAGE_HEIGHT, 1);
    animLeftFlipperMiddle = getAnimation(LEFT_FLIPPER_MIDDLE, FLIPPER_IMAGE_WIDHT, FLIPPER_IMAGE_HEIGHT, 1);
    animLeftFlipperDown = getAnimation(LEFT_FLIPPER_DOWN, FLIPPER_IMAGE_WIDHT, FLIPPER_IMAGE_HEIGHT, 1);
    animLeftFlipperDownDisabled = getAnimation(LEFT_FLIPPER_DOWN_DISABLED, FLIPPER_IMAGE_WIDHT, FLIPPER_IMAGE_HEIGHT, 1);
    animRightFlipperUp = getAnimation(RIGHT_FLIPPER_UP, FLIPPER_IMAGE_WIDHT, FLIPPER_IMAGE_HEIGHT, 1);
    animRightFlipperMiddle = getAnimation(RIGHT_FLIPPER_MIDDLE, FLIPPER_IMAGE_WIDHT, FLIPPER_IMAGE_HEIGHT, 1);
    animRightFlipperDown = getAnimation(RIGHT_FLIPPER_DOWN, FLIPPER_IMAGE_WIDHT, FLIPPER_IMAGE_HEIGHT, 1);
    animRightFlipperDownDisabled = getAnimation(RIGHT_FLIPPER_DOWN_DISABLED, FLIPPER_IMAGE_WIDHT, FLIPPER_IMAGE_HEIGHT, 1);

    for (let i = 0; i < 10; i++) {
        animTimer[i] = getAnimation(TIMER_NUMBERS_PREFIX + i, TIMER_CHAR_WIDTH, TIMER_CHAR_HEIGHT, 1);
    }
    animTimerColon = getAnimation(TIMER_NUMBERS_PREFIX + "colon", TIMER_CHAR_WIDTH, TIMER_CHAR_HEIGHT, 1);

    animGastly = getAnimation(BONUS_GHOST_GASTLY, 64, 64, 1, DEFAULT_ANIMATION_DELAY);
    animGastlyHurt = getAnimation(BONUS_GHOST_GASTLY_HURT, 64, 64, 1, DEFAULT_ANIMATION_DELAY);

    animHaunter = getAnimation(BONUS_GHOST_HAUNTER, 96, 80, 4, DEFAULT_ANIMATION_DELAY);
    animHaunterHurt = getAnimation(BONUS_GHOST_HAUNTER_HURT, 96, 80, 1, DEFAULT_ANIMATION_DELAY);

    animGengar = getAnimation(BONUS_GHOST_GENGAR, 96, 128, 3, 16);
    animGengarHurt = getAnimation(BONUS_GHOST_GENGAR_HURT, 112, 128, 1, DEFAULT_ANIMATION_DELAY);
    animGengarWalk = getAnimation(BONUS_GHOST_GENGAR_WALK, 96, 128, 4, DEFAULT_ANIMATION_DELAY);

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
