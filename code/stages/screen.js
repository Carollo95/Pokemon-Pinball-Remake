const SCREEN_STATE = {
    LANDSCAPE: "landscape",
    CAPTURE_EVOLUTION: "capture",
    IMAGE: "image",
    SLOT: "slot",
}

const BLINK_TIME_OF_LAST_BALL = 1000;

class Screen {
    constructor(
        initialLandmark,
        onThreeBallsCallback,
        captureStartCaptureAnimationCallback,
        captureStartAnimatedSpritePhaseCallback,
        captureCompleteAnimationStartedCallback,
        capturePhaseFinishedCallback,
        captureOnPokemonAnimatedHitCallback
    ) {
        this.screenLandscapes = new ScreenLandscapes();
        if (initialLandmark === undefined || initialLandmark === null) {
            this.screenLandscapes.spinBW();
        } else {
            this.screenLandscapes.setLandmarkFromIndex(initialLandmark);
        }

        this.screenImage = new ScreenImage();

        this.capturePhaseFinishedCallback = capturePhaseFinishedCallback;
        this.screenCapture = new ScreenCaptureEvolution(captureStartCaptureAnimationCallback, captureStartAnimatedSpritePhaseCallback, captureCompleteAnimationStartedCallback, this.onCapturePhaseFinishedCallback, captureOnPokemonAnimatedHitCallback);

        this.ballSprites = []

        for (let i = 0; i < 3; i++) {
            let ballSprite = new Sprite(128 + i * 32, 404, 32, 16, "none");
            ballSprite.layer = SCENARIO_LAYER;
            ballSprite.debug = DEBUG;
            ballSprite.addAnimation('captured-ball', Asset.getAnimation('captured-ball'));
            ballSprite.visible = false;
            this.ballSprites.push(ballSprite);
        }
        this.lastBallBlinking = false;


        this.evolutionSprite = new Sprite(160, 404, 96, 16, "none");
        this.evolutionSprite.layer = SCENARIO_LAYER;
        this.evolutionSprite.debug = DEBUG;
        this.evolutionSprite.visible = false;
        this.evolutionSprite.addAnimation(EVOLUTION_METHODS.EXPERIENCE, Asset.getAnimation('evolveExperience'));
        this.evolutionSprite.addAnimation(EVOLUTION_METHODS.FIRE_STONE, Asset.getAnimation('evolveFire'));
        this.evolutionSprite.addAnimation(EVOLUTION_METHODS.LEAF_STONE, Asset.getAnimation('evolveLeaf'));
        this.evolutionSprite.addAnimation(EVOLUTION_METHODS.WATER_STONE, Asset.getAnimation('evolveWater'));
        this.evolutionSprite.addAnimation(EVOLUTION_METHODS.MOON_STONE, Asset.getAnimation('evolveMoon'));
        this.evolutionSprite.addAnimation(EVOLUTION_METHODS.THUNDER_STONE, Asset.getAnimation('evolveThunder'));
        this.evolutionSprite.addAnimation(EVOLUTION_METHODS.LINK_CABLE, Asset.getAnimation('evolveCable'));
        this.evolutionSprite.ani.playing = false;


        this.state = SCREEN_STATE.LANDSCAPE;
        this.lastCaptureBallTime = -10000;
        this.captureLevel = 0;

        this.onThreeBallsCallback = onThreeBallsCallback;

        this.screenSlot = new ScreenSlot();

        this.setState(SCREEN_STATE.LANDSCAPE);
    }

    update(ballSprite) {
        if (this.state === SCREEN_STATE.LANDSCAPE) {
            this.screenLandscapes.update();
            this.blinkLastCaptureBallIfNeeded();
        } else if (this.state === SCREEN_STATE.IMAGE) {
            this.blinkLastCaptureBallIfNeeded();
        } else if (this.state === SCREEN_STATE.CAPTURE_EVOLUTION) {
            this.screenCapture.update(ballSprite);
        } else if( this.state === SCREEN_STATE.SLOT){
            this.screenSlot.update(ballSprite);
        }

    }

    spinBW() {
        this.sprite.changeAnimation(AREA_MAP[this.area] + 'BW');
    }

    stopSpin() {
        this.screenLandscapes.stopSpin();
    }

