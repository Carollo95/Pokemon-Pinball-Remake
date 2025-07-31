let GENGAR_RESPAWN_THRESHOLD_MILLS = 3000;
let GENGAR_HITBOX_HEIGHT = 45;
let GENGAR_HITBOX_WIDTH = 30;
let GENGAR_SPEED = 0.5;
let GENGAR_MAX_HORIZONTAL_MOVEMENT = 60;

class Gengar extends Ghost {

    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite(x, y, GENGAR_HITBOX_WIDTH, GENGAR_HITBOX_HEIGHT, "static");
        this.sprite.debug = DEBUG;

        this.maxHorizontalMovement = GENGAR_MAX_HORIZONTAL_MOVEMENT;
        this.speed = GENGAR_SPEED;
        this.thresholdMills = GENGAR_RESPAWN_THRESHOLD_MILLS;
    }

}