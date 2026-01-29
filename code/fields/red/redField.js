const RED_FIELD_BONUS_ORDER = [FIELD_BONUS.MOLE, FIELD_BONUS.GHOST, FIELD_BONUS.CLONE];

class RedField extends Field {

    constructor(status) {
        super(status);
        this.background = Asset.getBackground('redFieldBackground');
    }

    onEvolutionTargetSelectedOnDitto = (selected) => {
        if (selected !== null) {
            this.startEvolutionSequence(selected);
        } else {
            this.setState(FIELD_STATE.PLAYING);
        }

        this.evolutionScreenChooser.remove();
        this._closeBallOnWayDown = true;
        this.ditto.spitBall(this.getBall());
        this.arrows.evolutionArrowsLevel = 0;
    }

    onLaunchNewBallWaiting() {
        this.ditto.removeLauncherDoor();
    }


    setup(initialLandmark = undefined, arrowsState = undefined, spawnOnWell = false, pikachuSaverState = undefined, multiplierLevel = undefined, caveActive = false) {
        super.setup(initialLandmark, arrowsState, spawnOnWell, pikachuSaverState, multiplierLevel, caveActive);

        RED_FIELD_GEOMETRY.forEach(p => this.createScenarioGeometry(p));
        this.bonusStages = RED_FIELD_BONUS_ORDER;


        this.ditto = new RedFieldDitto(this.onDittoWellCallback);

        this.speedPad.push(new SpeedPad(265, 293));
        this.speedPad.push(new SpeedPad(53, 293));
        this.speedPad.push(new SpeedPad(89, 259));

        this.leftTravelDiglett = new TravelDiglett(() => { this.onDiglettHitCallback(false) }, () => { this.status.dugtrioOnBall++; this.onTravelToLeft(); }, false);
        this.rightTravelDiglett = new TravelDiglett(() => { this.onDiglettHitCallback(true) }, () => { this.status.dugtrioOnBall++; this.onTravelToRight(); }, true);

        this.voltorbs = [];
        this.voltorbs.push(new RedFieldVoltorb(132, 172, this.onVoltorbHitCallback));
        this.voltorbs.push(new RedFieldVoltorb(182, 154, this.onVoltorbHitCallback));
        this.voltorbs.push(new RedFieldVoltorb(170, 208, this.onVoltorbHitCallback));

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

        this.staryu = new RedFieldStaryu();

        this.setupSensors();


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


        this.rightRubberBand = RedFieldRubberBand.createLeftRubberBand();
        this.leftRubberBand = RedFieldRubberBand.createRightRubberBand();

    }

    onSpawnOnWell() {
        this.ditto.close(true);
    }

