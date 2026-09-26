export * from "./constants.js";
import {DEFAULT_BLINKING_FRAMES, FLASH_LAYER, GRAVITY, SCREEN_HEIGHT, SCREEN_WIDTH} from "./constants.js";
import {StageStatus} from "../core/stageStatus.js";
import {BonusStageGhost} from "../bonus_stages/bonus_ghost/bonusStageGhost.js";
import {BonusStageMole} from "../bonus_stages/bonus_mole/bonusStageMole.js";
import {BonusStageCat} from "../bonus_stages/bonus_cat/bonusStageCat.js";
import {BonusStageSeal} from "../bonus_stages/bonus_seal/bonusStageSeal.js";
import {BonusStageClone} from "../bonus_stages/bonus_clone/bonusStageClone.js";
import {BlueField} from "../fields/blue/blueField.js";
import {MainMenu} from "../main_menu/mainMenu.js";
import {FieldSelector} from "../main_menu/fieldSelector.js";
import {Pokedex} from "../pokedex/pokedex.js";
import {HighScore} from "../high_scores/highScore.js";
import {SHOW_FPS} from "./cheatEngine.js";
import {RedField} from "../fields/red/redField.js";

export let stage; //The p5 sketch in use

export function setStage(newStage) {
    stage = newStage;
}

// Flash internal state
let whiteFlash = null;
let whiteFlashSprite = null;

// FPS overlay sprite (p5play)
let fpsSprite = null;


export const EngineUtils = {

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
     * @param blinkingFrames
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
    * @param {function|null} callback Function to call when flash is fully white
     */
    flashWhite(fadeInFrames = 5, fadeOutFrames = 10, maxAlpha = 255, callback = null) {
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
            callback,
            callbackFired: false,
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

        if (!whiteFlash.callbackFired && f >= whiteFlash.fadeIn && typeof whiteFlash.callback === 'function') {
            whiteFlash.callbackFired = true;
            whiteFlash.callback();
            whiteFlash.active = false;
            whiteFlashSprite.visible = false;
            whiteFlashSprite.color = color(255, 255, 255, 0);
            return;
        }

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

    /** Checks if a certain time has passed since the last recorded time, if so, resets the timer
     * @param {number} lastTime  The last recorded time in millis()
     * @param {number} timeAmount The amount of time to check in millis()
     * @returns {boolean} true if the time has passed, false otherwise
     */
    checkTimePassedAndReset(lastTime, timeAmount) {
        if (millis() > lastTime + timeAmount) {
            lastTime = millis();
            return true;
        }
        return false;
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

    getGameStatus() {
        if (stage != null && stage.status != null) {
            return stage.status;
        } else {
            return new StageStatus();
        }
    },

    startGhostStage(callback = () => { }) {
        allSprites.remove();
        stage = new BonusStageGhost(EngineUtils.getGameStatus(), callback);
        stage.setup();
    },

    startMoleStage(callback = () => { }) {
        allSprites.remove();
        stage = new BonusStageMole(EngineUtils.getGameStatus(), callback);
        stage.setup();
    },

    startCatStage(callback = () => { }) {
        allSprites.remove();
        stage = new BonusStageCat(EngineUtils.getGameStatus(), callback);
        stage.setup();
    },

    startSealStage(callback = () => { }) {
        allSprites.remove();
        stage = new BonusStageSeal(EngineUtils.getGameStatus(), callback);
        stage.setup();
    },

    startCloneStage(callback = () => { }) {
        allSprites.remove();
        stage = new BonusStageClone(EngineUtils.getGameStatus(), callback);
        stage.setup();
    },

    startRedField() {
        allSprites.remove();
        stage = new RedField(EngineUtils.getGameStatus());
        stage.setup();
    },

    startBlueField() {
        allSprites.remove();
        stage = new BlueField(EngineUtils.getGameStatus());
        stage.setup();
    },

    startMainMenu() {
        allSprites.remove();
        stage = new MainMenu();
        stage.setup();
    },

    startFieldMenu() {
        allSprites.remove();
        stage = new FieldSelector();
        stage.setup();
    },

    startPokedex() {
        allSprites.remove();
        stage = new Pokedex();
        stage.setup();
    },

    startHighScore(table, highScore) {
        allSprites.remove();
        stage = new HighScore();
        stage.setup(table, highScore);
    },

    addPointsForBallHelper(points) {
        stage.status.addPoints(points, stage.ball);
    }

}
