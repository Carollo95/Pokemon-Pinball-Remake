const HIDE_DISAPPEAR_ANIMATION_UPDATE_MS = 60;
const CAPTURE_BALL_ANIMATION_UPDATE_MS = 150;

const HIDE_DISAPPEAR_ANIMATION_STATES = [6, 6, 7, 8, 9, 10, 11, 0, 0, 0, 1, 2, 3, 4, 5, 6, 6, 6, 7, 8, 9, 10, 11, 0, 0, 0];

const SCREEN_CAPTURE_STATE = {
    HIDDEN: "hidden",
    ANIMATION: "animation",
    SPRITE: "sprite",
    CAPTURE_ANIMATION: "capture_animation"
}


class ScreenCapture {
    constructor() {

        this.sprite = new Sprite(160, 364, 96, 64, "none");
        //TODO loop this shits
        this.sprite.addAnimation('001', Asset.getAnimation('001'));
        this.sprite.layer = SCENARIO_LAYER;
        this.sprite.visible = false;
        this.sprite.debug = DEBUG;
        this.sprite.hideLevel = 0;

        this.hideSprite = new Sprite(160, 364, 96, 64, "none");
        //TODO loop this shits
        this.hideSprite.addAnimation('001-bw', Asset.getAnimation('001-bw'));
        this.hideSprite.layer = OVER_SCENARIO_LAYER;
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

        this.animatedPokemon = new Sprite(160, 364, 56, "static");
        EngineUtils.disableSprite(this.animatedPokemon);
        this.animatedPokemon.layer = SPRITE_LAYER;
        this.animatedPokemon.visible = false;
        this.animatedPokemon.debug = DEBUG;
        this.animatedPokemon.addAnimation('001-sprite-hurt', Asset.getAnimation('001-sprite-hurt'));
        this.animatedPokemon.addAnimation('001-sprite', Asset.getAnimation('001-sprite'));

        this.catchTextSprite = new Sprite(160, 404, 96, 16, "none");
        this.catchTextSprite.layer = SCENARIO_LAYER;
        this.catchTextSprite.debug = DEBUG;
        this.catchTextSprite.addAnimation('catch', Asset.getAnimation('catch'));
        this.catchTextSprite.ani.playing = false;
        this.captureLevel = 0;
        this.catchTextSprite.ani.frame = this.captureLevel;

        this.capturePuffSprite = new Sprite(160, 364, 96, 112, "none");
        this.capturePuffSprite.layer = OVER_BALL_LAYER;
        this.capturePuffSprite.debug = DEBUG;
        this.capturePuffSprite.visible = false;
        this.capturePuffSprite.addAnimation('capture-puff', Asset.getAnimation('capture-puff'));
        this.capturePuffSprite.ani.playing = false;

        this.captureAnimationStep = 0;
    }

    //TODO 
    caughtCallback() {
        console.log("Pokemon on ball");
    }

    startAnimatedSpritePhaseCallback() {
        console.log("Remove arrow");
    }

