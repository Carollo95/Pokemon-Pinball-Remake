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
    }

    draw() {
        super.draw();
    }

}