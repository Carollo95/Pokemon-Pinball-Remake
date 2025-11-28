class EvolutionTarget{

    constructor(x,y, callback = ()=>{}) {
        this.sprite = new Sprite(x, y, 16, 16, "none");
        this.sprite.debug = DEBUG;
        this.sprite.layer = SCENARIO_LAYER;
        this.sprite.visible = false;
        this.callback = callback;
    }

    update(ballSprite){
        if(this.active && this.sprite.overlaps(ballSprite)){
            this.setActive(false);
            this.callback();
        }
    }

    setActive(active){
        this.active = active
        this.sprite.visible = active;
    }

}