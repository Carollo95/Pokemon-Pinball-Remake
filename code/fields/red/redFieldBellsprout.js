const BELLSPROUT_WELL_RADIUS_X = 20;
const BELLSPROUT_WELL_RADIUS_Y = 50;
const BELLSPROUT_WELL_STRENGHT = 10;

class RedFieldBellsprout extends CaptureWell{

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
        return new Well(248, 178, BELLSPROUT_WELL_STRENGHT, BELLSPROUT_WELL_RADIUS_X, BELLSPROUT_WELL_RADIUS_Y);
    }


    getEatSFX() {
        return 'sfx05';
    }

    getSpitSFX() {
        return 'sfx06';
    }


}