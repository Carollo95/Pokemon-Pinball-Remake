const RED_STAGE_STATUS = {
    PLAYING: 0,
    NEW_BALL_WAITING: 1
}

class RedStage extends Stage {

    constructor(status) {
        super(status);

        this.background = Asset.getBackground('redStageBackground');

        this.attachBall(Ball.spawnStageBall());
        this.attachFlippers(createTableFlippers(this.rightFlipperCallback));
        this.attachStageText(createStageStatusBanner(this.status));
    }

    rightFlipperCallback = () => {
        if (this.state === RED_STAGE_STATUS.NEW_BALL_WAITING) {
            this.ball.launchFromSpawn();
            this.state = RED_STAGE_STATUS.PLAYING;
            this.screen.stopSpin();

            this.stageText.setText(I18NManager.translate("start_from") + this.screen.getLandmarkText());
        }
    }

    setup() {
        RED_STAGE_GEOMETRY.forEach(p => this.createScenarioGeometry(p));

        this.createScenarioGeometry([
            [198, 50],
            [220, 54],
            [242, 62],
            [268, 78],
            [278, 88],
            [288, 108],
            [290, 118],
            [296, 132],
            [300, 158],

            [290, 134],
            [272, 108],
            [256, 92],
            [240, 80],
            [234, 76],
            [198, 50]
        ]);


        this.ditto = new RedStageDitto();

        this.speedPad = [];
        this.speedPad.push(new SpeedPad(265, 293));
        this.speedPad.push(new SpeedPad(53, 293));
        this.speedPad.push(new SpeedPad(89, 259));

        this.state = RED_STAGE_STATUS.NEW_BALL_WAITING;

        this.screen = new Screen();
    }

    draw() {
        this.updateScreen();
        this.updateDitto();

        this.speedPad.forEach(pad => pad.update(this.getBall()));

        super.draw();
    }

    updateDitto() {
        if (this.ditto.isOpen() && this.getBall().getPositionY() > 200 && this.getBall().getPositionX() < 40) {
            this.ditto.close();
        }
    }

    updateScreen() {
        this.screen.update();
    }

}