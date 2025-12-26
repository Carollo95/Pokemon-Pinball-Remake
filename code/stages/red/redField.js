const RED_FIELD_CAPTURE_TIMER_MS = 121000;
const RED_FIELD_EVOLUTION_TIMER_MS = 121000;
const RED_FIELD_TRAVEL_TIMER_MS = 31000;

const RED_FIELD_STATE = {
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



class RedField extends Field {

    constructor(status) {
        super(status);
        this.nextBonusLevelIndex = 0;

        this.background = Asset.getBackground('redFieldBackground');
        this._closeBallOnWayDown = true;

    }

    rightFlipperCallback = () => {
        if (this.controls.hasControlCallbackTimePassed()) {
            this.controls.restartPressCallback();
            if (this.state === RED_FIELD_STATE.EVOLUTION_CHOOSE_SCREEN) {
                this.evolutionScreenChooser.next();
            }
        }

        if (this.state === RED_FIELD_STATE.GAME_START || this.state === RED_FIELD_STATE.NEW_BALL_WAITING) {
            this.launchNewBallWaiting();
            this.setState(RED_FIELD_STATE.PLAYING);
        } else if (this.state === RED_FIELD_STATE.BALL_LOST) {
            this.progressBonusBallScreen();
        } else if (this.state !== RED_FIELD_STATE.EVOLUTION_CHOOSE_SCREEN && this.state !== RED_FIELD_STATE.BALL_LOST) {
            this.getFlippers().moveRightFlipper();
        }
    }

    rightFlipperPressCallback = () => {
        this.ballUpgraderManager.displaceRight();
        this.pikachuSaverManager.doOnRightFlipper();
        this.caveManager.shiftRight();
    }

    centerButtonCallback = () => {
        if (this.controls.hasControlCallbackTimePassed()) {
            this.controls.restartPressCallback();
            if (this.state === RED_FIELD_STATE.EVOLUTION_CHOOSE_SCREEN) {
                let selected = this.evolutionScreenChooser.getSelected();
                if (selected !== null) {
                    this.startEvolutionSequence(selected);
                } else {
                    this.setState(RED_FIELD_STATE.PLAYING);
                }

                this.evolutionScreenChooser.remove();
                this._closeBallOnWayDown = true;
                this.ditto.spitBall(this.getBall());
                this.arrows.evolutionArrowsLevel = 0;
            }
        }
    }

    leftFlipperCallback = () => {
        if (this.controls.hasControlCallbackTimePassed()) {
            this.controls.restartPressCallback();
            if (this.state === RED_FIELD_STATE.EVOLUTION_CHOOSE_SCREEN) {
                this.evolutionScreenChooser.previous();
            }
        }
        if (this.state !== RED_FIELD_STATE.EVOLUTION_CHOOSE_SCREEN && this.state !== RED_FIELD_STATE.BALL_LOST) {
            this.getFlippers().moveLeftFlipper();
        }
    }

    leftFlipperPressCallback = () => {
        this.ballUpgraderManager.displaceLeft();
        this.pikachuSaverManager.doOnLeftFlipper();
        this.caveManager.shiftLeft();
    }


    launchNewBallWaiting() {
        if (this.state === RED_FIELD_STATE.GAME_START) {
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
        
        this.attachBall(Ball.spawnFieldBall(this.onFullUpgradeAgainCallback));

        this.attachFlippers(createTableFlippers());
        this.attachStageText(createStageStatusBanner(this.status));

        this.attachControls(new Controls(this.leftFlipperCallback, this.centerButtonCallback, this.rightFlipperCallback,
            this.leftFlipperPressCallback, () => { }, this.rightFlipperPressCallback
        ));

        this.ditto = new RedFieldDitto(this.onDittoWellCallback);

        this.speedPad = [];
        this.speedPad.push(new SpeedPad(265, 293));
        this.speedPad.push(new SpeedPad(53, 293));
        this.speedPad.push(new SpeedPad(89, 259));

        this.caveManager = new caveManager();

        this.screen = new Screen(
            initialLandmark,
            this.onCaptureThreeBallsCallback,
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
            this.setState(RED_FIELD_STATE.PLAYING);
            this.ditto.close(true);
            this.spitAndCloseWell();
        } else {
            this.setState(RED_FIELD_STATE.GAME_START);
        }

        this.evolutionItems = [];
        this.evolutionItems.push(new EvolutionItem(97, 368));
        this.evolutionItems.push(new EvolutionItem(107, 325));
        this.evolutionItems.push(new EvolutionItem(133, 316));
        this.evolutionItems.push(new EvolutionItem(191, 316));
        this.evolutionItems.push(new EvolutionItem(216, 325));
        this.evolutionItems.push(new EvolutionItem(221, 368));
        this.evolutionItems.push(new EvolutionItem(188, 254));
        this.evolutionItems.push(new EvolutionItem(238, 248));
        this.evolutionItems.push(new EvolutionItem(35, 194));
        this.evolutionItems.push(new EvolutionItem(108, 45));
        this.evolutionItems.push(new EvolutionItem(220, 48));
        this.evolutionItems.push(new EvolutionItem(262, 117));


        this.evolutionManager = new EvolutionManager(this.stageText, this.targetArrows, this.evolutionItems, this.addEvolutionExperienceCallback, this.onFullExperienceCallback);
        this.ballUpgraderManager = new BallUpgraderManager(116, 129, 160, 107, 204, 109);

        this.pikachuSaverManager = new PikachuSaverManager(this.status);

        Audio.playMusic('redField');
    }


    onFullUpgradeAgainCallback = () => {
        this.status.addPoints(POINTS.BALL_FULLY_UPGRADED);
    }

    addEvolutionExperienceCallback = () => {
        this.screen.progressEvolutionAnimation();
    }

    onFullExperienceCallback = () => {
        this.well.open(this.onEvolutionCompletedCallback);
    }

    onEvolutionCompletedCallback = () => {
        this.getTimer().stop();
        //TODO how many points on jackpot
        let targetEvolution = this.screen.showTargetEvolution();
        this.status.addPokemonEvolved(targetEvolution);
        this.stageText.setScrollText(I18NManager.translate("it_evolved_into") + I18NManager.translate(targetEvolution.name), I18NManager.translate(targetEvolution.name), 1000, this.showAfterEvolutionJackpot);
    }

    showAfterEvolutionJackpot = () => {
        Audio.stopMusic();
        Audio.playSFX('sfx26');
        this.addPointsAndShowText(I18NManager.translate("jackpot"), 123456, 3000, this.finishEvolutionPhaseCallback);
    }

    finishEvolutionPhaseCallback = () => {
        this.spitAndCloseWell();
        this.screen.addPokeballsToList(2);
        this.finishEvolutionPhase();
    }

    onDiglettHitCallback = (isRight) => {
        this.status.addPoints(POINTS.TRAVEL_DIGLETT_POINTS);
        if (this.state === RED_FIELD_STATE.EVOLUTION) {
            if (isRight) {
                this.onEvolutionTargetArrowHit(this.rightDiglettTargetArrow);
            } else {
                this.onEvolutionTargetArrowHit(this.leftDiglettTargetArrow);
            }
        }
    }

    setupSensors() {
        this.lastSensor;

        this.rightLowerSensor = new Sensor(284, 214, () => {
            this.lastSensor = this.rightLowerSensor;
        });

        this.rightUpperSensor = new Sensor(248, 106, () => {
            if (this.lastSensor === this.rightLowerSensor) {
                if (this.state === RED_FIELD_STATE.TRAVEL_RIGHT) {
                    this.startTravelCave();
                } else if (this.state === RED_FIELD_STATE.PLAYING) {
                    this.arrows.upgradeCaptureArrows();
                } else if (this.state === RED_FIELD_STATE.EVOLUTION) {
                    this.evolutionManager.recoverPokemon();
                }
            }
            this.lastSensor = this.rightUpperSensor;
        });

        this.leftOuterLowerSensor = new Sensor(35, 214, () => {
            if (!this._closeBallOnWayDown
                && this.state === RED_FIELD_STATE.PLAYING
                && this.shouldOpenEvolutionCave()) {
                this.ditto.fullyOpen();
                this._closeBallOnWayDown = true;
            }

            this.lastSensor = this.leftOuterLowerSensor;
        });
        this.leftMiddleUpperSensor = new Sensor(82, 106, () => {
            if (this.lastSensor === this.leftOuterLowerSensor) {
                if (this.state === RED_FIELD_STATE.TRAVEL_LEFT) {
                    this.startTravelCave();
                } else if (this.state === RED_FIELD_STATE.PLAYING) {
                    this.arrows.upgradeEvolutionArrows();
                } else if (this.state === RED_FIELD_STATE.EVOLUTION) {
                    this.evolutionManager.recoverPokemon();
                }
            }

            this.lastSensor = this.leftMiddleUpperSensor;
        });


        this.leftInnerLowerSensor = new Sensor(76, 223, () => {
            this.lastSensor = this.leftInnerLowerSensor;
        });

        this.leftInnerUpperSensor = new Sensor(73, 168, () => {
            if (this.state === RED_FIELD_STATE.TRAVEL_LEFT && this.lastSensor === this.leftInnerLowerSensor) {
                this.startTravelCave();
            }
            this.lastSensor = this.leftInnerUpperSensor;
        });

        this.leftOuterUpperSensor = new Sensor(58, 89, () => {
            if (this.lastSensor === this.leftOuterLowerSensor) {
                if (this.state === RED_FIELD_STATE.EVOLUTION) {
                    this.evolutionManager.recoverPokemon();
                }
            }
            this.lastSensor = this.leftOuterUpperSensor;
        });

        this.rightOuterUpperSensor = new Sensor(265, 89, () => {
            if (this.lastSensor === this.rightLowerSensor) {
                if (this.state === RED_FIELD_STATE.EVOLUTION) {
                    this.evolutionManager.recoverPokemon();
                }
            }
            this.lastSensor = this.rightOuterUpperSensor;
        });
    }

    onCaptureThreeBallsCallback = () => {
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
        this.disableTimer()
    }

    onCaptureStartAnimatedSpritePhaseCallback = () => {
        this.voltorbsTargetArrow.setActive(false);
    }

    onCaptureCompleteAnimationStartedCallback = (pokemonCaught) => {
        //TODO how many points on jackpot
        this.stageText.setScrollText(I18NManager.translate("you_got_a") + I18NManager.translate(pokemonCaught.name), I18NManager.translate(pokemonCaught.name), 1000, this.showAfterCaptureJackpot);
        this.status.addPokemonCaught(pokemonCaught);
    }

    showAfterCaptureJackpot = () => {
        this.addPointsAndShowText(I18NManager.translate("jackpot"), 123456, 1000);
    }

    onCapturePhaseFinishedCallback = () => {
        this.setState(RED_FIELD_STATE.PLAYING);
        Audio.playMusic('redField');
    }

    captureOnPokemonAnimatedHitCallback = () => {
        this.addPointsAndShowText(I18NManager.translate("hit"), POINTS.CAPTURE_HIT);
    }


    onBellsproutEatCallback = () => {
        //TODO this should increates on travel???
        this.status.bellsproutOnBall++;
        this.status.addPoints(POINTS.BELLSPROUT_POINTS);
        if (this.state === RED_FIELD_STATE.TRAVEL_RIGHT) {
            this.startTravelCave();
        } else if (this.state === RED_FIELD_STATE.PLAYING && this.arrows.captureArrowsLevel >= 2) {
            this.startCaptureSequence();
        }
    }

    startCaptureSequence() {
        this.interruptTravel();
        //TODO close ditto here and on travel if its the case and then open it again
        this.setState(RED_FIELD_STATE.CAPTURE);
        this.attachTimer(Timer.createFieldTimer(RED_FIELD_CAPTURE_TIMER_MS, this.doOnCaptureTimeupCallback));
        this.stageText.setScrollText(I18NManager.translate("lets_get_pokemon"), "");

        this.screen.startCapture(this.arrows.captureArrowsLevel);
        this.arrows.resetCaptureArrows();
        this.voltorbsTargetArrow.setVisible(true);
        this.voltorbsTargetArrow.setActive(true);

        Audio.playMusic('catchEmEvolutionModeRedField');
    }

    doOnCaptureTimeupCallback = () => {
        if (this.state === RED_FIELD_STATE.CAPTURE) {
            this.disableTimer()
            this.stageText.setScrollText(I18NManager.translate("pokemon_ran_away"), "", 1000, () => {
                this.screen.setState(SCREEN_STATE.LANDSCAPE);
                this.setState(RED_FIELD_STATE.PLAYING);
            });
            Audio.playMusic('redField');
        }
    }

    onVoltorbHitCallback = () => {
        this.status.addPoints(POINTS.VOLTORB_BUMPER);
        if (this.state === RED_FIELD_STATE.CAPTURE && this.voltorbsTargetArrow.visible) {
            this.screen.flipCapture();
            this.addPointsAndShowText(I18NManager.translate("flipped"), POINTS.CAPTURE_FLIPPED);
        } else if (this.state === RED_FIELD_STATE.EVOLUTION && this.voltorbsTargetArrow.active) {
            this.onEvolutionTargetArrowHit(this.voltorbsTargetArrow);
        }
    }

    onMultiplierHitCallback = (isRight) => {
        if (this.state === RED_FIELD_STATE.EVOLUTION) {
            if (isRight) {
                this.onEvolutionTargetArrowHit(this.rightMultiplierTargetArrow);
            } else {
                this.onEvolutionTargetArrowHit(this.leftMultiplierTargetArrow);
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

        this.caveManager.update(this.getBall().sprite);

        this.leftMultiplier.update(this.getBall().sprite);
        this.rightMultiplier.update(this.getBall().sprite);

        this.pikachuSaverManager.update(this.getBall());

        this.updateDitto();
        this.ballUpgraderManager.update(this.getBall());
        if (this.state === RED_FIELD_STATE.PLAYING || this.state === RED_FIELD_STATE.CAPTURE || this.state === RED_FIELD_STATE.EVOLUTION || this.isTravelState()) {
            this.checkForBallLoss();

            this.speedPad.forEach(pad => pad.update(this.getBall()));

            if (this.state === RED_FIELD_STATE.EVOLUTION) {
                this.evolutionManager.update(this.getBall().sprite);
            }

        } else if (this.state === RED_FIELD_STATE.BALL_LOST) {
            this.ballBonusScreen.update();
        }

    }

    updateArrows() {
        this.arrows.update(this.state !== RED_FIELD_STATE.CAPTURE && this.state !== RED_FIELD_STATE.EVOLUTION);
    }

    updateSensors() {
        this.rightLowerSensor.update(this.getBall().sprite);
        this.rightUpperSensor.update(this.getBall().sprite);
        this.rightOuterUpperSensor.update(this.getBall().sprite);
        this.leftOuterLowerSensor.update(this.getBall().sprite);
        this.leftOuterUpperSensor.update(this.getBall().sprite);
        this.leftInnerLowerSensor.update(this.getBall().sprite);
        this.leftInnerUpperSensor.update(this.getBall().sprite);
        this.leftMiddleUpperSensor.update(this.getBall().sprite);
    }

    updateDitto() {
        let dittoState = undefined;

        switch (this.state) {
            case RED_FIELD_STATE.EVOLUTION:
                if (this._closeBallOnWayDown && this.ballInPositionToCloseDitto() && !this.ditto.isOpen()) {
                    dittoState = RED_FIELD_DITTO_STATE.OPEN;
                    this._closeBallOnWayDown = false;
                }
                break;
            case RED_FIELD_STATE.PLAYING:
            case RED_FIELD_STATE.CAPTURE:
            case RED_FIELD_STATE.TRAVEL_LEFT:
            case RED_FIELD_STATE.TRAVEL_RIGHT:
            case RED_FIELD_STATE.TRAVEL_CAVE:
                if (this._closeBallOnWayDown && this.ballInPositionToCloseDitto()) {
                    dittoState = RED_FIELD_DITTO_STATE.CLOSE;
                    this._closeBallOnWayDown = false;
                }
                break;
        }

        this.ditto.setState(dittoState);
        this.ditto.update(this.getBall());
    }

    ballInPositionToCloseDitto() {
        return this.getBall().getPositionY() > 240 && this.getBall().getPositionX() < 45;
    }

    shouldOpenEvolutionCave() {
        return this.arrows.evolutionArrowsLevel === 3;
    }

    updateScreen() {
        this.screen.update(this.getBall());
    }

    checkForBallLoss() {
        if (this.ball.getPositionY() > SCREEN_HEIGHT) {
            if (this.state === RED_FIELD_STATE.CAPTURE) {
                this.interruptCapture();
            } else if (this.state === RED_FIELD_STATE.EVOLUTION) {
                this.interruptEvolution();
            } else if (this.isTravelState()) {
                this.interruptTravel();
            }
            this.screen.setState(SCREEN_STATE.LANDSCAPE);
            this.closeWell();
            this.ditto.close(true);
            this.ditto.removeLauncherDoor();
            this.setState(RED_FIELD_STATE.BALL_LOST);
            //TODO after ball loss, what happens with the capture level, goes to 0 or to 2?
            this.arrows.restart();
            Audio.playSFX('sfx24');
            this.stageText.setScrollText(I18NManager.translate("end_of_ball_bonus"), "", 1000, () => { this.ballBonusScreen.show(); });
            Audio.stopMusic();
        }
    }

    interruptCapture() {
        if (this.state === RED_FIELD_STATE.CAPTURE) {
            this.disableTimer()
            this.screen.setState(SCREEN_STATE.LANDSCAPE);
            this.setState(RED_FIELD_STATE.PLAYING);
            this.voltorbsTargetArrow.setVisible(false);
        }
    }

    interruptEvolution() {
        if (this.state === RED_FIELD_STATE.EVOLUTION) {
            this.disableTimer()
            this.evolutionManager.interruptEvolution();
            this.screen.setState(SCREEN_STATE.LANDSCAPE);
            this.setState(RED_FIELD_STATE.PLAYING);
            this.ditto.close(true);
        }
    }

    interruptTravel() {
        if (this.isTravelState()) {
            this.disableTimer()
            this.closeWell();
            this.arrows.resetFromTravel();
            this.setState(RED_FIELD_STATE.PLAYING);
            this.leftTravelDiglett.reset();
            this.rightTravelDiglett.reset();
            this.screen.setState(SCREEN_STATE.LANDSCAPE);
            Audio.playMusic('redField');
        }
    }

    createNewBallOrEndStage() {
        if (this.status.balls > 0) {
            this.status.startNewBall()
            this.caveManager.reset();
            this.leftTravelDiglett.reset();
            this.rightTravelDiglett.reset();
            this.pikachuSaverManager.reset();
            this.attachBall(Ball.spawnFieldBall(this.onFullUpgradeAgainCallback));
            this.ditto.open();
            this.arrows.setCaptureArrowsLevel(2);
            this.setState(RED_FIELD_STATE.NEW_BALL_WAITING);
            Audio.playMusic('redField');
        } else {
            this.setState(RED_FIELD_STATE.GAME_OVER);
            console.log("GAME OVER");
        }
    }

    openWell(callback) {
        this.well.open(callback);
        this.arrows.turnOnCaveArrow();
    }

    spitAndCloseWell() {
        this.well.spitBall(this.getBall());
        this.arrows.turnOffCaveArrow();
    }

    closeWell() {
        this.well.close();
        this.arrows.turnOffCaveArrow();
    }

    onTravelToLeft() {
        if (this.state === RED_FIELD_STATE.PLAYING) {
            //TODO close ditto if open and then open it again if it was closed
            this.setState(RED_FIELD_STATE.TRAVEL_LEFT);
            this.screen.setTravelDirection(TRAVEL_DIRECTION.LEFT);
            this.arrows.setTravel(TRAVEL_DIRECTION.LEFT);
            this.attachTimer(Timer.createFieldTimer(RED_FIELD_TRAVEL_TIMER_MS, this.doOnTravelTimeupCallback));
            Audio.playMusic('mapMode');
        }
    }

    onTravelToRight() {
        if (this.state === RED_FIELD_STATE.PLAYING) {
            this.setState(RED_FIELD_STATE.TRAVEL_RIGHT);
            this.screen.setTravelDirection(TRAVEL_DIRECTION.RIGHT);
            this.arrows.setTravel(TRAVEL_DIRECTION.RIGHT);
            this.attachTimer(Timer.createFieldTimer(RED_FIELD_TRAVEL_TIMER_MS, this.doOnTravelTimeupCallback));
            Audio.playMusic('mapMode');
        }
    }

    doOnTravelTimeupCallback = () => {
        this.interruptTravel();
    }

    isTravelState() {
        return this.state === RED_FIELD_STATE.TRAVEL_LEFT || this.state === RED_FIELD_STATE.TRAVEL_RIGHT || this.state === RED_FIELD_STATE.TRAVEL_CAVE;
    }

    startTravelCave() {
        this.setState(RED_FIELD_STATE.TRAVEL_CAVE);
        this.screen.setTravelDirection(TRAVEL_DIRECTION.CAVE);
        this.arrows.setTravel(TRAVEL_DIRECTION.CAVE);
        this.openWell(this.onTravelCaveCallback);
    }

    onTravelCaveCallback = () => {
        this.disableTimer()
        this.screen.setState(SCREEN_STATE.LANDSCAPE);
        Audio.stopMusic();
        Audio.playSFX('sfx25');
        this.screen.progressLandmark();
        this.stageText.setScrollText(I18NManager.translate("arrived_at") + this.screen.getLandmarkText(), this.screen.getLandmarkText(), DEFAULT_TEXT_PERSISTENCE_MILLIS, () => {
            this.setState(RED_FIELD_STATE.PLAYING);
            this.arrows.resetFromTravel();
            this.spitAndCloseWell();
            this.leftTravelDiglett.reset();
            this.rightTravelDiglett.reset();
            Audio.playMusic('redField');
        });
    }

    onDittoWellCallback = () => {
        this.evolutionScreenChooser = new EvolutionChooserScreen(this.status.captured);
        this.evolutionScreenChooser.show();
        this.setState(RED_FIELD_STATE.EVOLUTION_CHOOSE_SCREEN);
    }


    startEvolutionSequence(pokemon) {
        this.setState(RED_FIELD_STATE.EVOLUTION);
        this.attachTimer(Timer.createFieldTimer(RED_FIELD_EVOLUTION_TIMER_MS, this.doOnEvolutionTimeupCallback));
        this.stageText.setScrollText(I18NManager.translate("start_training"));
        this.screen.startEvolution(pokemon);
        Audio.playMusic('catchEmEvolutionModeRedField');

        this.evolutionManager.startEvolution(pokemon);
    }

    doOnEvolutionTimeupCallback = () => {
        this.finishEvolutionPhase();
    }

    finishEvolutionPhase() {
        this.getTimer().disable();
        this.setState(RED_FIELD_STATE.PLAYING);
        this.ditto.close();
        this.arrows.resetEvolutionArrows();
        this.screen.setState(SCREEN_STATE.LANDSCAPE);
        Audio.playMusic('redField');

    }

    onEvolutionTargetArrowHit(targetArrow) {
        this.evolutionManager.onEvolutionTargetArrowHit(targetArrow);
    }

    setState(state) {
        this.state = state;
    }

}