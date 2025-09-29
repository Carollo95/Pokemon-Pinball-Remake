class TravelDiglett {
    constructor(mirror = false) {
        if(mirror){
            this.diglettX = 261;
            this.colliderX = 268;
        }else{
            this.diglettX = 59;
            this.colliderX = 54;
        }

        this.collider = new Sprite(this.colliderX, 364, 16, 16, "static");
        this.collider.debug = DEBUG;
        this.collider.visible = DEBUG;

        this.diglettSprite = new Sprite(this.diglettX, 364, 22, 32, "none");
        this.diglettSprite.debug = DEBUG;
        this.diglettSprite.layer = SCENARIO_LAYER;
        this.diglettSprite.mirror.x = mirror;

        this.diglettSprite.addAnimation('hurt', Asset.getAnimation('redFieldDiglettHurt'));
        this.diglettSprite.addAnimation('idle', Asset.getAnimation('redFieldDiglettIdle'));
    }

    update(ball){
        if (this.collider.collide(ball)) {
            this.diglettSprite.changeAnimation('hurt');

            this.diglettSprite.ani.frame = 0;
            this.diglettSprite.ani.playing = true;
            this.diglettSprite.ani.looping = false;
            this.diglettSprite.ani.onComplete = () => {
                this.diglettSprite.changeAnimation('idle');
            };
        }
    }


}