    onDiglettHitCallback = (isRight) => {
        EngineUtils.addPointsForBallHelper(POINTS.RED_FIELD_TRAVEL_DIGLETT);
        if (this.state === FIELD_STATE.EVOLUTION) {
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
                if (this.state === FIELD_STATE.TRAVEL_RIGHT) {
                    this.startTravelCave();
                } else if (this.state === FIELD_STATE.PLAYING) {
                    this.arrows.upgradeCaptureArrows();
                } else if (this.state === FIELD_STATE.EVOLUTION) {
                    this.evolutionManager.recoverPokemon();
                }
            }
            this.lastSensor = this.rightUpperSensor;
        });

        this.leftOuterLowerSensor = new Sensor(35, 214, () => {
            if (!this._closeBallOnWayDown
                && this.state === FIELD_STATE.PLAYING
                && this.shouldOpenEvolutionCave()) {
                this.ditto.fullyOpen();
                this._closeBallOnWayDown = true;
            }

            this.lastSensor = this.leftOuterLowerSensor;
        });
        this.leftMiddleUpperSensor = new Sensor(82, 106, () => {
            if (this.lastSensor === this.leftOuterLowerSensor) {
                if (this.state === FIELD_STATE.TRAVEL_LEFT) {
                    this.startTravelCave();
                } else if (this.state === FIELD_STATE.PLAYING) {
                    this.arrows.upgradeEvolutionArrows();
                } else if (this.state === FIELD_STATE.EVOLUTION) {
                    this.evolutionManager.recoverPokemon();
                }
            }

            this.lastSensor = this.leftMiddleUpperSensor;
        });


        this.leftInnerLowerSensor = new Sensor(76, 223, () => {
            this.lastSensor = this.leftInnerLowerSensor;
        });

        this.leftInnerUpperSensor = new Sensor(73, 168, () => {
            if (this.state === FIELD_STATE.TRAVEL_LEFT && this.lastSensor === this.leftInnerLowerSensor) {
                this.startTravelCave();
            }
            this.lastSensor = this.leftInnerUpperSensor;
        });

        this.leftOuterUpperSensor = new Sensor(58, 89, () => {
            if (this.lastSensor === this.leftOuterLowerSensor) {
                if (this.state === FIELD_STATE.EVOLUTION) {
                    this.evolutionManager.recoverPokemon();
                }
            }
            this.lastSensor = this.leftOuterUpperSensor;
        });

        this.rightOuterUpperSensor = new Sensor(265, 89, () => {
            if (this.lastSensor === this.rightLowerSensor) {
                if (this.state === FIELD_STATE.EVOLUTION) {
                    this.evolutionManager.recoverPokemon();
                }
            }
            this.lastSensor = this.rightOuterUpperSensor;
        });
    }


    disableCaptureTargetArrow() {
        this.voltorbsTargetArrow.setActive(false);
    }

    playMusic() {
        Audio.playMusic('redField');
    }

    onBellsproutEatCallback = () => {
        //TODO this should increates on travel???
        this.status.bellsproutOnBall++;
        EngineUtils.addPointsForBallHelper(POINTS.RED_FIELD_BELLSPROUT);
        if (this.state === FIELD_STATE.TRAVEL_RIGHT) {
            this.startTravelCave();
        } else if (this.state === FIELD_STATE.PLAYING && this.arrows.captureArrowsLevel >= 2) {
            this.startCaptureSequence();
        }
    }

    startCaptureSequence() {
        this.interruptCave();
        this.interruptTravel();
        this.setState(FIELD_STATE.CAPTURE);
        this.attachTimer(Timer.createFieldTimer(FIELD_CAPTURE_TIMER_MS, this.doOnCaptureTimeupCallback));
        this.stageText.setScrollText(I18NManager.translate("lets_get_pokemon"), "");

        this.screen.startCapture(this.arrows.captureArrowsLevel);
        this.arrows.resetCaptureArrows();
        this.voltorbsTargetArrow.setVisible(true);
        this.voltorbsTargetArrow.setActive(true);

        this.saverAgain.set60sSaver();

        this.playCatchemEvolutionMusic();
    }

    playCatchemEvolutionMusic() {
        Audio.playMusic('catchEmEvolutionModeRedField');
    }

    doOnCaptureTimeupCallback = () => {
        if (this.state === FIELD_STATE.CAPTURE) {
            this.disableTimer()
            this.stageText.setScrollText(I18NManager.translate("pokemon_ran_away"), "", 1000, () => {
                this.screen.setState(SCREEN_STATE.LANDSCAPE);
                this.setState(FIELD_STATE.PLAYING);
            });
            this.playMusic();
            this.voltorbsTargetArrow.setVisible(false);
        }
    }

    onVoltorbHitCallback = () => {
        EngineUtils.addPointsForBallHelper(POINTS.RED_FIELD_VOLTORB_BUMPER);
        if (this.state === FIELD_STATE.CAPTURE && this.voltorbsTargetArrow.visible) {
            this.screen.flipCapture();
            this.addPointsAndShowText(I18NManager.translate("flipped"), POINTS.CAPTURE_FLIPPED);
        } else if (this.state === FIELD_STATE.EVOLUTION && this.voltorbsTargetArrow.active) {
            this.onEvolutionTargetArrowHit(this.voltorbsTargetArrow);
        }
    }

    draw() {
        super.draw();

        this.leftTravelDiglett.update(this.getBall().sprite);
        this.rightTravelDiglett.update(this.getBall().sprite);

        this.voltorbs.forEach(v => v.update(this.getBall().sprite));
        this.bellsprout.update(this.getBall().sprite);

        this.staryu.update(this.getBall().sprite);

        this.updateDitto();
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
            case FIELD_STATE.EVOLUTION:
                if (this._closeBallOnWayDown && this.ballInPositionToCloseDitto() && !this.ditto.isOpen()) {
                    dittoState = RED_FIELD_DITTO_STATE.OPEN;
                    this._closeBallOnWayDown = false;
                }
                break;
            case FIELD_STATE.PLAYING:
            case FIELD_STATE.CAPTURE:
            case FIELD_STATE.TRAVEL_LEFT:
            case FIELD_STATE.TRAVEL_RIGHT:
            case FIELD_STATE.TRAVEL_CAVE:
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



    onLaunchNewBall() {
        this.ditto.open();
    }


    onStartNewBall() {
        this.ditto.close(true);
        this.ditto.removeLauncherDoor();
    }


    onInterruptCapture() {
        this.voltorbsTargetArrow.setVisible(false);

    }

    onInterruptEvolution() {
        this.ditto.close(true);

    }

    resetTravelTriggers() {
        this.leftTravelDiglett.reset();
        this.rightTravelDiglett.reset();
    }

    onDittoWellCallback = () => {
        EngineUtils.addPointsForBallHelper(POINTS.EVOLUTION_HOLE);
        this.openEvolutionChooserScreen(this.onEvolutionTargetSelectedOnDitto);
    }

    openEvolutionChooserScreen = (onEvolutionTargetSelectedCallback) => {
        this.evolutionScreenChooser = new EvolutionChooserScreen(this.status.captured, onEvolutionTargetSelectedCallback);
        this.evolutionScreenChooser.show();
        this.setState(FIELD_STATE.EVOLUTION_CHOOSE_SCREEN);
    }

    startEvolutionSequence(pokemon) {
        this.interruptCave();
        this.setState(FIELD_STATE.EVOLUTION);
        this.attachTimer(Timer.createFieldTimer(FIELD_EVOLUTION_TIMER_MS, this.doOnEvolutionTimeupCallback));
        this.stageText.setScrollText(I18NManager.translate("start_training"));
        this.screen.startEvolution(pokemon);
        Audio.playMusic('catchEmEvolutionModeRedField');

        this.saverAgain.set60sSaver();

        this.evolutionManager.startEvolution(pokemon);
    }

    doOnEvolutionTimeupCallback = () => {
        this.finishEvolutionPhase();
    }

    onFinishEvolutionPhase() {
        this.ditto.close();
    }

    onEvolutionTargetArrowHit(targetArrow) {
        this.evolutionManager.onEvolutionTargetArrowHit(targetArrow);
    }

    onEvolutionModeSelectedOnSlots = (selected) => {
        if (selected !== null) {
            this.startEvolutionSequence(selected);
        } else {
            this.setState(FIELD_STATE.PLAYING);
        }

        this.evolutionScreenChooser.remove();
        this.arrows.evolutionArrowsLevel = 0;
        this.spitAndCloseWell();
    }

    getLeftMultiplierTarget() { return RedFieldMultiplierTarget.createLeftMultiplierTarget(this.onLeftMultiplierHitCallback); }
    getArrows() { return new RedFieldArrows(); }
    getRightMultiplierTarget() { return RedFieldMultiplierTarget.createRightMultiplierTarget(this.onRightMultiplierHitCallback); }
    getBallUpgraderManager() { return BallUpgraderManager.createRedFieldBallUpgraderManager(); }
    getPikachuSaverManager() { return PikachuSaverManager.createRedFieldPikachuSaverManager(this.status); }
    getScreenLandscapes() { return new RedFieldScreenLandscapes(); }
}