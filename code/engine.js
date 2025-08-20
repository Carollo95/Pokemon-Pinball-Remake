let DEBUG = false; //true to start the game on debug mode
let MUTE_MUSIC = false; //true to mute the music but not the sfx

const SCREEN_WIDTH = 384; //Widht of the canvas
const SCREEN_HEIGHT = 556; //Height of the canvas

const DEFAULT_ANIMATION_DELAY = 12; //Delay between frames of animation

const GRAVITY = 10; //The gravity applied to the game
const EPSILON = 0.1; //Marging for physics calculation (Avoids jittering)

let stage; //The p5 sketch in use
let canvas;

/**
 * Disables the physics of a sprite.
 * @param {sprite} sprite  the sprite.
 */
function disableSprite(sprite) {
    sprite.sleeping = true;
    sprite.physics = "none";
}

/**
 * Starts a screen shake for the default amount of time.
 */
function startShake() {
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
 * Draws the current stage
 */
function drawStage() {
    stage.draw();
    if (DEBUG) {
        showFPS();
    }
}