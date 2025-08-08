const HEIGHT_OF_BALL_LOSS = SCREEN_HEIGHT; //Height at which a ball is considered lost
const WIDTH_THRESHOLD_TO_CLOSE_GATE = 310; //Horizontal pixel that when a ball crosses it, the gate on bonus levels closes

class BonusStage extends Stage {
    gate;
    gateIsOpen;
    levelCompleted = false;

    timer;

    constructor() {
        super();
        this.gateIsOpen = true;
    }

    createBonusNewBallIfBallLoss(bonusGateBackground) {
        if (this.checkBonusBallLoss() && !this.levelCompleted) {
            this.ball = spawnBonusBall();
            this.openBonusGate(bonusGateBackground);
        }
    }

    checkBonusBallLoss() {
        return this.ball.getPositionY() > HEIGHT_OF_BALL_LOSS;
    }

    openBonusGate(bonusGateBackground) {
        this.gateIsOpen = true;
        disableSprite(this.gate);
        super.replaceBackground(bonusGateBackground);
    }

    closeBonusGate(bonusGateBackground) {
        enableSprite(this.gate);
        this.gateIsOpen = false;
        sfx3F.play();
        super.replaceBackground(bonusGateBackground);
    }

    closeBonusGateIfBallInsideBoard(bonusGateBackground) {
        if (this.chechBallInsideBonusBoard() && this.gateIsOpen) {
            this.closeBonusGate(bonusGateBackground);
        }
    }

    chechBallInsideBonusBoard() {
        return this.ball.getPositionX() < WIDTH_THRESHOLD_TO_CLOSE_GATE;
    }

    loseBonusStage() {
        this.flippers.disableFlippers();
        this.timer.stop();
    }

}