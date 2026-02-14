class Sketch {
    constructor() {
        this.background = null;

        // shake state (use timestamps in ms)
        this._shakeEndAt = 0;
        this._shakeStrength = SHAKE_STRENGTH;

        // stage dimensions (can be overridden by subclasses)
        this.width = SCREEN_WIDTH;
        this.height = SCREEN_HEIGHT;
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

        if (this.controls) this.controls.update();
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


    attachControls(controlsInstance) { this.controls = controlsInstance; }
    getControls() { return this.controls; }

    createFrame() {
        const frame = new Sprite(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, SCREEN_WIDTH, SCREEN_HEIGHT, 'none');
        const bg = Asset.getBackground('bonusStageFrame');
        frame.addAnimation("", bg);
        frame.layer = FRAME_LAYER;
        return frame;
    }

}