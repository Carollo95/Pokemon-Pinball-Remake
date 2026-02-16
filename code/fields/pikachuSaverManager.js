class PikachuSaverManager {

    constructor(status) {
        this.pikachuSaver = new PikachuSaver(this.onPikachuSaverDischargeCallback);

        this.status = status;
    }

    setCharger(charger) {
        this.charger = charger;
    }

    update(ball) {
        this.charger.update(ball.sprite);
        this.pikachuSaver.update(ball);
    }

    onPikachuSaverDischargeCallback = () => {
        this.status.activeThunder = false;
        this.charger.discharge();
        this.status.addPikachuKickbackOnBall();
    }

    onSpinnerMoveCallback = () => {
        this.status.spinnerTurnsOnBall++;
        EngineUtils.addPointsForBallHelper(POINTS.SPINNER_SPIN);
    }

    onChargerFullChargeCallback = () => {
        this.pikachuSaver.charge();
        this.status.activeThunder = true;
    }

    doOnLeftFlipper() {
        this.pikachuSaver.moveLeft();
    }

    doOnRightFlipper() {
        this.pikachuSaver.moveRight();
    }

    reset() {
        this.charger.discharge();
        this.pikachuSaver.fullyDischarge();
        this.status.activeThunder = false;
    }

    superCharge() {
        this.pikachuSaver.superCharge();
    }

    isSuperCharged() {
        return this.pikachuSaver.isSuperCharged();
    }

    setState(state) {
        if (state !== undefined) {
            this.charger.setCharge(state.chargerCharge);
            this.pikachuSaver.charged = state.pikachuCharged;
            this.pikachuSaver.superCharged = state.pikachuSuperCharged;
        }
    }

    getState() {
        return {
            chargerCharge: this.charger.charge,
            pikachuCharged: this.pikachuSaver.charged,
            pikachuSuperCharged: this.pikachuSaver.superCharged
        };
    }

    static createRedFieldPikachuSaverManager(status) {
        const manager = new PikachuSaverManager(status);
        manager.setCharger(new RedFieldCharger(manager.onSpinnerMoveCallback, manager.onChargerFullChargeCallback));
        return manager;
    }

    static createBlueFieldPikachuSaverManager(status) {
        const manager = new PikachuSaverManager(status);
        manager.setCharger(new BlueFieldCharger(manager.onSpinnerMoveCallback, manager.onChargerFullChargeCallback));
        return manager;
    }

}