    getLandmarkText() {
        return this.screenLandscapes.getLandmarkText();
    }

    progressLandmark() {
        this.screenLandscapes.progressLandmark();
    }

    setState(state) {
        this.state = state;
        if (state === SCREEN_STATE.LANDSCAPE) {
            this.screenLandscapes.show(true);
            this.screenCapture.show(false);
            this.screenSlot.show(false);
            this.screenImage.show(false);
            this.updateBallSpritesVisibility();
            this.evolutionSprite.visible = false;
        } else if (state === SCREEN_STATE.CAPTURE_EVOLUTION) {
            this.screenCapture.show(true);
            this.screenLandscapes.show(false);
            this.screenSlot.show(false);
            this.screenImage.show(false);
            this.ballSprites.forEach(sprite => sprite.visible = false);
        } else if (state === SCREEN_STATE.IMAGE) {
            this.screenImage.show(true);
            this.screenLandscapes.show(false);
            this.screenSlot.show(false);
            this.screenCapture.show(false);
            this.updateBallSpritesVisibility();
            this.evolutionSprite.visible = false;
        } else if (state === SCREEN_STATE.SLOT){
            this.screenImage.show(false);
            this.screenLandscapes.show(false);
            this.screenSlot.show(true);
            this.screenCapture.show(false);
            this.updateBallSpritesVisibility();
            this.evolutionSprite.visible = false;
        }
    }

    startCapture(level) {
        this.setState(SCREEN_STATE.CAPTURE_EVOLUTION);
        this.screenCapture.startCapture(this.screenLandscapes.getPokemonFromLandmark(level));
    }

    startEvolution(pokemon) {
        this.setState(SCREEN_STATE.CAPTURE_EVOLUTION);
        for (let i = 0; i < this.ballSprites.length; i++) {
            this.ballSprites[i].visible = false;
        }
        this.screenCapture.startEvolution(pokemon);
        this.evolutionSprite.changeAnimation(getEvolutionMethod(pokemon));
        this.evolutionSprite.visible = true;
        this.evolutionSprite.ani.frame = 0;
        this.evolutionSprite.ani.playing = 0;
    }

    progressEvolutionAnimation() {
        this.evolutionSprite.ani.frame++;
    }

    showTargetEvolution() {
        return this.screenCapture.showTargetEvolution();
    }

    flipCapture() {
        if (this.state !== SCREEN_STATE.CAPTURE_EVOLUTION) return;

        this.screenCapture.flipCapture();
    }

    onCapturePhaseFinishedCallback = () => {
        this.setState(SCREEN_STATE.LANDSCAPE);
        this.screenCapture.hide();
        this.addPokeballsToList(1);
        this.capturePhaseFinishedCallback();
    }

    addPokeballsToList(num) {
        this.captureLevel = Math.min(this.captureLevel + num, 3);
        this.lastCaptureBallTime = millis();
        this.updateBallSpritesVisibility();
        this.lastBallBlinking = true;
    }

    updateBallSpritesVisibility() {
        for (let i = 0; i < this.captureLevel; i++) {
            this.ballSprites[i].visible = true;
        }
    }

    blinkLastCaptureBallIfNeeded() {
        if (this.captureLevel > 0 && this.lastBallBlinking) {
            if (millis() < (this.lastCaptureBallTime + BLINK_TIME_OF_LAST_BALL)) {
                EngineUtils.blinkSprite(this.ballSprites[this.captureLevel - 1]);
            } else {
                this.ballSprites[this.captureLevel - 1].visible = true;
                this.lastBallBlinking = false;
                if (this.captureLevel === 3) {
                    this.onThreeBallsCallback();
                }
            }
        }
    }

    goToBonusScreen(bonus) {
        this.screenImage.setBonus(bonus);
        this.setState(SCREEN_STATE.IMAGE);
    }

    setTravelDirection(direction) {
        this.screenImage.setTravelDirection(direction);
        this.setState(SCREEN_STATE.IMAGE);
    }

    showCaveStart(){
        this.screenImage.setSlotCave();
        this.setState(SCREEN_STATE.IMAGE);
    }

    startSlotMachine(){
        this.setState(SCREEN_STATE.SLOT);
        this.screenSlot.startSlotMachine();
    }

}