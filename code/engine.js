let DEBUG = false; //true to start the game on debug mode

const SCREEN_WIDTH = 384; //Widht of the canvas
const SCREEN_HEIGHT = 556; //Height of the canvas

const DEFAULT_ANIMATION_DELAY = 12; //Delay between frames of animation

GRAVITY = 10; //The gravity applied to the game
const EPSILON = 0.1; //Marging for physics calculation (Avoids jittering)

/**
 * Disables the physiics of a sprite.
 * @param {sprite} sprite  the sprite.
 */
function disableSprite(sprite) {
    sprite.sleeping = true;
    sprite.physics = "none";
}

/**
 * Starts a screen shake for the default amount of time.
 */
function startShake(){
    stage.startShake();
}

/**
 * Enables the physics of a sprite
 * @param {sprite} sprite  the sprite.
 */
function enableSprite(sprite) {
    sprite.sleeping = false;
    sprite.physics = "static";
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
    let animation = loadAnimation(sheet, { frameSize: [frameHeight, frameWidth], frameCount: imageNum });
    animation.frameDelay = delay;

    return animation;
}
