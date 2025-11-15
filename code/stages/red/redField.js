const RED_FIELD_CAPTURE_TIMER_MS = 121000;

const RED_FIELD_STATUS = {
    PLAYING: 0,
    GAME_START: 1,
    BALL_LOST: 2,
    GAME_OVER: 3,
    NEW_BALL_WAITING: 4,
    CAPTURE: 5,
    TRAVEL_LEFT: 6,
    TRAVEL_RIGHT: 7,
    TRAVEL_CAVE: 8
}


const RED_FIELD_BONUS_ORDER = [FIELD_BONUS.MOLE, FIELD_BONUS.GHOST, FIELD_BONUS.CLONE];

const CALLBACK_DELAY_MS = 500;

class RedField extends Field {

    constructor(status) {
        super(status);
        this._lastCallbackCall = 0;
        this.nextBonusLevelIndex = 0;

        this.background = Asset.getBackground('redFieldBackground');

    }

    rightFlipperCallback = () => {

        if (millis() > this._lastCallbackCall + CALLBACK_DELAY_MS) {
            this._lastCallbackCall = millis();
            if (this.state === RED_FIELD_STATUS.GAME_START || this.state === RED_FIELD_STATUS.NEW_BALL_WAITING) {
                this.launchNewBallWaiting();
                this.state = RED_FIELD_STATUS.PLAYING;
            }
        }

        if (this.state === RED_FIELD_STATUS.BALL_LOST) {
            this.progressBonusBallScreen();
        }
    }

    launchNewBallWaiting() {
        if (this.state === RED_FIELD_STATUS.GAME_START) {
            this.screen.stopSpin();
            this.stageText.setScrollText(I18NManager.translate("start_from") + this.screen.getLandmarkText(), this.screen.getLandmarkText());
        }
        this.getBall().launchFromSpawn();
    }

    progressBonusBallScreen() {
        if (this.ballBonusScreen.isVisible()) {
            this.ballBonusScreen.progress();
        }
    }

    onBonusScreenCompleteCallback = () => {
        //TODO Shoot again text
        this.createNewBallOrEndStage();
    }

    setup(initialLandmark = undefined, arrowsState = undefined, spawnOnWell = false) {
        RED_FIELD_GEOMETRY.forEach(p => this.createScenarioGeometry(p));

        //TODO move to ditto
        this.createScenarioGeometry([
            [198, 50],
            [220, 54],
            [242, 62],
            [268, 78],
            [278, 88],
            [288, 108],
            [290, 118],
            [296, 132],
            [300, 158],
            [290, 134],
            [272, 108],
            [256, 92],
            [240, 80],
            [234, 76],
            [198, 50]
        ]);

        this.attachBall(Ball.spawnStageBall());

        this.attachFlippers(createTableFlippers(this.rightFlipperCallback));
        this.attachStageText(createStageStatusBanner(this.status));

        this.ditto = new RedFieldDitto();

        this.speedPad = [];
        this.speedPad.push(new SpeedPad(265, 293));
        this.speedPad.push(new SpeedPad(53, 293));
        this.speedPad.push(new SpeedPad(89, 259));

        this.screen = new Screen(
            initialLandmark,
            this.onThreeBallsCallback,
            this.onCaptureStartCaptureAnimationCallback,
            this.onCaptureStartAnimatedSpritePhaseCallback,
            this.onCaptureCompleteAnimationStartedCallback,
            this.onCapturePhaseFinishedCallback,
            this.captureOnPokemonAnimatedHitCallback
        );

        this.ballBonusScreen = new BallBonusScreen(this.status, this.onBonusScreenCompleteCallback);

        this.leftTravelDiglett = new TravelDiglett(() => { this.status.addPoints(POINTS.TRAVEL_DIGLETT_POINTS) }, () => { this.status.dugtrioOnBall; this.onTravelToLeft(); }, false);
        this.rightTravelDiglett = new TravelDiglett(() => { this.status.addPoints(POINTS.TRAVEL_DIGLETT_POINTS) }, () => { this.status.dugtrioOnBall++; this.onTravelToRight(); }, true);

        this.voltorbs = [];
        this.voltorbs.push(new RedFieldVoltorb(132, 172, this.onVoltorbHitCallback));
        this.voltorbs.push(new RedFieldVoltorb(182, 154, this.onVoltorbHitCallback));
        this.voltorbs.push(new RedFieldVoltorb(170, 208, this.onVoltorbHitCallback));

        this.targetArrows = [];
        this.voltorbsTargetArrow = new TargetArrow(130, 210, 6);
        this.targetArrows.push(this.voltorbsTargetArrow);

        this.bellsprout = new RedFieldBellsprout(this.onBellsproutEatCallback);

        this.arrows = new RedFieldArrows();
        if (arrowsState != undefined) {
            this.arrows.setState(arrowsState);
        }

        this.staryu = new RedFieldStaryu();

        this.lastSensor;
        this.rightLowerSensor = new Sensor(284, 214, () => {
            if (this.state === RED_FIELD_STATUS.PLAYING || this.state === RED_FIELD_STATUS.TRAVEL_RIGHT) {
                this.lastSensor = this.rightLowerSensor;
            }
        });
        this.rightInnerUpperSensor = new Sensor(248, 106, () => {
            if (this.state === RED_FIELD_STATUS.TRAVEL_RIGHT && this.lastSensor === this.rightLowerSensor) {
                this.startTravelCave();
                this.lastSensor = this.rightInnerUpperSensor;
            } else if (this.state === RED_FIELD_STATUS.PLAYING && this.lastSensor === this.rightLowerSensor) {
                this.arrows.upgradeCaptureArrows();
                this.lastSensor = this.rightInnerUpperSensor;
            }
        });

        this.well = new StageWell();

        if (spawnOnWell) {
            this.state = RED_FIELD_STATUS.PLAYING;
            this.ditto.close(true);
            this.closeWell();
        } else {
            this.state = RED_FIELD_STATUS.GAME_START;
        }

        Audio.playMusic('redField');
    }

