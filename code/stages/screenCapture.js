const HIDE_DISAPPEAR_ANIMATION_UPDATE_MS = 100;

const HIDE_DISAPPEAR_ANIMATION_STATES = [6, 6, 7, 8, 9, 10, 11, 0, 0, 0, 1, 2, 3, 4, 5, 6, 6, 6];

const SCREEN_CAPTURE_STATE = {
    HIDDEN: "hidden",
    ANIMATION: "animation",
    SPRITE: "sprite"
}


class ScreenCapture {
    constructor() {

        //TODO loop this shits
        this.sprite = new Sprite(160, 364, 96, 64, "none");
        this.sprite.addAnimation('001', Asset.getAnimation('001'));
        this.sprite.layer = SCENARIO_LAYER;
        this.sprite.visible = false;
        this.sprite.debug = DEBUG;
        this.sprite.hideLevel = 0;

        this.hideSprite = new Sprite(160, 364, 96, 64, "none");
        this.hideSprite.addAnimation('001-bw', Asset.getAnimation('001-bw'));
        this.hideSprite.layer = SCENARIO_LAYER + 1;
        this.hideSprite.visible = false;
        this.hideSprite.debug = DEBUG;
        this.hideSprite.draw = this.hideSpriteDraw;
        this.hideSprite.hideLevel = 0;


        this.hideSprite.hideHL = this.hideHL;
        this.hideSprite.hideHM = this.hideHM;
        this.hideSprite.hideHR = this.hideHR;
        this.hideSprite.hideLL = this.hideLL;
        this.hideSprite.hideLM = this.hideLM;
        this.hideSprite.hideLR = this.hideLR;

        this.state = SCREEN_CAPTURE_STATE.HIDDEN;

        this.pokemon = new Sprite(160, 364, 56, 56, "static");
        EngineUtils.disableSprite(this.pokemon);
        this.pokemon.layer = SPRITE_LAYER;
        this.pokemon.visible = false;
        this.pokemon.debug = DEBUG;
        this.pokemon.addAnimation('001-sprite-hurt', Asset.getAnimation('001-sprite-hurt'));
        this.pokemon.addAnimation('001-sprite', Asset.getAnimation('001-sprite'));
    }

    update(ballSprite) {
        if (this.state === SCREEN_CAPTURE_STATE.ANIMATION) {
            //TODO trigger end of animation
            if (this.timeToUpdateAnimation()) {
                this.hideSprite.hideLevel = HIDE_DISAPPEAR_ANIMATION_STATES[this.hideSpriteAnimationFrame];
                this.hideSpriteAnimationFrame++;
                this.timeOfLastAnimationUpdate = millis();

                if (this.hideSpriteAnimationFrame === HIDE_DISAPPEAR_ANIMATION_STATES.length) {
                    this.startSpritePhase();
                }
            }
        }else if(this.state === SCREEN_CAPTURE_STATE.SPRITE){
            console.log(ballSprite);
            if(this.pokemon.ani.name.endsWith('-sprite') && (this.pokemon.collide(ballSprite))){
                this.pokemon.changeAnimation('001-sprite-hurt');
                this.pokemon.ani.onComplete = () => {
                    this.pokemon.changeAnimation('001-sprite');
                };
            }
        }
    }

    startSpritePhase() {
        this.state = SCREEN_CAPTURE_STATE.SPRITE;

        this.sprite.visible = false;
        EngineUtils.enableSprite(this.pokemon);
        this.pokemon.visible = true;
    }

    timeToUpdateAnimation() {
        return millis() > this.timeOfLastAnimationUpdate + HIDE_DISAPPEAR_ANIMATION_UPDATE_MS;
    }

    show(visible) {
        this.sprite.visible = visible;
    }

    startCapture(num) {
        this.hideSprite.changeAnimation(num + '-bw');
        this.hideSprite.visible = true;
        this.state = SCREEN_CAPTURE_STATE.HIDDEN;
    }

    flipCapture() {
        if (this.state === SCREEN_CAPTURE_STATE.HIDDEN) {
            this.hideSprite.hideLevel++;
            if (this.hideSprite.hideLevel === 6) {
                this.beginHideDisappearAnimation();
            }
        }
    }

    beginHideDisappearAnimation() {
        this.timeOfLastAnimationUpdate = millis();
        this.state = SCREEN_CAPTURE_STATE.ANIMATION;
        this.hideSpriteAnimationFrame = 0;
    }


    hideSpriteDraw() {
        push();

        drawingContext.save();
        drawingContext.beginPath();

        switch (this.hideLevel) {
            case 0:
                this.hideHL();
                this.hideLM();
                this.hideHR();
                this.hideLL();
                this.hideHM();
                this.hideLR();
                break;
            case 1:
                this.hideLM();
                this.hideHR();
                this.hideLL();
                this.hideHM();
                this.hideLR();
                break;
            case 2:
                this.hideHR();
                this.hideLL();
                this.hideHM();
                this.hideLR();
                break;
            case 3:
                this.hideLL();
                this.hideHM();
                this.hideLR();
                break;
            case 4:
                this.hideHM();
                this.hideLR();
                break;
            case 5:
                this.hideLR();
                break;
            case 6:
                break;
            case 7:
                this.hideHL();
                break;
            case 8:
                this.hideHL();
                this.hideLM();
                break;
            case 9:
                this.hideHL();
                this.hideLM();
                this.hideHR();
                break;
            case 10:
                this.hideHL();
                this.hideLM();
                this.hideHR();
                this.hideLL();
                break;
            case 11:
                this.hideHL();
                this.hideLM();
                this.hideHR();
                this.hideLL();
                this.hideHM();
                break;
        }

        drawingContext.clip();

        this.ani.draw(0, 0);

        drawingContext.restore();

        pop();
    }


    hideHL() {
        drawingContext.rect(-this.width / 2, -this.height / 2, this.width / 3, this.height / 2);
    }

    hideHM() {
        drawingContext.rect(-this.width / 6, -this.height / 2, this.width / 3, this.height / 2);
    }

    hideHR() {
        drawingContext.rect(this.width / 6, -this.height / 2, this.width / 3, this.height / 2);
    }

    hideLL() {
        drawingContext.rect(-this.width / 2, 0, this.width / 3, this.height / 2);
    }

    hideLM() {
        drawingContext.rect(-this.width / 6, 0, this.width / 3, this.height / 2);
    }

    hideLR() {
        drawingContext.rect(this.width / 6, 0, this.width / 3, this.height / 2);
    }



}