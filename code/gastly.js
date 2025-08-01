const GASTLY_RESPAWN_THRESHOLD_MILLS = 3000;
const GASTLY_HITBOX_HEIGHT = 24;
const GASTLY_HITBOX_WIDTH = 24;
const GASTLY_SPEED = 0.5;
const GASTLY_MAX_HORIZONTAL_MOVEMENT = 60;

class Gastly extends Ghost {

    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite(x, y, GASTLY_HITBOX_WIDTH, GASTLY_HITBOX_HEIGHT, "static");
        this.sprite.debug = DEBUG;

        this.maxHorizontalMovement = GASTLY_MAX_HORIZONTAL_MOVEMENT;
        this.speed = GASTLY_SPEED;
        this.thresholdMills = GASTLY_RESPAWN_THRESHOLD_MILLS;

    }
}