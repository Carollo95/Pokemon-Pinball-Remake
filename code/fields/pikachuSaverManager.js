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
        this.charger.discharge();
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

    superCharge(){
        this.pikachuSaver.superCharge();
    }

    isSuperCharged(){
        return this.pikachuSaver.isSuperCharged();
    }

    setState(state){
        if(state !== undefined){
            this.charger.setCharge(state.chargerCharge);
            this.pikachuSaver.charged = state.pikachuCharged;
            this.pikachuSaver.superCharged = state.pikachuSuperCharged;
        } 
    }

    getState(){
        return {
            chargerCharge: this.charger.charge,
            pikachuCharged: this.pikachuSaver.charged,
            pikachuSuperCharged: this.pikachuSaver.superCharged
        };
    }

}