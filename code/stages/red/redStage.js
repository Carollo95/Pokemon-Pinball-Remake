

class RedStage extends Stage {

    constructor(status) {
        super(status);

        this.background = Asset.getBackground('redStageBackground');

        this.attachBall(Ball.spawnStageBall());
        this.attachFlippers(createTableFlippers());
        this.attachStageText(createStageStatusBanner(this.status));
    }

    setup() {
        RED_STAGE_GEOMETRY.forEach(p => this.createScenarioGeometry(p));

        this.ditto = new RedStageDitto();

        this.speedPad = [];
        this.speedPad.push(new SpeedPad(265, 293));
        this.speedPad.push(new SpeedPad(53, 293));
        this.speedPad.push(new SpeedPad(89, 259));
    }

    draw() {
        this.updateDitto();

        this.speedPad.forEach(pad => pad.update(this.getBall()));

        super.draw();
    }

    updateDitto() {
        if (this.ditto.isOpen() && this.getBall().getPositionY() > 200 && this.getBall().getPositionX() < 40) {
            this.ditto.close();
        }
    }

}