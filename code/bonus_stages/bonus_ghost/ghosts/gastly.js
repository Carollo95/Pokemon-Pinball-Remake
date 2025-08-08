const GASTLY_HITBOX_HEIGHT = 24; //Height of gastly's hitbox
const GASTLY_HITBOX_WIDTH = 24; //Width of gastly's hitbox
const GASTLY_HORIZONTAL_SPEED = 0.3; //Horizontal movement speed
const GASTLY_VERTICAL_SPEED = 0.15; //Vertical movement speed
const GASTLY_MAX_HORIZONTAL_MOVEMENT = 60; //Max horizontal desplacement pixels
const GASTLY_MAX_VERTICAL_MOVEMENT = 4; //Max vertical desplacement pixels

class Gastly extends SmallGhost {

    constructor(x, y) {
        super(x, y, GASTLY_HITBOX_WIDTH, GASTLY_HITBOX_HEIGHT)

        this.maxHorizontalMovement = GASTLY_MAX_HORIZONTAL_MOVEMENT;
        this.maxVerticalMovement = GASTLY_MAX_VERTICAL_MOVEMENT;
        this.horizontalSpeed = GASTLY_HORIZONTAL_SPEED;
        this.verticalSpeed = GASTLY_VERTICAL_SPEED;

        this.idleAnimation = animGastly;
        this.hurtAnimation = animGastlyHurt;

        this.setup();
    }

}