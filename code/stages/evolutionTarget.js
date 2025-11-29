class EvolutionTarget{

    constructor(x,y) {
        this.sprite = new Sprite(x, y, 16, 16, "none");
        this.sprite.debug = DEBUG;
        this.sprite.layer = SCENARIO_LAYER;
        this.sprite.visible = false;
        this.sprite.addAni('evolutionMethods', Asset.getAnimation('evolutionMethods'));
        this.sprite.ani.frame = 0;
        this.sprite.ani.playing = false;
    }

    update(ballSprite){
        if(this.active && this.sprite.overlaps(ballSprite)){
            this.callback();
            this.setActive(false);
        }
    }

    setActive(active, callback){
        this.active = active
        this.sprite.visible = active;
        this.callback = callback;
    }

}