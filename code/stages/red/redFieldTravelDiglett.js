class TravelDiglett {
    constructor(mirror = false) {
        if(mirror){
            this.diglettX = 262;
        }else{
            this.diglettX = 59;
        }

        this.diglettSprite = new Sprite(this.diglettX, 364, 22, 32, "none");
        this.diglettSprite.debug = DEBUG;
        this.diglettSprite.layer = SCENARIO_LAYER;
        this.diglettSprite.mirror.x = mirror;

        this.diglettSprite.addAnimation('hurt', Asset.getAnimation('redFieldDiglettHurt'));
        this.diglettSprite.addAnimation('idle', Asset.getAnimation('redFieldDiglettIdle'));
    }

    update(ball){

    }


}