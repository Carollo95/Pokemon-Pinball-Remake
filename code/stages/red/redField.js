const RED_FIELD_CAPTURE_TIMER_MS = 121000;
const RED_FIELD_TRAVEL_TIMER_MS = 31000;

const RED_FIELD_STATUS = {
    PLAYING: 0,
    GAME_START: 1,
    BALL_LOST: 2,
    GAME_OVER: 3,
    NEW_BALL_WAITING: 4,
    CAPTURE: 5,
    TRAVEL_LEFT: 6,
    TRAVEL_RIGHT: 7,
    TRAVEL_CAVE: 8,
    EVOLUTION_CHOOSE_SCREEN: 9,
    EVOLUTION: 10
}


const RED_FIELD_BONUS_ORDER = [FIELD_BONUS.MOLE, FIELD_BONUS.GHOST, FIELD_BONUS.CLONE];

const CALLBACK_DELAY_MS = 500;

class RedField extends Field {

    constructor(status) {
        super(status);
        this._lastCallbackCall = 0;
        this.nextBonusLevelIndex = 0;

        this.background = Asset.getBackground('redFieldBackground');
        this._closeBallOnWayDown = true;

    }

    rightFlipperCallback = () => {

        if (millis() > this._lastCallbackCall + CALLBACK_DELAY_MS) {
            this._lastCallbackCall = millis();
            if (this.state === RED_FIELD_STATUS.GAME_START || this.state === RED_FIELD_STATUS.NEW_BALL_WAITING) {
                this.launchNewBallWaiting();
                this.state = RED_FIELD_STATUS.PLAYING;
            } else if (this.state === RED_FIELD_STATUS.EVOLUTION_CHOOSE_SCREEN) {
                this.evolutionScreenChooser.next();
            }
        }

        if (this.state === RED_FIELD_STATUS.BALL_LOST) {
            this.progressBonusBallScreen();
        }
    }

    leftFlipperCallback = () => {

        if (millis() > this._lastCallbackCall + CALLBACK_DELAY_MS) {
            this._lastCallbackCall = millis();
            if (this.state === RED_FIELD_STATUS.EVOLUTION_CHOOSE_SCREEN) {
                this.evolutionScreenChooser.previous();
            }
        }

    }

    launchNewBallWaiting() {
        if (this.state === RED_FIELD_STATUS.GAME_START) {
            this.screen.stopSpin();
            this.stageText.setScrollText(I18NManager.translate("start_from") + this.screen.getLandmarkText(), this.screen.getLandmarkText());
        }
        this._closeBallOnWayDown = true;
        this.ditto.removeLauncherDoor();
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

        this.attachBall(Ball.spawnStageBall());

        this.attachFlippers(createTableFlippers(this.leftFlipperCallback, this.rightFlipperCallback));
        this.attachStageText(createStageStatusBanner(this.status));

        this.ditto = new RedFieldDitto(this.onDittoWellCallback);

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

        this.leftTravelDiglett = new TravelDiglett(() => { this.onDiglettHitCallback(false) }, () => { this.status.dugtrioOnBall++; this.onTravelToLeft(); }, false);
        this.rightTravelDiglett = new TravelDiglett(() => { this.onDiglettHitCallback(true) }, () => { this.status.dugtrioOnBall++; this.onTravelToRight(); }, true);

        this.voltorbs = [];
        this.voltorbs.push(new RedFieldVoltorb(132, 172, this.onVoltorbHitCallback));
        this.voltorbs.push(new RedFieldVoltorb(182, 154, this.onVoltorbHitCallback));
        this.voltorbs.push(new RedFieldVoltorb(170, 208, this.onVoltorbHitCallback));

        this.targetArrows = [];
        this.voltorbsTargetArrow = new TargetArrow(130, 210, 6);
        this.leftDiglettTargetArrow = new TargetArrow(83, 364, 0);
        this.rightDiglettTargetArrow = new TargetArrow(238, 364, 1);
        this.leftMultiplierTargetArrow = new TargetArrow(96, 308, 4);
        this.rightMultiplierTargetArrow = new TargetArrow(224, 308, 5);
        this.targetArrows.push(this.leftDiglettTargetArrow);
        this.targetArrows.push(this.rightDiglettTargetArrow);
        this.targetArrows.push(this.voltorbsTargetArrow);
        this.targetArrows.push(this.leftMultiplierTargetArrow);
        this.targetArrows.push(this.rightMultiplierTargetArrow);

        this.bellsprout = new RedFieldBellsprout(this.onBellsproutEatCallback);

        this.leftMultiplier = new MultiplierTarget(85, 298, 75, 281, () => this.onMultiplierHitCallback(false));
        this.rightMultiplier = new MultiplierTarget(233, 298, 245, 281, () => this.onMultiplierHitCallback(true));

        this.arrows = new RedFieldArrows();
        if (arrowsState != undefined) {
            this.arrows.setState(arrowsState);
        }

        this.staryu = new RedFieldStaryu();

        this.setupSensors();

        this.well = new StageWell();

        if (spawnOnWell) {
            this.state = RED_FIELD_STATUS.PLAYING;
            this.ditto.close(true);
            this.closeWell();
        } else {
            this.state = RED_FIELD_STATUS.GAME_START;
        }

        super.setCentralButtonCallback(this.centerButtonCallback);

        Audio.playMusic('redField');
    }

