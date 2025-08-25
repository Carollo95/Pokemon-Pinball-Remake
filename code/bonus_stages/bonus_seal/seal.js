const SEAL_HITBOX_WIDTH = 20;
const SEAL_HITBOX_HEIGHT = 20;

const SEAL_SPEED = 0.3;
const SEAL_MIN_HORIZONTAL_MOVEMENT = 80;
const SEAL_MAX_HORIZONTAL_MOVEMENT = 290;


const SEAL_STATE = {
    SWIMMING: 0,
    TURNING: 1,
    SURFACING: 2,
    IDLE: 3,
    DIVING: 4
};

class Seal {
    constructor(x, y, moveRight = true) {
        this.x = x;
        this.y = y;
        this.keepMovinRight = moveRight;
        this.state = SEAL_STATE.SWIMMING;

        this.sprite = new Sprite(x, y, SEAL_HITBOX_WIDTH, SEAL_HITBOX_HEIGHT, "static");
        this.sprite.debug = DEBUG;
        this.sprite.layer = BALL_LAYER - 1;

        this.sprite.mirror.x = !moveRight;
        this.sprite.addAnimation('idle', Asset.getAnimation('animSealIdle'));
        this.sprite.addAnimation('surface', Asset.getAnimation('animSealSurface'));
        this.sprite.addAnimation('turn', Asset.getAnimation('animSealTurn'));
        this.sprite.addAnimation('dive', Asset.getAnimation('animSealDive'));
        this.sprite.addAnimation('hurt', Asset.getAnimation('animSealHurt'));
        this.sprite.addAnimation('swim', Asset.getAnimation('animSealSwim'));

        EngineUtils.disableSprite(this.sprite);
    }

    update(ballSprite) {
        if (this.state === SEAL_STATE.SWIMMING) {
            if (this.timeToSurface()) {
                this.surface();
            } else {
                this.move();
            }
        } else if (this.state === SEAL_STATE.IDLE) {
            if (this.timeToSwim()) {
                this.dive();
            }

            this.checkCollision(ballSprite);
        }
    }

    move() {
        if (this.keepMovinRight) {
            this.sprite.pos.x += SEAL_SPEED;
            if (this.sprite.pos.x > SEAL_MAX_HORIZONTAL_MOVEMENT) {
                this.changeHorizontalDirection();
            }
        } else if (!this.keepMovinRight) {
            this.sprite.pos.x -= SEAL_SPEED;
            if (this.sprite.pos.x < SEAL_MIN_HORIZONTAL_MOVEMENT) {
                this.changeHorizontalDirection();
            }
        }
    }

    changeHorizontalDirection() {
        this.state = SEAL_STATE.TURNING;
        this.sprite.changeAnimation('turn');
        this.sprite.ani.frame = 0;
        this.sprite.ani.playing = true;
        this.sprite.ani.looping = false;
        this.state = SEAL_STATE.TURNING;

        this.sprite.ani.onComplete = () => {
            this.keepMovinRight = !this.keepMovinRight;
            this.sprite.mirror.x = !this.sprite.mirror.x;

            this.sprite.changeAnimation('swim');
            this.sprite.ani.looping = true;

            this.state = SEAL_STATE.SWIMMING;
        };
    }

    timeToSurface() {
        return random(0, 1) < 0.002;
    }

    surface() {
        this.sprite.changeAnimation('surface');
        this.sprite.ani.frame = 0;
        this.sprite.ani.playing = true;
        this.sprite.ani.looping = false;
        this.state = SEAL_STATE.SURFACING;
        this.sprite.ani.onComplete = () => {
            EngineUtils.enableSprite(this.sprite);
            this.sprite.changeAnimation('idle');
            this.state = SEAL_STATE.IDLE;
        };
    }

    timeToSwim() {
        return random(0, 1) < 0.005;
    }

    dive() {
        this.state = SEAL_STATE.DIVING;
        EngineUtils.disableSprite(this.sprite);

        this.sprite.changeAnimation('dive');

        this.sprite.ani.frame = 0;
        this.sprite.ani.playing = true;
        this.sprite.ani.looping = false;
        this.sprite.ani.onComplete = () => {
            this.sprite.changeAnimation('swim');
            this.state = SEAL_STATE.SWIMMING;
        };
    }

    checkCollision(ballSprite) {
        if (this.sprite.collide(ballSprite)) {
            this.sprite.changeAnimation('hurt');

            this.sprite.ani.frame = 0;
            this.sprite.ani.playing = true;
            this.sprite.ani.looping = false;
            this.sprite.ani.onComplete = () => {
                this.dive();
            };
        }
    }

}