    update(ball) {
        if (this.state === SCREEN_CAPTURE_STATE.ANIMATION) {
            //TODO trigger end of animation
            this.updateHideEndAnimation();
        } else if (this.state === SCREEN_CAPTURE_STATE.SPRITE) {
            this.updatePokemonSprite(ball);
        } else if (this.state === SCREEN_CAPTURE_STATE.CAPTURE_ANIMATION) {
            if (this.timeToUpdateCaptureAnimation()) {
                this.captureAnimationStep++;
            }

            if (this.captureAnimationInRange(0, 8)) {
                ball.sprite.pos.y = ball.sprite.pos.y - 2;
            }
            if (this.captureAnimationInRange(24, 48)) {
                ball.sprite.pos.y = ball.sprite.pos.y + 2;
            }

            if (this.captureAnimationInRange(50, 52)) {
                ball.sprite.pos.y = ball.sprite.pos.y - 2;
            }
            if (this.captureAnimationInRange(52, 54)) {
                ball.sprite.pos.y = ball.sprite.pos.y + 2;
            }

            if (this.captureAnimationIs(90)) {
                ball.sprite.ani.frame = 1;
            }
            if (this.captureAnimationIs(98)) {
                ball.sprite.ani.frame = 0;
            }

            if (this.captureAnimationIs(110)) {
                ball.sprite.ani.frame = 1;
            }
            if (this.captureAnimationIs(118)) {
                ball.sprite.ani.frame = 0;
            }

            if (this.captureAnimationIs(110)) {
                ball.sprite.ani.frame = 1;
            }
            if (this.captureAnimationIs(118)) {
                ball.sprite.ani.frame = 0;
            }

            if (this.captureAnimationIs(160)) {
                ball.sprite.ani.frame = 1;
            }
            if (this.captureAnimationIs(164)) {
                ball.sprite.ani.frame = 0;
            }

            if (this.captureAnimationIs(172)) {
                ball.sprite.ani.frame = 1;
            }
            if (this.captureAnimationIs(180)) {
                ball.sprite.ani.frame = 0;
            }
        }
    }

    captureAnimationInRange(a, b) {
        return (this.captureAnimationStep > a && this.captureAnimationStep <= b);
    }
    captureAnimationIs(a) {
        return (this.captureAnimationStep === a);
    }

    updatePokemonSprite(ball) {
        if (this.animatedPokemon.ani.name.endsWith('-sprite') && (this.animatedPokemon.collide(ball.sprite))) {
            this.onPokemonSpriteHit(ball);
        }
    }

    onPokemonSpriteHit(ball) {
        this.captureLevel++;
        this.animatedPokemon.changeAnimation('001-sprite-hurt');

        if (this.captureLevel < this.catchTextSprite.ani.length) {
            this.catchTextSprite.ani.frame = this.captureLevel;
            this.animatedPokemon.ani.onComplete = () => {
                this.animatedPokemon.changeAnimation('001-sprite');
            };
        } else {
            this.capturePuffSprite.visible = true;
            this.capturePuffSprite.ani.playing = true;
            this.capturePuffSprite.ani.onComplete = () => {
                this.capturePuffSprite.visible = false;
            };
            this.animatedPokemon.ani.onComplete = () => {
                EngineUtils.disableSprite(this.animatedPokemon);
                this.animatedPokemon.visible = false;
                this.caughtCallback();
            };

            this.startCapturedAnimation(ball);
        }
    }

    startCapturedAnimation(ball) {
        this.state = SCREEN_CAPTURE_STATE.CAPTURE_ANIMATION;
        ball.stopOnCoordinates(160, 340);
        this.timeOfLastCaptureAnimationUpdate = millis();
    }

    updateHideEndAnimation() {
        if (this.timeToUpdateAnimation()) {
            this.hideSprite.hideLevel = HIDE_DISAPPEAR_ANIMATION_STATES[this.hideSpriteAnimationFrame];
            this.hideSpriteAnimationFrame++;
            this.timeOfLastAnimationUpdate = millis();

            if (this.hideSpriteAnimationFrame === HIDE_DISAPPEAR_ANIMATION_STATES.length) {
                this.startAnimatedSpritePhase();
            }
        }
    }

    startAnimatedSpritePhase() {
        this.state = SCREEN_CAPTURE_STATE.SPRITE;
        this.startAnimatedSpritePhaseCallback();

        this.sprite.visible = false;
        this.hideSprite.visible = false;
        EngineUtils.enableSprite(this.animatedPokemon);
        this.animatedPokemon.visible = true;
    }

    timeToUpdateAnimation() {
        return millis() > this.timeOfLastAnimationUpdate + HIDE_DISAPPEAR_ANIMATION_UPDATE_MS;
    }

    timeToUpdateCaptureAnimation() {
        return millis() > this.timeOfLastCaptureAnimationUpdate + CAPTURE_BALL_ANIMATION_UPDATE_MS;
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