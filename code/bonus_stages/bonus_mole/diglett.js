DIGLETT_WIDTH = 24; //Width of the Diglett hitbox
DIGLETT_HEIGHT = 24; //Height of the Diglett hitbox

class Diglett {
    sprite;

    constructor(x, y) {
        this.sprite = new Sprite(x, y, DIGLETT_WIDTH, DIGLETT_HEIGHT, "static");
        this.sprite.debug = DEBUG;

        this.sprite.addAnimation("idle", animDiglett);
    }

}