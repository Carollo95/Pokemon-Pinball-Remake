class Sketch {
    constructor() {
        this.background = null;
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
        this.drawBackground();
    }

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