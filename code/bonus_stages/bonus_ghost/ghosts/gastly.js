const GASTLY_RESPAWN_THRESHOLD_MILLS = 3000; //Time between instance creation and spawn
const GASTLY_HITBOX_HEIGHT = 24; //Height of gastly's hitbox
const GASTLY_HITBOX_WIDTH = 24; //Width of gastly's hitbox
const GASTLY_SPEED = 0.5; //Horizontal movement speed
const GASTLY_MAX_HORIZONTAL_MOVEMENT = 60; //Max horizontal desplacement pixels

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