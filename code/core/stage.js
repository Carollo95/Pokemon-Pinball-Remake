const SHAKE_STRENGTH = 4; // Strength of the screen shake
const DEFAULT_SHAKE_DURATION_MS = 300; // default shake duration in milliseconds

class Stage {
    constructor() {
        // background image
        this.background = null;

        // shake state (use timestamps in ms)
        this._shakeEndAt = 0;
        this._shakeStrength = SHAKE_STRENGTH;

        // stage dimensions (can be overridden by subclasses)
        this.width = SCREEN_WIDTH;
        this.height = SCREEN_HEIGHT;

        // common objects present on every stage (attach in setup())
        this.ball = null;
        this.timer = null;
        this.flippers = null;
        this.stageText = null;
    }

    replaceBackground(newBackgroundImage) { this.background = newBackgroundImage; }
    getBackground() { return this.background; }

    drawBackground() {
        if (this.background) {
            image(this.background, 0, 0, this.width, this.height);
        } else {
            background(0);
        }
    }

    /**
     * Start a screen shake using milliseconds (durationMs).
     * @param {number} durationMs Shake duration in milliseconds (default 300ms)
     * @param {number} strength Shake strength in pixels (optional)
     */
    startShake(durationMs = DEFAULT_SHAKE_DURATION_MS, strength = SHAKE_STRENGTH) {
        const now = millis();
        this._shakeEndAt = now + Math.max(0, Number(durationMs) || 0);
        this._shakeStrength = strength;
    }

    isShaking() { return millis() < this._shakeEndAt; }

    /**
     * Single entry point to draw stage visuals.
     * Applies shake if active and draws the background exactly once.
     */
    draw() {
        if (this.isShaking()) {
            push();
            const dx = random(-this._shakeStrength, this._shakeStrength);
            const dy = random(-this._shakeStrength, this._shakeStrength);
            translate(dx, dy);
            this.drawBackground();
            pop();
        } else {
            this.drawBackground();
        }

        EngineUtils.drawWhiteFlash();
    }

    // --- helpers to attach common per-stage components ---
    attachBall(ballInstance) { this.ball = ballInstance; }
    attachTimer(timerInstance) { this.timer = timerInstance; }
    attachFlippers(flippersInstance) { this.flippers = flippersInstance; }
    attachStageText(stageTextInstance) { this.stageText = stageTextInstance; }

    getBall() { return this.ball; }
    getTimer() { return this.timer; }
    getFlippers() { return this.flippers; }
    getStageText() { return this.stageText; }
    getBallSprite() { return this.getBall().sprite; }
}