    onThreeBallsCallback = () => {
        this.screen.goToBonusScreen(this.getNextBonusLevel());
        this.openWell(this.goToBonusStageCallback);
    }

    goToBonusStageCallback = () => {
        let nextLevel = this.getNextBonusLevel();
        if (nextLevel === FIELD_BONUS.MOLE) {
            EngineUtils.startMoleStage(this.onBackFromBonusStageCallback);
        } else if (nextLevel === FIELD_BONUS.GHOST) {
            EngineUtils.startGhostStage(this.onBackFromBonusStageCallback);
        } else if (nextLevel === FIELD_BONUS.CLONE) {
            EngineUtils.startCloneStage(this.onBackFromBonusStageCallback);
        }
    }

    onBackFromBonusStageCallback = () => {
        allSprites.remove();
        stage = this;
        this.nextBonusLevelIndex++;
        stage.setup(this.screen.screenLandscapes.currentLandmark, this.arrows.getState(), true);
        EngineUtils.flashWhite();
    }

    getNextBonusLevel() {
        return RED_FIELD_BONUS_ORDER[this.nextBonusLevelIndex % RED_FIELD_BONUS_ORDER.length];
    }

    onCaptureStartCaptureAnimationCallback = () => {
        this.getTimer().disable();
    }

    onCaptureStartAnimatedSpritePhaseCallback = () => {
        this.voltorbsTargetArrow.setVisible(false);
    }

    onCaptureCompleteAnimationStartedCallback = (pokemonCaught) => {
        //TODO how many points on jackpot, internationalize text
        this.stageText.setScrollText("you got a " + I18NManager.translate(pokemonCaught.name), I18NManager.translate(pokemonCaught.name), 1000, this.showAfterCaptureJackpot);
        this.status.addPokemonCaught(pokemonCaught);
    }

    showAfterCaptureJackpot = () => {
        //TODO internationalize
        this.addPointsAndShowText("jackpot", 123456, 1000);
    }

    onCapturePhaseFinishedCallback = () => {
        this.state = RED_FIELD_STATUS.PLAYING;
        Audio.playMusic('redField');
    }

    captureOnPokemonAnimatedHitCallback = () => {
        //TODO internationalize
        this.addPointsAndShowText("hit", POINTS.CAPTURE_HIT);
    }


    onBellsproutEatCallback = () => {
        //TODO this should increates on travel???
        this.status.bellsproutOnBall++;
        this.status.addPoints(POINTS.BELLSPROUT_POINTS);
        if (this.state === RED_FIELD_STATUS.TRAVEL_RIGHT) {
            this.startTravelCave();
        } else if (this.state === RED_FIELD_STATUS.PLAYING && this.arrows.captureArrowsLevel >= 2) {
            this.startCaptureSequence();
        }
    }

    startCaptureSequence() {
        this.state = RED_FIELD_STATUS.CAPTURE;
        this.attachTimer(Timer.createFieldTimer(RED_FIELD_CAPTURE_TIMER_MS, this.doOnCaptureTimeupCallback));
        this.stageText.setScrollText(I18NManager.translate("lets_get_pokemon"), "");

        this.screen.startCapture(this.arrows.captureArrowsLevel);
        this.arrows.resetCaptureArrows();
        this.voltorbsTargetArrow.setVisible(true);

        Audio.playMusic('catchEmEvolutionModeRedField');
    }

    doOnCaptureTimeupCallback = () => {
        if (this.state === RED_FIELD_STATUS.CAPTURE) {
            this.getTimer().disable();
            this.stageText.setScrollText(I18NManager.translate("pokemon_ran_away"), "", 1000, () => {
                this.screen.setState(SCREEN_STATE.LANDSCAPE);
                this.state = RED_FIELD_STATUS.PLAYING;
            });
            Audio.playMusic('redField');
        }
    }

