const DIGLETT_POINTS = 5000;

const RED_FIELD_STATUS = {
    PLAYING: 0,
    GAME_START: 1,
    BALL_LOST: 2,
    GAME_OVER: 3,
    NEW_BALL_WAITING: 4
}

const CALLBACK_DELAY_MS = 500;

class RedField extends Stage {

    constructor(status) {
        super(status);
        this._lastCallbackCall = 0;

        this.background = Asset.getBackground('redFieldBackground');

        this.attachBall(Ball.spawnStageBall());
        this.attachFlippers(createTableFlippers(this.rightFlipperCallback));
        this.attachStageText(createStageStatusBanner(this.status));
    }

    rightFlipperCallback = () => {

        if (millis() > this._lastCallbackCall + CALLBACK_DELAY_MS) {
            this._lastCallbackCall = millis();
            if (this.state === RED_FIELD_STATUS.GAME_START || this.state === RED_FIELD_STATUS.NEW_BALL_WAITING) {
                this.launchNewBallWaiting();
                this.state = RED_FIELD_STATUS.PLAYING;
            }
        }

        if (this.state === RED_FIELD_STATUS.BALL_LOST) {
            this.progressBonusBallScreen();
        }
    }

    launchNewBallWaiting() {
        if (this.state === RED_FIELD_STATUS.GAME_START) {
            this.screen.stopSpin();
            this.stageText.setText(I18NManager.translate("start_from") + this.screen.getLandmarkText());
        }
        this.getBall().launchFromSpawn();
    }

    progressBonusBallScreen() {
        if (this.ballBonusScreen.isVisible()) {
            this.ballBonusScreen.progress();
        }
    }

    onBonusScreenCompleteCallback = () => {
        //TODO Shoot again text
        this.createNewBallOrEndStage();
    }

    setup() {
        RED_FIELD_GEOMETRY.forEach(p => this.createScenarioGeometry(p));

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


        this.ditto = new RedFieldDitto();

        this.speedPad = [];
        this.speedPad.push(new SpeedPad(265, 293));
        this.speedPad.push(new SpeedPad(53, 293));
        this.speedPad.push(new SpeedPad(89, 259));

        this.state = RED_FIELD_STATUS.GAME_START;

        this.screen = new Screen();
        this.ballBonusScreen = new BallBonusScreen(this.status, this.onBonusScreenCompleteCallback);

        this.leftTravelDiglett = new TravelDiglett(() => { this.status.addPoints(DIGLETT_POINTS) }, () => { this.status.dugtrioOnBall++ }, false);
        this.rightTravelDiglett = new TravelDiglett(() => { this.status.addPoints(DIGLETT_POINTS) }, () => { this.status.dugtrioOnBall++ }, true);

        this.voltorbs = [];
        this.voltorbs.push(new RedFieldVoltorb(132, 172, this.onVoltorbHitCallback));
        this.voltorbs.push(new RedFieldVoltorb(182, 152, this.onVoltorbHitCallback));
        this.voltorbs.push(new RedFieldVoltorb(170, 208, this.onVoltorbHitCallback));

        this.arrows = new RedFieldArrows();
    }

    onVoltorbHitCallback = () => {
        this.status.addPoints(POINTS.VOLTORB_BUMPER);
    }

    draw() {
        super.draw();
        this.updateScreen();

        this.leftTravelDiglett.update(this.getBall().sprite);
        this.rightTravelDiglett.update(this.getBall().sprite);

        this.voltorbs.forEach(v => v.update(this.getBall().sprite));
        this.arrows.update();

        if (this.state === RED_FIELD_STATUS.PLAYING) {
            this.checkForBallLoss();
            this.updateDitto();

            this.speedPad.forEach(pad => pad.update(this.getBall()));

        } else if (this.state === RED_FIELD_STATUS.BALL_LOST) {
            {
                this.ballBonusScreen.update();
            }
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

    checkForBallLoss() {
        if (this.ball.getPositionY() > SCREEN_HEIGHT) {
            this.status.balls--;
            this.state = RED_FIELD_STATUS.BALL_LOST;
            Audio.playSFX('sfx24');
            this.stageText.setText(I18NManager.translate("end_of_ball_bonus"), 1000, () => { this.ballBonusScreen.show(); });
        }
    }

    createNewBallOrEndStage() {
        if (this.status.balls > 0) {
            this.attachBall(Ball.spawnStageBall());
            this.ditto.open();
            this.state = RED_FIELD_STATUS.NEW_BALL_WAITING
        } else {
            this.state = RED_FIELD_STATUS.GAME_OVER;
            console.log("GAME OVER");
        }
    }
}