const GHOST_RESPAWN_THRESHOLD_MILLS = 3000; //Time between instance creation and spawn
const GHOST_BLINKING_FRAMES = 6; //Frame count between visible and not visible while blinking
const GHOST_TIME_OF_HURT = 1000; //Frames showing the blinking hurt animation

class Ghost {
    sprite;
    keepMovinRight;
    keepMovinUp;
    start_x;
    start_y;
    timeOfDissapearance;
    timeOfHurt;
    disabled;

    maxHorizontalMovement;
    maxVerticalMovement;
    horizontalSpeed;
    verticalSpeed;
    hurtImage;

    constructor(x, y, width, height) {
        this.start_x = x;
        this.start_y = y;
        this.keepMovinRight = true;
        this.keepMovinUp = true;
        this.timeOfDissapearance = 0;
        this.timeOfHurt = 0;
        this.disabled = false;

        this.sprite = new Sprite(x, y, width, height, "static");
        this.sprite.image = BONUS_GHOST_GASTLY; //TODO remove images
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

    update() {
        if (!this.disabled) {
            if (this.timeOfHurt == 0) {
                this.checkCollision();
                this.move();
            } else {
                if (this.isTimeToDisappear()) {
                    this.disableSprite();
                } else {
                    this.blink();
                }
            }
        }
    }

    isTimeToDisappear() {
        return (millis() - this.timeOfHurt) > GHOST_TIME_OF_HURT
    }

    blink() {
        this.sprite.visible = (frameCount % (GHOST_BLINKING_FRAMES * 2) < GHOST_BLINKING_FRAMES);
    }

    checkCollision() {
        if (this.sprite.collide(ball)) {
            this.sprite.image = this.hurtImage
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

    readyToRespawn() {
        return this.disabled && this.hasPassedDeathCooldown();
    }

    hasPassedDeathCooldown() {
        return (millis() - this.timeOfDissapearance) > GHOST_RESPAWN_THRESHOLD_MILLS;
    }

}