class RedFieldBellsprout{

    constructor(){
        this.sprite = new Sprite(240, 196, 64, 80, "none");
        this.sprite.debug = DEBUG;
        this.sprite.layer = FIELD_ELEMENTS_LAYER;
        this.sprite.addAni('idle', Asset.getAnimation('redFieldBellsproutIdle'));
    }

    update(){
        //TODO remove if unusued
    }

}