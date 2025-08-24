const HAUNTER_HITBOX_HEIGHT = 32;
const HAUNTER_HITBOX_WIDTH = 28;
const HAUNTER_HORIZONTAL_SPEED = 0.4;
const HAUNTER_VERTICAL_SPEED = 0.15;
const HAUNTER_MAX_HORIZONTAL_MOVEMENT = 72;
const HAUNTER_MAX_VERTICAL_MOVEMENT = 4;

class Haunter extends SmallGhost {
    constructor(x, y) {
        super(x, y, HAUNTER_HITBOX_WIDTH, HAUNTER_HITBOX_HEIGHT);

        this.maxHorizontalMovement = HAUNTER_MAX_HORIZONTAL_MOVEMENT;
        this.maxVerticalMovement = HAUNTER_MAX_VERTICAL_MOVEMENT;
        this.horizontalSpeed = HAUNTER_HORIZONTAL_SPEED;
        this.verticalSpeed = HAUNTER_VERTICAL_SPEED;

        this.idleAnimation = Asset.getAnimationClone('animHaunter');
        this.hurtAnimation = Asset.getAnimationClone('animHaunterHurt');

        this.hurtSfx = 'sfx2D';

        this.setup();
    }
}