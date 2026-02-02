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
        this.targetArrows.push(this.bumpersTargetArrow);

        this.captureWell = new BlueFieldCloyster(this.onCloysterEatCallback);
        this.evolutionWell = new BlueFieldSlowbro(this.onEvolutionWellCallback);

        //TODO change position and sprite

        this.speedPad.push(new SpeedPad(48, 298));
        this.speedPad.push(new SpeedPad(272, 296));

        this.rightRubberBand = BlueFieldRubberBand.createLeftRubberBand();
        this.leftRubberBand = BlueFieldRubberBand.createRightRubberBand();
    }

    onCloysterEatCallback = () => {
        //TODO this should increates on travel???
        this.status.cloysterOnBall++;
        EngineUtils.addPointsForBallHelper(POINTS.BLUE_FIELD_CLOYSTER);
        if (this.state === FIELD_STATE.TRAVEL_RIGHT) {
            this.startTravelCave();
        } else if (this.state === FIELD_STATE.PLAYING && this.arrows.captureArrowsLevel >= 2) {
            this.startCaptureSequence();
        }
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
    }

    onAfterEvolutionTargetSelectedOnEvolutionHole() {
        this.evolutionWell.spitBall(this.getBall());
    }


    getLeftMultiplierTarget() { return BlueFieldMultiplierTarget.createLeftMultiplierTarget(this.onLeftMultiplierHitCallback); }
    getArrows() { return new BlueFieldArrows(); }
    getRightMultiplierTarget() { return BlueFieldMultiplierTarget.createRightMultiplierTarget(this.onRightMultiplierHitCallback); }
    getBallUpgraderManager() { return BallUpgraderManager.createBlueFieldBallUpgraderManager(); }
    getPikachuSaverManager() { return PikachuSaverManager.createBlueFieldPikachuSaverManager(this.status); }
    getScreenLandscapes() { return new BlueFieldScreenLandscapes(); }
    getBonusStateStates() { return BLUE_FIELD_BALL_SCREEN_LINES_ORDER; }

}