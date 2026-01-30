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

        this.leftTravelPoliwag = new BlueFieldTravelPoliwag(() => { this.onTravelHitCallback(false) }, () => { this.status.poliwag++; this.onTravelToLeft(); });
        this.leftTravelPsyduck = new BlueFieldTravelPsyduck(() => { this.onTravelHitCallback(true) }, () => { this.status.psyduck++; this.onTravelToRight(); });
        
        this.bumpers.push(new BlueFieldShellder(117, 140, this.onShellderHitCallback));
        this.bumpers.push(new BlueFieldShellder(160, 107, this.onShellderHitCallback));
        this.bumpers.push(new BlueFieldShellder(202, 141, this.onShellderHitCallback));

        this.shelldersTargetArrow = new TargetArrow(130, 210, 6);
        this.targetArrows.push(this.shelldersTargetArrow);

        this.rightRubberBand = BlueFieldRubberBand.createLeftRubberBand();
        this.leftRubberBand = BlueFieldRubberBand.createRightRubberBand();
    }

    onShellderHitCallback = () => {
        EngineUtils.addPointsForBallHelper(POINTS.BLUE_FIELD_SHELLDER_BUMPER);
        if (this.state === FIELD_STATE.CAPTURE && this.shelldersTargetArrow.visible) {
            this.screen.flipCapture();
            this.addPointsAndShowText(I18NManager.translate("flipped"), POINTS.CAPTURE_FLIPPED);
        } else if (this.state === FIELD_STATE.EVOLUTION && this.shelldersTargetArrow.active) {
            this.onEvolutionTargetArrowHit(this.shelldersTargetArrow);
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

        this.leftTravelPoliwag.update(this.getBall().sprite);
        this.leftTravelPsyduck.update(this.getBall().sprite);
    }

    getLeftMultiplierTarget() { return BlueFieldMultiplierTarget.createLeftMultiplierTarget(this.onLeftMultiplierHitCallback); }
    getArrows() { return new BlueFieldArrows(); }
    getRightMultiplierTarget() { return BlueFieldMultiplierTarget.createRightMultiplierTarget(this.onRightMultiplierHitCallback); }
    getBallUpgraderManager() { return BallUpgraderManager.createBlueFieldBallUpgraderManager(); }
    getPikachuSaverManager() { return PikachuSaverManager.createBlueFieldPikachuSaverManager(this.status); }
    getScreenLandscapes() { return new BlueFieldScreenLandscapes(); }

}