const CLOYSTER_WELL_RADIUS_X = 20;
const CLOYSTER_WELL_RADIUS_Y = 50;
const CLOYSTER_WELL_STRENGHT = 10;

class BlueFieldCloyster extends CaptureWell{

    constructor(eatCallback) {
        super(eatCallback)
    }

    getSprite() {
        let sprite = new Sprite(248, 208, 48, 64, "none");
        sprite.addAni('eat', Asset.getAnimation('blueFieldCloysterEat'));
        sprite.addAni('spit', Asset.getAnimation('blueFieldCloysterIdle'));
        sprite.addAni('idle', Asset.getAnimation('blueFieldCloysterIdle'));
        return sprite;
    }

    getWell() {
        return new Well(248, 208, CLOYSTER_WELL_STRENGHT, CLOYSTER_WELL_RADIUS_X, CLOYSTER_WELL_RADIUS_Y);
    }


    //TODO change these
    getEatSFX() {
        return 'sfx05';
    }

    getSpitSFX() {
        return 'sfx06';
    }


}