    onDiglettHitCallback = (isRight) => {
        this.status.addPoints(POINTS.TRAVEL_DIGLETT_POINTS);
        if (this.state === RED_FIELD_STATUS.EVOLUTION) {
            if (isRight) {
                this.onEvolutionTargetHit(this.rightDiglettTargetArrow);
            } else {
                this.onEvolutionTargetHit(this.leftDiglettTargetArrow);
            }
        }
    }

    setupSensors() {
        this.lastSensor;
        this.rightLowerSensor = new Sensor(284, 214, () => {
            this.lastSensor = this.rightLowerSensor;
        });
        this.rightInnerUpperSensor = new Sensor(248, 106, () => {
            if (this.state === RED_FIELD_STATUS.TRAVEL_RIGHT && this.lastSensor === this.rightLowerSensor) {
                this.startTravelCave();
            } else if (this.state === RED_FIELD_STATUS.PLAYING && this.lastSensor === this.rightLowerSensor) {
                this.arrows.upgradeCaptureArrows();
            }
            this.lastSensor = this.rightInnerUpperSensor;
        });

        this.leftOuterLowerSensor = new Sensor(35, 214, () => {
            this.lastSensor = this.leftOuterLowerSensor;
        });
        this.leftMiddleUpperSensor = new Sensor(82, 106, () => {
            if (this.state === RED_FIELD_STATUS.TRAVEL_LEFT && this.lastSensor === this.leftOuterLowerSensor) {
                this.startTravelCave();
            } else if (this.state === RED_FIELD_STATUS.PLAYING && this.lastSensor === this.leftOuterLowerSensor) {
                this.arrows.upgradeEvolutionArrows();
            }

            this.lastSensor = this.leftMiddleUpperSensor;
        });


        this.leftInnerLowerSensor = new Sensor(76, 223, () => {
            this.lastSensor = this.leftInnerLowerSensor;
        });
        this.leftInnerUpperSensor = new Sensor(73, 168, () => {
            if (this.state === RED_FIELD_STATUS.TRAVEL_LEFT && this.lastSensor === this.leftInnerLowerSensor) {
                this.startTravelCave();
            }
            this.lastSensor = this.leftInnerUpperSensor;
        });
    }

    onThreeBallsCallback = () => {
        this.screen.goToBonusScreen(this.getNextBonusLevel());
        this.openWell(this.goToBonusStageCallback);
    }

