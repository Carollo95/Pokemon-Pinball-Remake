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

        this.rightRubberBand = BlueFieldRubberBand.createLeftRubberBand();
        this.leftRubberBand = BlueFieldRubberBand.createRightRubberBand();
    }

    draw() {
        super.draw();
    }

    getLeftMultiplierTarget() { return BlueFieldMultiplierTarget.createLeftMultiplierTarget(this.onLeftMultiplierHitCallback); }
    getRightMultiplierTarget() { return BlueFieldMultiplierTarget.createRightMultiplierTarget(this.onRightMultiplierHitCallback); }
    getBallUpgraderManager() { return BallUpgraderManager.createBlueFieldBallUpgraderManager();}
    getPikachuSaverManager() { return PikachuSaverManager.createBlueFieldPikachuSaverManager(this.status); }

}