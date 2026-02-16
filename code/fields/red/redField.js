const RED_FIELD_BONUS_ORDER = [FIELD_BONUS.MOLE, FIELD_BONUS.GHOST, FIELD_BONUS.CLONE];

class RedField extends Field {

    constructor(status) {
        super(status);
        this.background = Asset.getBackground('redFieldBackground');
    }

    onAfterEvolutionTargetSelectedOnEvolutionHole() {
        this._closeBallOnWayDown = true;
        this.ditto.spitBall(this.getBall());
    }

    onLaunchNewBallWaiting() {
        this.ditto.removeLauncherDoor();
    }


    setup(initialLandmark = undefined, arrowsState = undefined, spawnOnWell = false, pikachuSaverState = undefined, multiplierLevel = undefined, caveActive = false) {
        super.setup(initialLandmark, arrowsState, spawnOnWell, pikachuSaverState, multiplierLevel, caveActive);

        RED_FIELD_GEOMETRY.forEach(p => this.createScenarioGeometry(p));
        this.bonusStages = RED_FIELD_BONUS_ORDER;


        this.ditto = new RedFieldDitto(this.onEvolutionWellCallback);

        this.speedPad.push(new SpeedPad(265, 293));
        this.speedPad.push(new SpeedPad(53, 293));
        this.speedPad.push(new SpeedPad(89, 259));

        this.leftTravelDiglett = new TravelDiglett(() => { this.onTravelHitCallback(false) }, () => { this.status.dugtrioOnBall++; this.onTravelToLeft(); }, false);
        this.rightTravelDiglett = new TravelDiglett(() => { this.onTravelHitCallback(true) }, () => { this.status.dugtrioOnBall++; this.onTravelToRight(); }, true);

        this.bumpers.push(new RedFieldVoltorb(132, 172, this.onBumperHitCallback));
        this.bumpers.push(new RedFieldVoltorb(182, 154, this.onBumperHitCallback));
        this.bumpers.push(new RedFieldVoltorb(170, 208, this.onBumperHitCallback));

        this.bumpersTargetArrow = new TargetArrow(130, 210, 6);
        this.leftTravelTargetArrow = new TargetArrow(83, 364, 0);
        this.rightTravelTargetArrow = new TargetArrow(238, 364, 1);
        this.leftMultiplierTargetArrow = new TargetArrow(96, 308, 4);
        this.rightMultiplierTargetArrow = new TargetArrow(224, 308, 5);

        this.targetArrows.push(this.leftTravelTargetArrow);
        this.targetArrows.push(this.rightTravelTargetArrow);
        this.targetArrows.push(this.bumpersTargetArrow);
        this.targetArrows.push(this.leftMultiplierTargetArrow);
        this.targetArrows.push(this.rightMultiplierTargetArrow);

        this.captureWell = new RedFieldBellsprout(this.onBellsproutEatCallback);

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

    playMusic() {
        Audio.playMusic('redField');
    }

    onBellsproutEatCallback = () => {
        //TODO this should increates on travel???
        this.status.addCaptureWellOnBall();
        EngineUtils.addPointsForBallHelper(POINTS.FIELD_CAPTURE_WELL);
        if (this.state === FIELD_STATE.TRAVEL_RIGHT) {
            this.startTravelCave();
        } else if (this.state === FIELD_STATE.PLAYING && this.arrows.captureArrowsLevel >= 2) {
            this.startCaptureSequence();
        }
    }

    playCatchemEvolutionMusic() {
        Audio.playMusic('catchEmEvolutionModeRedField');
    }

    draw() {
        super.draw();

        this.leftTravelDiglett.update(this.getBall().sprite);
        this.rightTravelDiglett.update(this.getBall().sprite);

        this.updateDitto();

        this.staryu.update(this.getBall().sprite);
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

    onInterruptEvolution() {
        this.ditto.close(true);
    }

    resetTravelTriggers() {
        this.leftTravelDiglett.reset();
        this.rightTravelDiglett.reset();
    }

    onFinishEvolutionPhase() {
        this.ditto.close();
    }


    getLeftMultiplierTarget() { return RedFieldMultiplierTarget.createLeftMultiplierTarget(this.onLeftMultiplierHitCallback); }
    getRightMultiplierTarget() { return RedFieldMultiplierTarget.createRightMultiplierTarget(this.onRightMultiplierHitCallback); }
    getArrows() { return new RedFieldArrows(); }
    getBallUpgraderManager() { return BallUpgraderManager.createRedFieldBallUpgraderManager(); }
    getPikachuSaverManager() { return PikachuSaverManager.createRedFieldPikachuSaverManager(this.status); }
    getScreenLandscapes() { return new RedFieldScreenLandscapes(); }
    getBonusStateStates() { return RED_FIELD_BALL_SCREEN_LINES_ORDER; }
    getHighScoresTable() { return HIGH_SCORE_TABLES.RED; }
}