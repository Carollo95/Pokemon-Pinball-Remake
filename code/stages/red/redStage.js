class RedStage extends Stage {

    constructor(status) {
        super(status);

        this.background = Asset.getBackground('redStageBackground');

        this.attachBall(Ball.spawnBonusBall());
        this.attachFlippers(createTableFlippers());
        this.attachStageText(createStageStatusBanner(this.status));
    }


    setup(){

    }

    draw(){
        super.draw();
    }

}