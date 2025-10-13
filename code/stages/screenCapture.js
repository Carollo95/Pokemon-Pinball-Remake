class ScreenCapture {
    constructor() {

        //TODO loop this shits
        this.sprite = new Sprite(160, 364, 96, 64, "none");
        this.sprite.addAnimation('001', Asset.getAnimation('001'));
        this.sprite.layer = SCENARIO_LAYER;
        this.sprite.visible = false;
        this.sprite.draw = this.hideSpriteDraw;
        this.sprite.hideLevel = 0;

        this.hideSprite = new Sprite(160, 364, 96, 64, "none");
        this.hideSprite.addAnimation('001-bw', Asset.getAnimation('001-bw'));
        this.hideSprite.layer = SCENARIO_LAYER + 1;
        this.hideSprite.visible = false;
        this.hideSprite.draw = this.hideSpriteDraw;
        this.hideSprite.hideLevel = 0;

    }

    show(visible){
        this.sprite.visible = visible;
    }

    startCapture(num) {
        this.state = SCREEN_STATE.CAPTURE;
        this.hideSprite.changeAnimation(num + '-bw');
        this.hideSprite.visible = true;
    }

    flipCapture() {
        this.hideSprite.hideLevel++;
    }

    hideSpriteDraw() {
        push();

        drawingContext.save();
        drawingContext.beginPath();

        if (this.hideLevel < 6) {
            drawingContext.rect(this.width / 6, 0, this.width / 3, this.height / 2);
        }

        if (this.hideLevel < 5) {
            drawingContext.rect(-this.width / 6, -this.height / 2, this.width / 3, this.height / 2);
        }

        if (this.hideLevel < 4) {
            drawingContext.rect(-this.width / 2, 0, this.width / 3, this.height / 2);
        }

        if (this.hideLevel < 3) {
            drawingContext.rect(this.width / 6, -this.height / 2, this.width / 3, this.height / 2);
        }

        if (this.hideLevel < 2) {
            drawingContext.rect(-this.width / 6, 0, this.width / 3, this.height / 2);
        }

        if (this.hideLevel < 1) {
            drawingContext.rect(-this.width / 2, -this.height / 2, this.width / 3, this.height / 2);
        }

        drawingContext.clip();

        this.ani.draw(0, 0);

        drawingContext.restore();

        pop();
    }

}