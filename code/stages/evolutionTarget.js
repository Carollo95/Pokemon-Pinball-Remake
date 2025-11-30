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

    setEvolutionMethod(evolutionMethod) {
        switch(evolutionMethod) {
            case EVOLUTION_METHODS.EXPERIENCE:
                this.sprite.ani.frame = 0;
                break;
            case EVOLUTION_METHODS.THUNDER_STONE:
                this.sprite.ani.frame = 1;
                break;
            case EVOLUTION_METHODS.MOON_STONE:
                this.sprite.ani.frame = 2;
                break;
            case EVOLUTION_METHODS.FIRE_STONE:
                this.sprite.ani.frame = 3;
                break;
            case EVOLUTION_METHODS.LEAF_STONE:
                this.sprite.ani.frame = 4;
                break;
            case EVOLUTION_METHODS.WATER_STONE:
                this.sprite.ani.frame = 5;
                break;
            case EVOLUTION_METHODS.LINK_CABLE:
                this.sprite.ani.frame = 6;
                break;
            default:
                this.sprite.ani.frame = 0;
                break;
        }
    }
}