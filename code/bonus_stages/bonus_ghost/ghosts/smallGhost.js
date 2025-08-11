const SMALL_GHOST_RESPAWN_THRESHOLD_MILLS = 3000; //Time between instance creation and spawn
class SmallGhost extends Ghost {
    keepMovinRight;
    keepMovinUp;
    timeOfDissapearance;

    maxHorizontalMovement;
    maxVerticalMovement;
    horizontalSpeed;
    verticalSpeed;

    hurtSfx;

    constructor(x, y, width, height) {
        super(x, y, width, height);
    }

    setup() {
        this.keepMovinRight = true;
        this.keepMovinUp = true;
        this.timeOfDissapearance = 0;
        this.respawnThreshHoldTime = SMALL_GHOST_RESPAWN_THRESHOLD_MILLS;

        this.sprite.addAnimation("idle", this.idleAnimation);
        this.sprite.addAnimation("hurt", this.hurtAnimation);
        this.sprite.changeAnimation("idle");
        this.sprite.debug = DEBUG;
    }

    move() {
        this.moveXAxis();
        this.moveYAxis();
    }

    moveXAxis() {
        if (this.keepMovinRight) {
            this.sprite.pos.x += this.horizontalSpeed;
            if (this.sprite.pos.x > this.start_x + this.maxHorizontalMovement) {
                this.keepMovinRight = false;
            }
        } else {
            this.sprite.pos.x -= this.horizontalSpeed;
            if (this.sprite.pos.x < this.start_x) {
                this.keepMovinRight = true;
            }
        }
    }

    moveYAxis() {
        if (this.keepMovinUp) {
            this.sprite.pos.y += this.verticalSpeed;
            if (this.sprite.pos.y > this.start_y + this.maxVerticalMovement) {
                this.keepMovinUp = false;
            }
        } else {
            this.sprite.pos.y -= this.verticalSpeed;
            if (this.sprite.pos.y < this.start_y) {
                this.keepMovinUp = true;
            }
        }
    }

    update(ballSprite) {
        if (!this.disabled) {
            if (this.timeOfHurt == 0) {
                this.checkCollision(ballSprite);
                this.move();
            } else {
                if (this.isHurtTimeFinished()) {
                    this.disableSprite();
                } else {
                    this.blink();
                    this.sprite.changeAnimation("hurt");
                }
            }
        }
    }


    checkCollision(ballSprite) {
        if (this.sprite.collide(ballSprite)) {
            this.sprite.image = this.hurtAnimation
            this.hurtSfx.play();
            disableSprite(this.sprite);
            this.timeOfHurt = millis();
        }
    }

    disableSprite() {
        disableSprite(this.sprite);
        this.sprite.visible = false;
        this.timeOfDissapearance = millis();
        this.disabled = true;
    }

}