const RED_STAGE_STATUS = {
    PLAYING: 0,
    GAME_START: 1,
    BALL_LOST: 2,
    GAME_OVER: 3,
    NEW_BALL_WAITING: 4
}

const CALLBACK_DELAY_MS = 500;

class RedStage extends Stage {

    constructor(status) {
        super(status);
        this._lastCallbackCall = 0;

        this.background = Asset.getBackground('redStageBackground');

        this.attachBall(Ball.spawnStageBall());
        this.attachFlippers(createTableFlippers(this.rightFlipperCallback));
        this.attachStageText(createStageStatusBanner(this.status));
    }

    rightFlipperCallback = () => {

        if (millis() > this._lastCallbackCall + CALLBACK_DELAY_MS) {
            this._lastCallbackCall = millis();
            if (this.state === RED_STAGE_STATUS.GAME_START || this.state === RED_STAGE_STATUS.NEW_BALL_WAITING) {
                if (this.state === RED_STAGE_STATUS.GAME_START) {
                    this.screen.stopSpin();
                    this.stageText.setText(I18NManager.translate("start_from") + this.screen.getLandmarkText());
                }
                this.getBall().launchFromSpawn();
                this.state = RED_STAGE_STATUS.PLAYING;
            } else if (this.state === RED_STAGE_STATUS.BALL_LOST) {
                this.ballBonusScreen.progress(this.onBonusScreenCompleteCallback);
            }
        }
    }

    onBonusScreenCompleteCallback = () => {
        //TODO Shoot again text
        this.createNewBallOrEndStage();
    }

    setup() {
        RED_STAGE_GEOMETRY.forEach(p => this.createScenarioGeometry(p));

        //TODO move to geometry
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

        this.state = RED_STAGE_STATUS.GAME_START;

        this.screen = new Screen();
        this.ballBonusScreen = new BallBonusScreen(this.ball, this.status);
    }

    draw() {
        super.draw();
        this.updateScreen();
        if (this.state === RED_STAGE_STATUS.PLAYING) {
            this.checkForBallLoss();
            this.updateDitto();

            this.speedPad.forEach(pad => pad.update(this.getBall()));

        } else if (this.state === RED_STAGE_STATUS.BALL_LOST) {
            {
                this.ballBonusScreen.update();
            }
        }

    }
    checkForBallLoss() {
        if (this.ball.getPositionY() > SCREEN_HEIGHT) {
            this.status.balls--;
            this.state = RED_STAGE_STATUS.BALL_LOST;
            this.stageText.setText(I18NManager.translate("end_of_ball_bonus"), 3000, () => { this.ballBonusScreen.show(); });
        }
    }



    createNewBallOrEndStage() {
        if (this.status.balls > 0) {
            this.attachBall(Ball.spawnStageBall());
            this.ditto.open();
            this.state = RED_STAGE_STATUS.NEW_BALL_WAITING
        } else {
            this.state = RED_STAGE_STATUS.GAME_OVER;
            console.log("GAME OVER");
        }
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