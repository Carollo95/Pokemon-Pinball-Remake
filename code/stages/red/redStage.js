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
        this.ditto.open();
    }

    draw() {
        this.updateDitto();

        super.draw();
    }

    updateDitto() {
        if (this.ditto.isOpen() && this.getBall().getPositionY() > 200 && this.getBall().getPositionX() < 40) {
            this.ditto.close();
        }
    }

}