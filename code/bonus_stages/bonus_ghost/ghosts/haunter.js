const HAUNTER_HITBOX_HEIGHT = 32;//Height of haunter's hitbox
const HAUNTER_HITBOX_WIDTH = 24; //Width of haunter's hitbox
const HAUNTER_HORIZONTAL_SPEED = 0.5; //Horizontal movement speed
const HAUNTER_VERTICAL_SPEED = 0.15; //Vertical movement speed
const HAUNTER_MAX_HORIZONTAL_MOVEMENT = 60; //Max horizontal desplacement pixels
const HAUNTER_MAX_VERTICAL_MOVEMENT = 4; //Max vertical desplacement pixels

class Haunter extends Ghost {

    constructor(x, y) {
        super(x, y, HAUNTER_HITBOX_WIDTH, HAUNTER_HITBOX_HEIGHT)

        this.maxHorizontalMovement = HAUNTER_MAX_HORIZONTAL_MOVEMENT;
        this.maxVerticalMovement = HAUNTER_MAX_VERTICAL_MOVEMENT;
        this.horizontalSpeed = HAUNTER_HORIZONTAL_SPEED;
        this.verticalSpeed = HAUNTER_VERTICAL_SPEED;
        
        this.idleAnimation = getAnimation(BONUS_GHOST_HAUNTER, 96, 80, 4);
        this.hurtAnimation = getAnimation(BONUS_GHOST_HAUNTER_HURT, 96, 80, 2);

        this.setup();
    }

}