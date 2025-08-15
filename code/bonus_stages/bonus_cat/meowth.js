const MEOWTH_HITBOX_WIDTH = 30; //Width fo the meowth hitbox
const MEOWTH_HITBOX_HEIGHT = 30; //Height fo the meowth hitbox

const MEOWTH_SPEED = 2; //Speed at which meowth walks across the screen
const MEOWTH_MIN_HORIZONTAL_MOVEMENT = 80; //Min position on the X axis where meowth can move
const MEOWTH_MAX_HORIZONTAL_MOVEMENT = 290; //Miax position on the X axis where meowth can move

const MEOWTH_HIGH_POS = 160; //Position on the Y axis for the high lane
const MEOWTH_LOW_POS = 200; //Position on the Y axis for the low lane

const MEOWTH_HURT_TIME = 500; //time spent on the hurt animation

class Meowth {

    keepMovinRight = true;
    keepMovingVertically = false;
    isHighLane = true;

    sprite;
    timeOfHurt = 0;

    constructor() {
        this.sprite = new Sprite(MEOWTH_MIN_HORIZONTAL_MOVEMENT, MEOWTH_HIGH_POS, MEOWTH_HITBOX_WIDTH, MEOWTH_HITBOX_HEIGHT, "static");
        this.sprite.debug = DEBUG;

        this.sprite.addAnimation("hurt", animMeowthHurt);
        this.sprite.addAnimation("walk", animMeowthWalk);
    }

    update(ballSprite) {
        if (this.isHurtTimeOver()) {
            this.sprite.changeAnimation("walk");
            this.moveXAxis();
            this.moveYAxis();

            if (this.isRandomChangeOfHorizontalDirection()) {
                this.changeHorizontalDirection();
            }
            if (this.isRandomChangeOfVerticalDirection()) {
                this.keepMovingVertically = true;
            }

            this.checkCollision(ballSprite);
        }
    }

    isHurtTimeOver() {
        return millis() - this.timeOfHurt > MEOWTH_HURT_TIME;
    }

    checkCollision(ballSprite) {
        if (this.sprite.collide(ballSprite)) {
            this.sprite.changeAnimation("hurt");
            this.timeOfHurt = millis();
            sfx30.play();
        }
    }

    moveXAxis() {
        if (this.keepMovinRight) {
            this.sprite.pos.x += MEOWTH_SPEED;
            if (this.sprite.pos.x > MEOWTH_MAX_HORIZONTAL_MOVEMENT) {
                this.changeHorizontalDirection();
            }
        } else {
            this.sprite.pos.x -= MEOWTH_SPEED;
            if (this.sprite.pos.x < MEOWTH_MIN_HORIZONTAL_MOVEMENT) {
                this.changeHorizontalDirection();
            }
        }
    }

    moveYAxis() {
        if (this.keepMovingVertically) {
            if (this.isHighLane) {
                this.sprite.pos.y += MEOWTH_SPEED;
                if (this.sprite.pos.y >= MEOWTH_LOW_POS) {
                    this.keepMovingVertically = false;
                    this.isHighLane = false;
                }
            } else {
                this.sprite.pos.y -= MEOWTH_SPEED;
                if (this.sprite.pos.y < MEOWTH_HIGH_POS) {
                    this.keepMovingVertically = false;
                    this.isHighLane = true;
                }
            }
        }
    }

    changeHorizontalDirection() {
        this.keepMovinRight = !this.keepMovinRight;
        this.sprite.mirror.x = !this.sprite.mirror.x;
    }

    isRandomChangeOfHorizontalDirection() {
        return random(0, 1000) > 995;
    }

    isRandomChangeOfVerticalDirection() {
        return random(0, 1000) > 995;
    }

}