    goToBonusStageCallback = () => {
        //TODO scroll text "go to X stage" and SFX
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
        this.voltorbsTargetArrow.setActive(false);
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
        //TODO close ditto here and on travel if its the case and then open it again
        this.state = RED_FIELD_STATUS.CAPTURE;
        this.attachTimer(Timer.createFieldTimer(RED_FIELD_CAPTURE_TIMER_MS, this.doOnCaptureTimeupCallback));
        this.stageText.setScrollText(I18NManager.translate("lets_get_pokemon"), "");

        this.screen.startCapture(this.arrows.captureArrowsLevel);
        this.arrows.resetCaptureArrows();
        this.voltorbsTargetArrow.setVisible(true);
        this.voltorbsTargetArrow.setActive(true);

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
        } else if (this.state === RED_FIELD_STATUS.EVOLUTION && this.voltorbsTargetArrow.active) {
            this.onEvolutionTargetHit(this.voltorbsTargetArrow);
        }
    }

    onMultiplierHitCallback = (isRight) => {
        if (this.state === RED_FIELD_STATUS.EVOLUTION) {
            if (isRight) {
                this.onEvolutionTargetHit(this.rightMultiplierTargetArrow);
            } else {
                this.onEvolutionTargetHit(this.leftMultiplierTargetArrow);
            }
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

        this.leftMultiplier.update(this.getBall().sprite);
        this.rightMultiplier.update(this.getBall().sprite);

        if (this.state === RED_FIELD_STATUS.PLAYING || this.state === RED_FIELD_STATUS.CAPTURE || this.state === RED_FIELD_STATUS.EVOLUTION || this.isTravelState()) {
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
        this.arrows.update(this.state !== RED_FIELD_STATUS.CAPTURE && this.state !== RED_FIELD_STATUS.EVOLUTION);
    }

    updateSensors() {
        this.rightLowerSensor.update(this.getBall().sprite);
        this.rightInnerUpperSensor.update(this.getBall().sprite);
        this.leftOuterLowerSensor.update(this.getBall().sprite);
        this.leftMiddleUpperSensor.update(this.getBall().sprite);
    }

    updateDitto() {
        if (this._closeBallOnWayDown && (!this.ditto.isClosed()) && this.getBall().getPositionY() > 200 && this.getBall().getPositionX() < 40) {
            this.ditto.close();
            this.ditto.createLauncherDoor();
            this._closeBallOnWayDown = false;
        } else if (this.state === RED_FIELD_STATUS.PLAYING && this.arrows.evolutionArrowsLevel === 3 && this.ditto.isClosed()) {
            this.ditto.fullyOpen();
        }

        this.ditto.update(this.getBall());
    }

    updateScreen() {
        this.screen.update(this.getBall());
    }

    checkForBallLoss() {
        if (this.ball.getPositionY() > SCREEN_HEIGHT) {
            if (this.state === RED_FIELD_STATUS.CAPTURE) {
                this.interruptCapture();
            } else if (this.state === RED_FIELD_STATUS.EVOLUTION) {
                this.interruptEvolution();
            }
            //TODO interrupt evolution
            this.screen.setState(SCREEN_STATE.LANDSCAPE);
            this.well.close();
            this.status.startNewBall();
            this.state = RED_FIELD_STATUS.BALL_LOST;
            //TODO after ball loss, what happens with the capture level, goes to 0 or to 2?
            this.arrows.restart();
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

    interruptEvolution() {
        this.getTimer().disable();
        this.screen.setState(SCREEN_STATE.LANDSCAPE);
        this.state = RED_FIELD_STATUS.PLAYING;
        this.targetArrows.forEach(ta => ta.setVisible(false));
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
        if (this.state === RED_FIELD_STATUS.PLAYING) {
            //TODO close ditto if open and then open it again if it was closed
            this.state = RED_FIELD_STATUS.TRAVEL_LEFT;
            this.screen.setTravelDirection(TRAVEL_DIRECTION.LEFT);
            this.arrows.setTravel(TRAVEL_DIRECTION.LEFT);
            this.attachTimer(Timer.createFieldTimer(RED_FIELD_TRAVEL_TIMER_MS, this.doOnTravelTimeupCallback));
            Audio.playMusic('mapMode');
        }
    }

    onTravelToRight() {
        if (this.state === RED_FIELD_STATUS.PLAYING) {
            this.state = RED_FIELD_STATUS.TRAVEL_RIGHT;
            this.screen.setTravelDirection(TRAVEL_DIRECTION.RIGHT);
            this.arrows.setTravel(TRAVEL_DIRECTION.RIGHT);
            this.attachTimer(Timer.createFieldTimer(RED_FIELD_TRAVEL_TIMER_MS, this.doOnTravelTimeupCallback));
            Audio.playMusic('mapMode');
        }
    }

    doOnTravelTimeupCallback = () => {
        if (this.isTravelState()) {
            this.getTimer().disable();
            this.state = RED_FIELD_STATUS.PLAYING;
            this.arrows.resetFromTravel();
            this.well.close();
            this.screen.setState(SCREEN_STATE.LANDSCAPE);
            //Anything else??
            Audio.playMusic('redField');
        }
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
        this.getTimer().disable();
        this.screen.setState(SCREEN_STATE.LANDSCAPE);
        Audio.stopMusic();
        Audio.playSFX('sfx25');
        this.screen.progressLandmark();
        this.stageText.setScrollText(I18NManager.translate("arrived_at") + this.screen.getLandmarkText(), this.screen.getLandmarkText(), DEFAULT_TEXT_PERSISTENCE_MILLIS, () => {
            this.state = RED_FIELD_STATUS.PLAYING;
            this.arrows.resetFromTravel();
            this.closeWell();
            this.leftTravelDiglett.reset();
            this.rightTravelDiglett.reset();
            Audio.playMusic('redField');
        });
    }

    onDittoWellCallback = () => {
        this.evolutionScreenChooser = new EvolutionChooserScreen(this.status.captured);
        this.evolutionScreenChooser.show();
        this.state = RED_FIELD_STATUS.EVOLUTION_CHOOSE_SCREEN;
    }

    centerButtonCallback = () => {
        if (millis() > this._lastCallbackCall + CALLBACK_DELAY_MS) {
            this._lastCallbackCall = millis();
            if (this.state === RED_FIELD_STATUS.EVOLUTION_CHOOSE_SCREEN) {
                let selected = this.evolutionScreenChooser.getSelected();
                if (selected !== null) {
                    this.startEvolutionSequence(selected);
                } else {
                    this.state = RED_FIELD_STATUS.PLAYING;
                }

                this.evolutionScreenChooser.remove();
                this.ditto.closeWell();
                this._closeBallOnWayDown = true;
                this.ditto.spitBall(this.getBall());
            }
        }
    }

    startEvolutionSequence(pokemon) {
        this.state = RED_FIELD_STATUS.EVOLUTION;
        //TODO startTimer
        //TODO set dito open when ball is down enough
        this.stageText.setScrollText(I18NManager.translate("start_training"));
        this.screen.startEvolution(pokemon);
        Audio.playMusic('catchEmEvolutionModeRedField');


        //Pick 3 random target arrows to be evolution, the rest just get the pokemon tired
        const pool = [...this.targetArrows];
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        this.evolutionTargetArrows = pool.slice(0, Math.min(3, pool.length));

        this.targetArrows.forEach(ta => {
            ta.setVisible(true);
            ta.setActive(true);
        });
    }

    onEvolutionTargetHit(targetArrow) {
        if (targetArrow.active) {
            if (this.evolutionTargetArrows.includes(targetArrow)) {
                this.spawnEvolutionItem();
            } else {
                this.setPokemonTired();
            }
            targetArrow.setActive(false);
        }
    }

    setPokemonTired() {
        console.log("POKEMON IS TIRED");
        //TODO set pokemon tired for 5 seconds or item not found
        //Try next place
    }

    spawnEvolutionItem() {
        console.log("NEW EVOLUTION ITEM");
        //TODO disable arrows
        //TODO Spawn one random evolution item on the field
    }

}