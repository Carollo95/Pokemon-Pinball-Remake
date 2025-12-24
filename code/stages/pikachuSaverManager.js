class PikachuSaverManager {

    constructor(status) {
        this.pikachuSaver = new PikachuSaver(this.onPikachuSaverDischargeCallback);
        this.charger = new Charger(286, 180, 242, 144, this.onSpinnerMoveCallback, this.onChargerFullChargeCallback);

        this.status = status;
    }

    update(ball) {
        this.charger.update(ball.sprite);
        this.pikachuSaver.update(ball);
    }

    onPikachuSaverDischargeCallback = () => {
        this.status.activeThunder = false;
    }

    onSpinnerMoveCallback = () => {
        //TODO check if this is per frame move or per animation completed
        this.status.spinnerTurnsOnBall++;
        //TODO depend on ball. Check that always depends on ball when ading points, I think it is missing on some bosnus stage
        this.status.addPoints(POINTS.SPINNER_SPIN);
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

}