    onVoltorbHitCallback = () => {
        this.status.addPoints(POINTS.VOLTORB_BUMPER);
        if (this.state === RED_FIELD_STATUS.CAPTURE && this.voltorbsTargetArrow.visible) {
            this.screen.flipCapture();
            this.addPointsAndShowText(I18NManager.translate("flipped"), POINTS.CAPTURE_FLIPPED);
        }
    }

    draw() {
        super.draw();
        this.updateScreen();

        this.well.update(this.getBall());
        this.updateSensors();
        this.targetArrows.forEach(ta => ta.update());

        this.leftTravelDiglett.update(this.getBall().sprite);
        this.rightTravelDiglett.update(this.getBall().sprite);

        this.voltorbs.forEach(v => v.update(this.getBall().sprite));
        this.updateArrows();
        this.bellsprout.update(this.getBall().sprite);

        this.staryu.update(this.getBall().sprite);

        if (this.state === RED_FIELD_STATUS.PLAYING || this.state === RED_FIELD_STATUS.CAPTURE || this.isTravelState()) {
            this.checkForBallLoss();
            this.updateDitto();

            this.speedPad.forEach(pad => pad.update(this.getBall()));

        } else if (this.state === RED_FIELD_STATUS.BALL_LOST) {
            {
                this.ballBonusScreen.update();
            }
        }

    }

    updateArrows() {
        this.arrows.update(this.state !== RED_FIELD_STATUS.CAPTURE);
    }

    updateSensors() {
        this.rightLowerSensor.update(this.getBall().sprite);
        this.rightInnerUpperSensor.update(this.getBall().sprite);
    }

    updateDitto() {
        if (this.ditto.isOpen() && this.getBall().getPositionY() > 200 && this.getBall().getPositionX() < 40) {
            this.ditto.close();
        }
    }

    updateScreen() {
        this.screen.update(this.getBall());
    }

    checkForBallLoss() {
        if (this.ball.getPositionY() > SCREEN_HEIGHT) {
            if (this.state === RED_FIELD_STATUS.CAPTURE) {
                this.interruptCapture();
            }
            this.screen.setState(SCREEN_STATE.LANDSCAPE);
            this.well.close();
            this.status.startNewBall();
            this.state = RED_FIELD_STATUS.BALL_LOST;
            Audio.playSFX('sfx24');
            this.stageText.setScrollText(I18NManager.translate("end_of_ball_bonus"), "", 1000, () => { this.ballBonusScreen.show(); });
            Audio.stopMusic();
        }
    }

    interruptCapture() {
        this.getTimer().disable();
        this.screen.setState(SCREEN_STATE.LANDSCAPE);
        this.state = RED_FIELD_STATUS.PLAYING;
        this.voltorbsTargetArrow.setVisible(false);
    }

    createNewBallOrEndStage() {
        if (this.status.balls > 0) {
            this.attachBall(Ball.spawnStageBall());
            this.ditto.open();
            this.arrows.setCaptureArrowsLevel(2);
            this.state = RED_FIELD_STATUS.NEW_BALL_WAITING
            Audio.playMusic('redField');
        } else {
            this.state = RED_FIELD_STATUS.GAME_OVER;
            console.log("GAME OVER");
        }
    }

    openWell(callback) {
        this.well.open(callback);
        this.arrows.turnOnCaveArrow();
    }

    closeWell() {
        this.well.spitBall(this.getBall());
        this.arrows.turnOffCaveArrow();
    }

    onTravelToLeft() {
        this.state = RED_FIELD_STATUS.TRAVEL_LEFT;
        this.screen.setTravelDirection(TRAVEL_DIRECTION.LEFT);
        this.arrows.setTravel(TRAVEL_DIRECTION.LEFT);
    }

    onTravelToRight() {
        this.state = RED_FIELD_STATUS.TRAVEL_RIGHT;
        this.screen.setTravelDirection(TRAVEL_DIRECTION.RIGHT);
        this.arrows.setTravel(TRAVEL_DIRECTION.RIGHT);
    }

    isTravelState() {
        return this.state === RED_FIELD_STATUS.TRAVEL_LEFT || this.state === RED_FIELD_STATUS.TRAVEL_RIGHT || this.state === RED_FIELD_STATUS.TRAVEL_CAVE;
    }

    startTravelCave() {
        this.state = RED_FIELD_STATUS.TRAVEL_CAVE;
        this.screen.setTravelDirection(TRAVEL_DIRECTION.CAVE);
        this.arrows.setTravel(TRAVEL_DIRECTION.CAVE);
        this.openWell(this.onTravelCaveCallback);
    }

    onTravelCaveCallback = () => {
        this.screen.setState(SCREEN_STATE.LANDSCAPE);
        this.screen.progressLandmark();
        this.stageText.setScrollText(I18NManager.translate("arrived_at") + this.screen.getLandmarkText(), this.screen.getLandmarkText(), DEFAULT_TEXT_PERSISTENCE_MILLIS, () => {
            this.state = RED_FIELD_STATUS.PLAYING;
            this.arrows.resetFromTravel();
            this.closeWell();
        });
    }

}