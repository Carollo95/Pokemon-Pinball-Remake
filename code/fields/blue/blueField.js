const BLUE_FIELD_BONUS_ORDER = [FIELD_BONUS.CAT, FIELD_BONUS.SEAL, FIELD_BONUS.CLONE];

class BlueField extends Field {

    constructor(status) {
        super(status);

        this.background = Asset.getBackground('blueFieldBackground');
    }

    setup(initialLandmark = undefined, arrowsState = undefined, spawnOnWell = false, pikachuSaverState = undefined, multiplierLevel = undefined, caveActive = false) {
        super.setup(initialLandmark, arrowsState, spawnOnWell, pikachuSaverState, multiplierLevel, caveActive);

        BLUE_FIELD_GEOMETRY.forEach(p => this.createScenarioGeometry(p));
        this.bonusStages = BLUE_FIELD_BONUS_ORDER;

        this.setupSensors();

        this.leftTravelPoliwag = new BlueFieldTravelPoliwag(() => { this.onTravelHitCallback(false) }, () => { this.status.poliwagOnBall++; this.onTravelToLeft(); });
        this.leftTravelPsyduck = new BlueFieldTravelPsyduck(() => { this.onTravelHitCallback(true) }, () => { this.status.psyduckOnBall++; this.onTravelToRight(); });

        this.bumpers.push(new BlueFieldShellder(117, 140, this.onBumperHitCallback));
        this.bumpers.push(new BlueFieldShellder(160, 107, this.onBumperHitCallback));
        this.bumpers.push(new BlueFieldShellder(202, 141, this.onBumperHitCallback));

        this.bumpersTargetArrow = new TargetArrow(159, 152, 2);
        this.leftMultiplierTargetArrow = new TargetArrow(96, 318, 4);
        this.rightMultiplierTargetArrow = new TargetArrow(224, 318, 5);
        this.leftTravelTargetArrow = new TargetArrow(74, 362, 0);
        this.rightTravelTargetArrow = new TargetArrow(240, 362, 1);

        this.targetArrows.push(this.leftTravelTargetArrow);
        this.targetArrows.push(this.rightTravelTargetArrow);
        this.targetArrows.push(this.bumpersTargetArrow);
        this.targetArrows.push(this.leftMultiplierTargetArrow);
        this.targetArrows.push(this.rightMultiplierTargetArrow);

        //TODO add evolution items

        this.captureWell = new BlueFieldCloyster(this.onCloysterEatCallback);
        this.evolutionWell = new BlueFieldSlowbro(this.onEvolutionWellCallback);

        this.blueArrow = new BlueArrow(this.onBlueFieldArrowCallback);

        this.speedPad.push(new SpeedPad(48, 298));
        this.speedPad.push(new SpeedPad(272, 296));
        this.speedPad.push(new SpeedPad(159, 245, 12, 0.2));

        this.rightRubberBand = BlueFieldRubberBand.createLeftRubberBand();
        this.leftRubberBand = BlueFieldRubberBand.createRightRubberBand();

        this._closeBallOnWayDown = true;
    }

    onBlueFieldArrowCallback = (direction) => {
        this.arrows.flipCentralArrow(direction);
    }

    onCloysterEatCallback = () => {
        //TODO this should increates on travel???
        this.status.cloysterOnBall++;
        EngineUtils.addPointsForBallHelper(POINTS.FIELD_CAPTURE_WELL);
        if (this.state === FIELD_STATE.TRAVEL_RIGHT) {
            this.startTravelCave();
        } else if (this.state === FIELD_STATE.PLAYING && this.arrows.captureArrowsLevel >= 2) {
            this.startCaptureSequence();
        }
        this.blueArrow.restartTimer();
    }

    setupSensors() {
        this.lastSensor;

        this.rightLowerSensor = new Sensor(280, 276, () => {
            this.lastSensor = this.rightLowerSensor;
        });

        this.rightUpperSensor = new Sensor(279, 104, () => {
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

        this.leftLowerSensor = new Sensor(38, 278, () => {
            if (this._closeBallOnWayDown) {
                this.createLauncherDoor();
                this._closeBallOnWayDown = false;
            }

            this.lastSensor = this.leftLowerSensor;
        });

        this.leftUpperSensor = new Sensor(41, 105, () => {
            if (this.lastSensor === this.leftLowerSensor) {
                if (this.state === FIELD_STATE.EVOLUTION) {
                    this.evolutionManager.recoverPokemon();
                } else if (this.state === FIELD_STATE.PLAYING) {
                    this.arrows.upgradeEvolutionArrows();
                } else if (this.state === FIELD_STATE.TRAVEL_LEFT) {
                    this.startTravelCave();
                }
            }
            this.lastSensor = this.leftUpperSensor;
        });

    }


    updateSensors() {
        this.rightLowerSensor.update(this.getBall().sprite);
        this.rightUpperSensor.update(this.getBall().sprite);
        this.leftUpperSensor.update(this.getBall().sprite);
        this.leftLowerSensor.update(this.getBall().sprite);
    }

    draw() {
        super.draw();

        this.evolutionWell.update(this.getBall());

        this.leftTravelPoliwag.update(this.getBall().sprite);
        this.leftTravelPsyduck.update(this.getBall().sprite);

        this.blueArrow.update(this.getBall().sprite, this.arrows.captureArrowsLevel >= 2, this.arrows.evolutionArrowsLevel >= 3, this.state);
    }

    onAfterEvolutionTargetSelectedOnEvolutionHole() {
        this.blueArrow.restartTimer();
        this.evolutionWell.spitBall(this.getBall());
    }

    createLauncherDoor() {
        if (this.launcherDoor) return;

        this.launcherDoor = new Sprite([
            [175, 11],
            [223, 25],
            [255, 48],
            [273, 68],
            [290, 92],
            [290, 11],
            [175, 11]
        ], "static");
        this.launcherDoor.layer = SCENARIO_LAYER;
        this.launcherDoor.debug = DEBUG;
        this.launcherDoor.visible = false;
    }


    removeLauncherDoor() {
        this.launcherDoor && this.launcherDoor.remove();
        this.launcherDoor = undefined;
    }

    onLaunchNewBallWaiting() {
        this._closeBallOnWayDown = true;
        this.removeLauncherDoor();
    }

    resetTravelTriggers() {
        this.leftTravelPoliwag.reset();
        this.rightTravelPsyduck.reset();
    }


    playMusic() {
        Audio.playMusic('blueField');
    }

    playCatchemEvolutionMusic() {
        Audio.playMusic('catchEmEvolutionModeBlueField');
    }

    getLeftMultiplierTarget() { return BlueFieldMultiplierTarget.createLeftMultiplierTarget(this.onLeftMultiplierHitCallback); }
    getArrows() { return new BlueFieldArrows(); }
    getRightMultiplierTarget() { return BlueFieldMultiplierTarget.createRightMultiplierTarget(this.onRightMultiplierHitCallback); }
    getBallUpgraderManager() { return BallUpgraderManager.createBlueFieldBallUpgraderManager(); }
    getPikachuSaverManager() { return PikachuSaverManager.createBlueFieldPikachuSaverManager(this.status); }
    getScreenLandscapes() { return new BlueFieldScreenLandscapes(); }
    getBonusStateStates() { return BLUE_FIELD_BALL_SCREEN_LINES_ORDER; }
    getHighScoresTable() { return HIGH_SCORE_TABLES.BLUE; }

}