const RED_LANDMARKS = {
    PALLET: 0,
    VIRIDIAN: 1,
    PEWTER: 2,
    CERULEAN: 3,
    VERMILION_PORT: 4,
    ROCK_TUNNEL: 5,
    LAVENDER: 6,
    BIKE_ROAD:7,
    SAFARI: 8,
    SEAFOAM: 9,
    CINNABAR: 10,
    INDIGO_PLATEAU: 11    
}

class Screen {
    constructor() {
        this.sprite = new Sprite(160, 364, 96, 64, "none");
        this.sprite.debug = DEBUG;
        this.sprite.layer = SCENARIO_LAYER;

    this.sprite.addAnimation('redLandmarks', Asset.getAnimation('redLandmarks'));
    this.sprite.addAnimation('redLandmarksBW', Asset.getAnimation('redLandmarksBW'));
    }

    update() {

    }

    spinBW(){
        this.sprite.changeAnimation('redLandmarksBW');
    }

    stopSpin(){
        let currentFrame = this.sprite.animation.frame;
        this.sprite.changeAnimation('redLandmarks');
        this.sprite.animation.stop();
        this.sprite.animation.frame = currentFrame;
        
    }

}