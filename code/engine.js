// Debug settings
let DEBUG = false; //true to start the game on debug mode
let MUTE_MUSIC = false; //true to mute the music but not the sfx

// Canvas settings
const SCREEN_WIDTH = 384; //Widht of the canvas
const SCREEN_HEIGHT = 556; //Height of the canvas

// Animation settings
const DEFAULT_ANIMATION_DELAY = 12; //Delay between frames of animation

// Physics settings
const GRAVITY = 10; //The gravity applied to the game
const EPSILON = 0.1; //Marging for physics calculation (Avoids jittering)

// Layer settings
const BALL_LAYER = 5; //Layer for the ball sprite

let stage; //The p5 sketch in use
let canvas;

const EngineUtils = {
    /**
     * Disables physics for a sprite.
     * @param {Sprite} sprite - The sprite to disable.
     */
    disableSprite(sprite) {
        sprite.sleeping = true;
        sprite.physics = "none";
    },

    /**
     * Enables the physics of a sprite
     * @param {sprite} sprite  the sprite.
     */
    enableSprite(sprite) {
        sprite.sleeping = false;
        sprite.physics = "static";
    },

    /**
     * Starts a screen shake for the default amount of time.
     */
    startShake() {
        stage.startShake();
    },

    /**
     * Draws the current stage
     */
    drawStage() {
        stage.draw();
        if (DEBUG) {
            showFPS();
        }
    },

    initPhysics() {
        world.gravity.y = GRAVITY;
    }

}