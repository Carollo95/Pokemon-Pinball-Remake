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

        this.rightRubberBand = BlueFieldRubberBand.createLeftRubberBand();
        this.leftRubberBand = BlueFieldRubberBand.createRightRubberBand();
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
    }

    getLeftMultiplierTarget() { return BlueFieldMultiplierTarget.createLeftMultiplierTarget(this.onLeftMultiplierHitCallback); }
    getArrows() { return new BlueFieldArrows(); }
    getRightMultiplierTarget() { return BlueFieldMultiplierTarget.createRightMultiplierTarget(this.onRightMultiplierHitCallback); }
    getBallUpgraderManager() { return BallUpgraderManager.createBlueFieldBallUpgraderManager(); }
    getPikachuSaverManager() { return PikachuSaverManager.createBlueFieldPikachuSaverManager(this.status); }
    getScreenLandscapes() { return new BlueFieldScreenLandscapes(); }

}