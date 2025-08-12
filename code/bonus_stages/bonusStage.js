const HEIGHT_OF_BALL_LOSS = SCREEN_HEIGHT; //Height at which a ball is considered lost
const WIDTH_THRESHOLD_TO_CLOSE_GATE = 310; //Horizontal pixel that when a ball crosses it, the gate on bonus levels closes

const STAGE_RESULT_SHOW_MILLS = 5000;

class BonusStage extends Stage {
    gate;
    timer;
    stageText;

    gateIsOpen = true;
    levelCompleted = false;

    isStageLost = false;
    isStageWon = false;


    constructor() {
        super();

        this.ball = spawnBonusBall();
        this.flippers = createBonusFlippers();
        this.stageText = createBonusStageStatusBanner();
    }

    draw() {
        super.draw();
        this.flippers.update();
        this.stageText.draw();
    }

    createGate() {
        this.gate = new Sprite(337, 254, 10, 39, "static");
        this.gate.debug = DEBUG;
        this.gate.visible = DEBUG;
        disableSprite(this.gate);
    }

    createBonusNewBallIfBallLoss(bonusGateBackground) {
        if (this.checkBonusBallLoss() && !this.levelCompleted) {
            this.createNewBonusBall(bonusGateBackground);
        }
    }

    createNewBonusBall(bonusGateBackground) {
        sfx02.play();
        this.ball = spawnBonusBall();
        this.openBonusGate(bonusGateBackground);
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