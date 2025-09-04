// Debug settings
let SHOW_FPS = true; // true to show FPS
let DEBUG = false; //true to start the game on debug mode
let MUSIC_VOLUME = 0.0; //volume of the music
let SFX_VOLUME = 0.6; //volume of the sfx

// Canvas settings
const SCREEN_WIDTH = 384; //Widht of the canvas
const SCREEN_HEIGHT = 556; //Height of the canvas

// Physics settings
const GRAVITY = 10; //The gravity applied to the game
const EPSILON = 0.1; //Marging for physics calculation (Avoids jittering)

// Layer settings
const SCENARIO_LAYER = 0; //Layer for the scenario items
const SPRITE_LAYER = 2; //Base layer for any sprite
const BALL_LAYER = 5; //Layer for the ball sprite
const HUD_LAYER = 9; //Layer for the HUD elements
const FLASH_LAYER = 10; //Layer for the flash effect
const FRAME_LAYER = 11; //Layer for the frame on the bonus stages
const DEBUG_LAYER = 12; //Layer for debug elements

const DEFAULT_BLINKING_FRAMES = 10;

let stage; //The p5 sketch in use
let canvas;

// Flash internal state
let whiteFlash = null;
let whiteFlashSprite = null;

// FPS overlay sprite (p5play)
let fpsSprite = null;

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
    * Blinks a psprite
    * @param {sprite} sprite  the sprite.
    */
    blinkSprite(sprite, blinkingFrames = DEFAULT_BLINKING_FRAMES) {
        sprite.visible = (frameCount % (blinkingFrames * 2) < blinkingFrames);
    },

    /**
     * Starts a screen shake for the default amount of time.
     */
    startShake() {
        stage.startShake();
    },

    /**
     * Starts a white flash with independent fade in / fade out lengths.
     * @param {number} fadeInFrames  Frames for fade in (>=1)
     * @param {number} fadeOutFrames Frames for fade out (>=1)
     * @param {number} maxAlpha      Peak opacity 0–255
     */
    flashWhite(fadeInFrames = 5, fadeOutFrames = 10, maxAlpha = 255) {
        if (fadeInFrames < 1) fadeInFrames = 1;
        if (fadeOutFrames < 1) fadeOutFrames = 1;

        // Recreate the flash sprite if it was removed (e.g. after allSprites.remove())
        if (!whiteFlashSprite || whiteFlashSprite.removed) {
            whiteFlashSprite = new Sprite(
                SCREEN_WIDTH / 2,
                SCREEN_HEIGHT / 2,
                SCREEN_WIDTH,
                SCREEN_HEIGHT,
                "static"
            );
            whiteFlashSprite.collider = 'none';
            whiteFlashSprite.layer = FLASH_LAYER;
            whiteFlashSprite.visible = false;
            whiteFlashSprite.color = color(255, 255, 255, 0);
        }

        whiteFlash = {
            frame: 0,
            fadeIn: fadeInFrames,
            fadeOut: fadeOutFrames,
            maxAlpha,
            active: true,
            total: fadeInFrames + fadeOutFrames
        };

        whiteFlashSprite.visible = true;
        whiteFlashSprite.color = color(255, 255, 255, 0);
    },

    /**
     * Updates and draws the white flash effect (supports asymmetric fades).
     */
    drawWhiteFlash() {
        if (!whiteFlash || !whiteFlash.active || !whiteFlashSprite) return;

        const f = whiteFlash.frame;

        let alpha;
        if (f < whiteFlash.fadeIn) {
            // Fade in phase
            alpha = (f / whiteFlash.fadeIn) * whiteFlash.maxAlpha;
        } else {
            // Fade out phase
            const outFrame = f - whiteFlash.fadeIn;
            alpha = (1 - (outFrame / whiteFlash.fadeOut)) * whiteFlash.maxAlpha;
        }

        whiteFlashSprite.color = color(255, 255, 255, alpha);

        whiteFlash.frame++;
        if (whiteFlash.frame >= whiteFlash.total) {
            whiteFlash.active = false;
            whiteFlashSprite.visible = false;
            whiteFlashSprite.color = color(255, 255, 255, 0);
        }
    },

    /**
     * Ensure FPS sprite exists and update its visibility/text.
     * Renders on its own sprite so it respects p5play layers.
     */
    showFPS() {
        if (!fpsSprite || fpsSprite.removed) {
            fpsSprite = new Sprite(30, 12, 70, 20, "static");
            fpsSprite.collider = 'none';
            fpsSprite.layer = 20; // requested layer
            fpsSprite.visible = false;
            fpsSprite.draw = function () {
                push();
                rectMode(CENTER);
                noStroke();
                fill(0, 120);
                // background rounded rect
                rect(this.pos.x, this.pos.y, this.width, this.height, 4);

                // FPS text
                textSize(12);
                textAlign(LEFT, TOP);
                fill(255);
                stroke(0);
                strokeWeight(1);
                text("FPS: " + (isNaN(frameRate()) ? "0.00" : frameRate().toFixed(2)),
                    this.pos.x - this.width / 2 + 6,
                    this.pos.y - this.height / 2 + 3);
                pop();
            };
        }

        // Visibility based on SHOW_FPS flag
        fpsSprite.visible = SHOW_FPS;
    },

    /**
     * Draws the stage
     */
    drawStage() {
        stage.draw();
        this.showFPS();
    },

    initPhysics() {
        world.gravity.y = GRAVITY;
    },

}