const SEAL_HITBOX_WIDTH = 20;
const SEAL_HITBOX_HEIGHT = 20;

const SEAL_SPEED = 0.3;
const SEAL_MIN_HORIZONTAL_MOVEMENT = 80;
const SEAL_MAX_HORIZONTAL_MOVEMENT = 290;

class Seal {
    constructor(x, y, moveRight = true) {
        this.x = x;
        this.y = y;
        this.keepMovinRight = moveRight;
        this.underwater = true;
        this.isTurning = false;

        this.sprite = new Sprite(x, y, SEAL_HITBOX_WIDTH, SEAL_HITBOX_HEIGHT, "static");
        this.sprite.debug = DEBUG;
        this.sprite.layer = BALL_LAYER - 1;

        this.sprite.mirror.x = !moveRight;
        this.sprite.addAnimation('turn', Asset.getAnimation('animSealTurn'));
        this.sprite.addAnimation('swim', Asset.getAnimation('animSealSwim'));

        EngineUtils.disableSprite(this.sprite);
    }

    update(ballSprite) {
        this.move();
    }

    move() {
        if (this.isTurning) return;

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
        if (this.isTurning) return;

        this.isTurning = true;
        this.sprite.changeAnimation('turn');
        this.sprite.ani.frame = 0;
        this.sprite.ani.playing = true;
        this.sprite.ani.looping = false;

        this.sprite.ani.onComplete = () => {
            this.keepMovinRight = !this.keepMovinRight;
            this.sprite.mirror.x = !this.sprite.mirror.x;

            this.sprite.changeAnimation('swim');
            this.sprite.ani.looping = true;

            this.isTurning = false;
        };
    }

}