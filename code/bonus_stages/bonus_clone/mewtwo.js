const MEWTWO_HITBOX_DIAMETER = 52;

class Mewtwo {

    constructor(x, y) {
        this.sprite = new Sprite(x, y, MEWTWO_HITBOX_DIAMETER, "static");

        this.sprite.addAnimation("idle", Asset.getAnimation('animMewtwoIdle'));
        this.sprite.layer = SPRITE_LAYER;
    }

    update(ballSprite) {

    }

}