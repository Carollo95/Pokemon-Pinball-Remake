const HEIGHT_OF_BALL_LOSS = SCREEN_HEIGHT; //Height at which a ball is considered lost
const WIDTH_THRESHOLD_TO_CLOSE_GATE = 310; //Horizontal pixel that when a ball crosses it, the gate on bonus levels closes

const STAGE_RESULT_SHOW_MILLS = 5000; //Amount of time to show stage result

const BONUS_STAGE_STATE = {
    PLAYING: "playing",
    WON: "won",
    LOST: "lost",
    WRAP_UP: "wrapUp"
};

const SCENARIO_TOP_DOME_POINTS = [
    [0, 0],
    [SCREEN_WIDTH, 0],
    [SCREEN_WIDTH, 212],
    [373, 212],
    [336, 236],
    [336, 122],
    [222, 122],
    [216, 110],
    [188, 100],
    [162, 110],
    [156, 122],
    [40, 122],
    [40, 275],
    [0, 275],
    [0, 0]
];

class BonusStage extends Stage {
    constructor(status) {
        super(status);

        this.attachBall(Ball.spawnBonusBall());
        this.attachFlippers(createBonusFlippers());
        this.attachStageText(createBonusStageStatusBanner(this.status));

        this.gateIsOpen = true;

        this.state = BONUS_STAGE_STATE.PLAYING;
        this.millisSinceStageComplete = 0;

        this.playableStages = [BONUS_STAGE_STATE.PLAYING];
        this.createFrame();
    }

    createBonusScenarioGeometry(dome = false) {
        this.createScenarioTopGeometry(dome);
        this.createScenarioLeftGeometry();
        this.createScenarioRightGeometry();
        this.createGate();
    }


    createScenarioTopGeometry(dome) {
        if (dome) {
            this.scenarioTop = this.createScenarioGeometry(SCENARIO_TOP_DOME_POINTS);
        } else {
            this.scenarioTop = this.createScenarioGeometry([[0, 0],
            [SCREEN_WIDTH, 0],
            [SCREEN_WIDTH, 212],
            [373, 212],
            [336, 236],
            [336, 122],
            [40, 122],
            [40, 275],
            [0, 275],
            [0, 0]
            ]);
        }
    }

    createScenarioLeftGeometry() {
        this.scenarioLeft = this.createScenarioGeometry([
            [0, 275],
            [44, 275],
            [139, 338],
            [139, SCREEN_HEIGHT],
            [0, SCREEN_HEIGHT],
            [0, 275]
        ]);
    }

    createScenarioRightGeometry() {
        this.scenarioRight = this.createScenarioGeometry([
            [SCREEN_WIDTH, 212],
            [SCREEN_WIDTH, SCREEN_HEIGHT],
            [236, SCREEN_HEIGHT],
            [236, 338],
            [373, 246],
            [373, 212],
            [SCREEN_WIDTH, 212]]);
    }

    createFrame() {
        const frame = new Sprite(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, SCREEN_WIDTH, SCREEN_HEIGHT, 'none');
        const bg = Asset.getBackground('bonusStageFrame');
        frame.addAnimation("", bg);
        frame.layer = FRAME_LAYER;
        return frame;
    }

    draw() {
        super.draw();
        if (this.scenarioTop.collide(this.getBall().sprite)) {
            Audio.playSFX('sfx08');
        }
    }

    createGate() {
        this.gate = new Sprite(341, 254, 10, 39, "static");
        this.gate.layer = SCENARIO_LAYER;
        this.gate.debug = DEBUG;
        this.gate.visible = DEBUG;
        EngineUtils.disableSprite(this.gate);
    }

    createBonusNewBallIfBallLoss(bonusGateBackground) {
        if (!this.playableStages.includes(this.state)) return;
        if (!this.checkBonusBallLoss()) return;
        this.createNewBonusBall(bonusGateBackground);
    }

    createNewBonusBall(bonusGateBackground) {
        Audio.playSFX('sfx02');
        EngineUtils.flashWhite();
        this.attachBall(Ball.spawnBonusBall());
        this.openBonusGate(bonusGateBackground);
    }

    checkBonusBallLoss() {
        return this.getBall().getPositionY() > HEIGHT_OF_BALL_LOSS;
    }

    openBonusGate(bonusGateBackground) {
        this.gateIsOpen = true;
        EngineUtils.disableSprite(this.gate);
        super.replaceBackground(bonusGateBackground);
    }

    closeBonusGate(bonusGateBackground) {
        EngineUtils.enableSprite(this.gate);
        this.gateIsOpen = false;
        Audio.playSFX('sfx3F');
        super.replaceBackground(bonusGateBackground);
    }

    closeBonusGateIfBallInsideBoard(bonusGateBackground) {
        if (this.checkBallInsideBonusBoard() && this.gateIsOpen) {
            this.closeBonusGate(bonusGateBackground);
        }
    }

    checkBallInsideBonusBoard() {
        return this.getBall().getPositionX() < WIDTH_THRESHOLD_TO_CLOSE_GATE;
    }

    endStage(resultState, i18nKey) {
        if (this.timer) this.timer.disable();
        this.flippers.disableFlippers();
        Audio.stopMusic();

        this.state = resultState;
        this.millisSinceStageComplete = millis();

        this.stageText.setText(I18NManager.translate(i18nKey), (STAGE_RESULT_SHOW_MILLS / 2));

        Audio.playSFX('sfx2A');
    }


    loseBonusStage() {
        this.flippers.disableFlippers();
        this.timer.stop();
        this.endStage(BONUS_STAGE_STATE.LOST);
    }

}