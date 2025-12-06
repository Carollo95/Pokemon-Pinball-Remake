const HIDE_DISAPPEAR_ANIMATION_UPDATE_MS = 80;
const CAPTURE_BALL_ANIMATION_UPDATE_MS = 150;

const HIDE_DISAPPEAR_ANIMATION_STATES = [6, 6, 7, 8, 9, 10, 11, 0, 0, 0, 1, 2, 3, 4, 5, 6, 6, 6, 7, 8, 9, 10, 11, 0, 0, 0, 0, 0];

const SCREEN_CAPTURE_STATE = {
    HIDDEN: "hidden",
    ANIMATION: "animation",
    SPRITE: "sprite",
    CAPTURE_ANIMATION: "capture_animation",
    EVOLUTION: "evolution"
}


class ScreenCaptureEvolution {
    constructor(captureStartCaptureAnimationCallback, captureStartAnimatedSpritePhaseCallback, captureCompleteAnimationStartedCallback, capturePhaseFinishedCallback, onPokemonAnimatedHitCallback) {

        this.captureStartCaptureAnimationCallback = captureStartCaptureAnimationCallback;;
        this.captureStartAnimatedSpritePhaseCallback = captureStartAnimatedSpritePhaseCallback;
        this.captureCompleteAnimationStartedCallback = captureCompleteAnimationStartedCallback;
        this.capturePhaseFinishedCallback = capturePhaseFinishedCallback;
        this.onPokemonAnimatedHitCallback = onPokemonAnimatedHitCallback

        this.sprite = new Sprite(160, 364, 96, 64, "none");
        for (let i = 0; i < ALL_POKEMON.length; i++) {
            this.sprite.addAnimation(ALL_POKEMON[i].id, Asset.getAnimation(ALL_POKEMON[i].id));
        }
        this.sprite.layer = SCENARIO_LAYER;
        this.sprite.visible = false;
        this.sprite.debug = DEBUG;
        this.sprite.hideLevel = 0;

        this.hideSprite = new Sprite(160, 364, 96, 64, "none");
        for (let i = 0; i < BASIC_POKEMON.length; i++) {
            this.hideSprite.addAnimation(BASIC_POKEMON[i].id + "-bw", Asset.getAnimation(BASIC_POKEMON[i].id + "-bw"));
        }
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
        for (let i = 0; i < BASIC_POKEMON.length; i++) {
            this.animatedPokemon.addAnimation(BASIC_POKEMON[i].id + '-idle-hurt', Asset.getAnimation(BASIC_POKEMON[i].id + '-idle-hurt'));
            this.animatedPokemon.addAnimation(BASIC_POKEMON[i].id + '-idle', Asset.getAnimation(BASIC_POKEMON[i].id + '-idle'));
        }

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

    hide() {
        this.sprite.visible = false;
        this.hideSprite.visible = false;
        EngineUtils.disableSprite(this.animatedPokemon);
        this.animatedPokemon.visible = false;
        this.capturePuffSprite.visible = false;
        this.catchTextSprite.visible = false;
    }

    update(ball) {
        if (this.state === SCREEN_CAPTURE_STATE.ANIMATION) {
            this.updateHideEndAnimation();
        } else if (this.state === SCREEN_CAPTURE_STATE.SPRITE) {
            this.updatePokemonSprite(ball);
        } else if (this.state === SCREEN_CAPTURE_STATE.CAPTURE_ANIMATION) {
            if (this.timeToUpdateCaptureAnimation()) {
                this.captureAnimationStep++;
            }

            this.captureAnimationMoveUpBall(ball, 0, 8);
            this.captureAnimationMoveDownBall(ball, 24, 24);
            this.captureAnimationMoveUpBall(ball, 50, 2);
            this.captureAnimationMoveDownBall(ball, 52, 2);

            this.captureAnimationWiggleBall(ball, 110);
            this.captureAnimationWiggleBall(ball, 160);

            if(this.captureAnimationIs(220)){
                Audio.playSFX('sfx29');
            }

            if (this.captureAnimationIs(360)) {
                ball.regainPhysics()
                this.capturePuffSprite.visible = false;
                this.catchTextSprite.visible = false;
                this.capturePhaseFinishedCallback();
            }
        }else if(this.state === SCREEN_CAPTURE_STATE.EVOLUTION){

        }
    }

    captureAnimationMoveUpBall(ball, frame, duration) {
        if (this.captureAnimationInRange(frame, frame + duration)) {
            ball.sprite.pos.y = ball.sprite.pos.y - 2;
        }
    }

    captureAnimationMoveDownBall(ball, frame, duration) {
        if (this.captureAnimationInRange(frame, frame + duration)) {
            ball.sprite.pos.y = ball.sprite.pos.y + 2;
        }
    }

    captureAnimationWiggleBall(ball, frame) {
        if (this.captureAnimationIs(frame)) {
            Audio.playSFX('sfx41');
            ball.sprite.ani.frame = 1;
        }
        if (this.captureAnimationIs(frame + 4)) {
            ball.sprite.ani.frame = 0;
        }

        if (this.captureAnimationIs(frame + 16)) {
            Audio.playSFX('sfx41');
            ball.sprite.ani.frame = 1;
        }
        if (this.captureAnimationIs(frame + 20)) {
            ball.sprite.ani.frame = 0;
        }
    }

    captureAnimationInRange(a, b) {
        return (this.captureAnimationStep > a && this.captureAnimationStep <= b);
    }
    captureAnimationIs(a) {
        return (this.captureAnimationStep === a);
    }

    updatePokemonSprite(ball) {
        if (this.animatedPokemon.ani.name.endsWith('-idle') && (this.animatedPokemon.collide(ball.sprite))) {
            this.onPokemonSpriteHit(ball);
        }
    }

    onPokemonSpriteHit(ball) {
        this.captureLevel++;
        Audio.playSFX('sfx06');
        this.animatedPokemon.changeAnimation(this.captureTarget.id + '-idle-hurt');
        this.onPokemonAnimatedHitCallback();

        if (this.captureLevel < this.catchTextSprite.ani.length) {
            this.catchTextSprite.ani.frame = this.captureLevel;
            this.animatedPokemon.ani.onComplete = () => {
                this.animatedPokemon.changeAnimation(this.captureTarget.id + '-idle');
            };
        } else {
            Audio.playSFX('sfx0B');
            this.capturePuffSprite.visible = true;
            this.capturePuffSprite.ani.playing = true;
            this.capturePuffSprite.ani.onComplete = () => {
                this.capturePuffSprite.visible = false;
            };
            this.animatedPokemon.ani.onComplete = () => {
                EngineUtils.disableSprite(this.animatedPokemon);
                this.animatedPokemon.visible = false;
                this.captureStartCaptureAnimationCallback();
            };

            this.startCapturedAnimation(ball);
        }
    }

    startCapturedAnimation(ball) {
        this.state = SCREEN_CAPTURE_STATE.CAPTURE_ANIMATION;
        this.captureCompleteAnimationStartedCallback(this.captureTarget);
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
        this.captureStartAnimatedSpritePhaseCallback();

        Audio.playCry(this.captureTarget.id);
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
        if (!visible) {
            this.hide();
        }
    }

    startCapture(captureTarget) {
        //Restart everything fresh
        this.captureTarget = captureTarget;

        this.sprite.changeAnimation(captureTarget.id);
        this.hideSprite.changeAnimation(captureTarget.id + '-bw');
        this.hideSprite.hideLevel = 0;
        this.hideSprite.visible = true;
        this.state = SCREEN_CAPTURE_STATE.HIDDEN;
        this.captureLevel = 0;
        this.animatedPokemon.changeAnimation(captureTarget.id + '-idle');
        this.catchTextSprite.visible = true;
        this.catchTextSprite.ani.frame = this.captureLevel;

        this.captureAnimationStep = 0;
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

    startEvolution(pokemon){
        this.captureTarget = pokemon;

        this.sprite.changeAnimation(this.captureTarget.id);
        this.hideSprite.visible = false;
        this.state = SCREEN_CAPTURE_STATE.EVOLUTION;
        this.catchTextSprite.visible = false;
    }

    showTargetEvolution(){
        let evolution = getPokemonById(this.captureTarget.evolutionId);
        this.sprite.changeAnimation(evolution.id);
        return evolution;
    }

}