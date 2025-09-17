const SMALL_GHOST_RESPAWN_THRESHOLD_MS = 3000; // ms between creation and respawn

class SmallGhost extends Ghost {
    constructor(x, y, width, height, onHitCallback) {
        super(x, y, width, height, onHitCallback);

        // movement parameters (subclasses set sensible defaults)
        this.maxHorizontalMovement = 0;
        this.maxVerticalMovement = 0;
        this.horizontalSpeed = 0;
        this.verticalSpeed = 0;

        // sound and animations (set by subclass)
        this.hurtSfx = null;
    }

    setup() {
        this.keepMovingRight = true;
        this.keepMovingUp = true;
        this.timeOfDisappearance = 0;
        this.respawnThresholdTime = SMALL_GHOST_RESPAWN_THRESHOLD_MS;

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
        if (this.keepMovingRight) {
            this.sprite.pos.x += this.horizontalSpeed;
            if (this.sprite.pos.x > this.start_x + this.maxHorizontalMovement) {
                this.keepMovingRight = false;
            }
        } else {
            this.sprite.pos.x -= this.horizontalSpeed;
            if (this.sprite.pos.x < this.start_x) {
                this.keepMovingRight = true;
            }
        }
    }

    moveYAxis() {
        if (this.keepMovingUp) {
            this.sprite.pos.y += this.verticalSpeed;
            if (this.sprite.pos.y > this.start_y + this.maxVerticalMovement) {
                this.keepMovingUp = false;
            }
        } else {
            this.sprite.pos.y -= this.verticalSpeed;
            if (this.sprite.pos.y < this.start_y) {
                this.keepMovingUp = true;
            }
        }
    }

    update(ballSprite) {
        if (this.disabled) return;

        if (this.timeOfHurt === 0) {
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

    checkCollision(ballSprite) {
        if (this.sprite.collide(ballSprite)) {
            this.sprite.image = this.hurtAnimation;
            this.onHitCallback();
            Audio.playSFX(this.hurtSfx);
            EngineUtils.disableSprite(this.sprite);
            this.timeOfHurt = millis();
        }
    }

    disableSprite() {
        EngineUtils.disableSprite(this.sprite);
        this.sprite.visible = false;
        this.timeOfDisappearance = millis();
        this.disabled = true;
    }
}