let HAUNTER_RESPAWN_THRESHOLD_MILLS = 3000;
let HAUNTER_HITBOX_HEIGHT = 32;
let HAUNTER_HITBOX_WIDTH = 24;
let HAUNTER_SPEED = 0.5;
let HAUNTER_MAX_HORIZONTAL_MOVEMENT = 60;

class Haunter extends Ghost {

    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite(x, y, HAUNTER_HITBOX_WIDTH, HAUNTER_HITBOX_HEIGHT, "static");
        this.sprite.debug = DEBUG;

        this.maxHorizontalMovement = HAUNTER_MAX_HORIZONTAL_MOVEMENT;
        this.speed = HAUNTER_SPEED;
        this.thresholdMills = HAUNTER_RESPAWN_THRESHOLD_MILLS;
    }

}