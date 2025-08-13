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

        this.createFrame();
    }

    createScenarioGeometry() {
        this.scenarioTop = new Sprite(
            [[0, 0],
            [SCREEN_WIDTH, 0],
            [SCREEN_WIDTH, 212],
            [373, 212],
            [336, 236],
            [336, 122],
            [40, 122],
            [40, 275],
            [0, 275],
            [0, 0]
            ], "static");
        this.scenarioTop.debug = DEBUG;
        this.scenarioTop.visible = DEBUG;

        this.scenarioRight = new Sprite([
            [SCREEN_WIDTH, 212],
            [SCREEN_WIDTH, SCREEN_HEIGHT],
            [236, SCREEN_HEIGHT],
            [236, 338],
            [373, 246],
            [373, 212],
            [SCREEN_WIDTH, 212]
        ], "static");

        this.scenarioRight.debug = DEBUG;
        this.scenarioRight.visible = DEBUG;

        this.scenarioLeft = new Sprite([
            [0, 275],
            [44, 275],
            [139, 338],
            [139, SCREEN_HEIGHT],
            [0, SCREEN_HEIGHT],
            [0, 275]
        ], "static");

        this.scenarioLeft.debug = DEBUG;
        this.scenarioLeft.visible = DEBUG;


        this.createGate();
    }

    createFrame() {
        var frame = new Sprite(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, SCREEN_WIDTH, SCREEN_HEIGHT, 'none');
        frame.addAnimation("", bonusStageFrame);
        frame.layer = 11;
    }

    draw() {
        super.draw();
        this.flippers.update();
        this.stageText.draw();
    }

    createGate() {
        this.gate = new Sprite(341, 254, 10, 39, "static");
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