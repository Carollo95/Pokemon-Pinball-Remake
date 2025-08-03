const HAUNTER_RESPAWN_THRESHOLD_MILLS = 3000; //Time between instance creation and spawn
const HAUNTER_HITBOX_HEIGHT = 32;//Height of haunter's hitbox
const HAUNTER_HITBOX_WIDTH = 24; //Width of haunter's hitbox
const HAUNTER_SPEED = 0.5; //Horizontal movement speed
const HAUNTER_MAX_HORIZONTAL_MOVEMENT = 60; //Max horizontal desplacement pixels

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