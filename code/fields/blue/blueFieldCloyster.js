const CLOYSTER_WELL_RADIUS_EAST = 20;
const CLOYSTER_WELL_RADIUS_WEST = 65;
const CLOYSTER_WELL_RADIUS_Y = 20;
const CLOYSTER_WELL_STRENGHT = 10;

class BlueFieldCloyster extends CaptureWell {

    constructor(eatCallback) {
        super(eatCallback, (ballSprite) => {ballSprite.velocity.x = -5;});
    }

    getSprite() {
        let sprite = new Sprite(248, 208, 48, 64, "none");
        sprite.addAni('eat', Asset.getAnimation('blueFieldCloysterEat'));
        sprite.addAni('spit', Asset.getAnimation('blueFieldCloysterIdle'));
        sprite.addAni('idle', Asset.getAnimation('blueFieldCloysterIdle'));
        return sprite;
    }

    getWell() {
        return new Well(248, 208, CLOYSTER_WELL_STRENGHT, CLOYSTER_WELL_RADIUS_EAST, CLOYSTER_WELL_RADIUS_Y, CLOYSTER_WELL_RADIUS_WEST, CLOYSTER_WELL_RADIUS_Y);
    }


    //TODO change these
    getEatSFX() {
        return 'sfx05';
    }

    getSpitSFX() {
        return 'sfx06';
    }


}