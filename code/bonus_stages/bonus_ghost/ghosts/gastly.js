const GASTLY_HITBOX_HEIGHT = 24;
const GASTLY_HITBOX_WIDTH = 24;
const GASTLY_HORIZONTAL_SPEED = 0.3;
const GASTLY_VERTICAL_SPEED = 0.15;
const GASTLY_MAX_HORIZONTAL_MOVEMENT = 60;
const GASTLY_MAX_VERTICAL_MOVEMENT = 4;

class Gastly extends SmallGhost {
    constructor(x, y, onHitCallback) {
        super(x, y, GASTLY_HITBOX_WIDTH, GASTLY_HITBOX_HEIGHT, onHitCallback);

        this.maxHorizontalMovement = GASTLY_MAX_HORIZONTAL_MOVEMENT;
        this.maxVerticalMovement = GASTLY_MAX_VERTICAL_MOVEMENT;
        this.horizontalSpeed = GASTLY_HORIZONTAL_SPEED;
        this.verticalSpeed = GASTLY_VERTICAL_SPEED;

        this.idleAnimation = Asset.getAnimation('animGastly');
        this.hurtAnimation = Asset.getAnimation('animGastlyHurt');

        this.hurtSfx = 'sfx2C';

        this.setup();
    }
}