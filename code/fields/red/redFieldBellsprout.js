const BELLSPROUT_WELL_RADIUS_X = 17;
const BELLSPROUT_WELL_RADIUS_NORTH = 10;
const BELLSPROUT_WELL_RADIUS_SOUTH = 80;
const BELLSPROUT_WELL_STRENGHT = 10;

class RedFieldBellsprout extends CaptureWell {

    constructor(eatCallback) {
        super(eatCallback)
    }

    getSprite() {
        let sprite = new Sprite(240, 196, 64, 80, "none");
        sprite.addAni('eat', Asset.getAnimation('redFieldBellsproutEat'));
        sprite.addAni('spit', Asset.getAnimation('redFieldBellsproutSpit'));
        sprite.addAni('idle', Asset.getAnimation('redFieldBellsproutIdle'));
        return sprite;
    }

    getWell() {
        return new Well(248, 178, BELLSPROUT_WELL_STRENGHT, BELLSPROUT_WELL_RADIUS_X, BELLSPROUT_WELL_RADIUS_NORTH, BELLSPROUT_WELL_RADIUS_X, BELLSPROUT_WELL_RADIUS_SOUTH);
    }


    getEatSFX() {
        return 'sfx05';
    }

    getSpitSFX() {
        return 'sfx06';
    }


}