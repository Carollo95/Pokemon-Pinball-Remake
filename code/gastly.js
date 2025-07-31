let GASTLY_RESPAWN_THRESHOLD_MILLS = 3000;
let GASTLY_HITBOX_HEIGHT = 24;
let GASTLY_HITBOX_WIDTH = 24;
let GASTLY_SPEED = 0.5;
let GASTLY_MAX_HORIZONTAL_MOVEMENT = 60;

class Gastly {
    keepMovinRight;
    sprite;
    start_x;
    start_y;
    timeOfDissapearance = 0;

    constructor(x, y) {
        this.start_x = x;
        this.start_y = y;
        this.keepMovinRight = true;
        this.sprite = new Sprite(x, y, GASTLY_HITBOX_WIDTH, GASTLY_HITBOX_HEIGHT, "static");
        this.sprite.debug = DEBUG;
    }

    update() {
        if (!this.isDisabled()) {
            this.checkCollision();
            this.move();
        }

    }

    move() {
        if (this.keepMovinRight) {
            this.sprite.pos.x += GASTLY_SPEED;
            if (this.sprite.pos.x > this.start_x + GASTLY_MAX_HORIZONTAL_MOVEMENT) {
                this.keepMovinRight = false;
            }
        } else {
            this.sprite.pos.x -= GASTLY_SPEED;
            if (this.sprite.pos.x < this.start_x) {
                this.keepMovinRight = true;
            }
        }
    }

    checkCollision() {
        if (this.sprite.collide(ball)) {
            this.disableScript();
        }
    }

    disableScript() {
        disableScript(this.sprite);
        this.sprite.visible = false;
        this.timeOfDissapearance = millis();
    }

    isDisabled() {
        return !this.sprite.visible;
    }

    readyToRespawn() {
        return this.isDisabled() && this.hasPassedDeathCooldown();
    }

    hasPassedDeathCooldown() {
        return (millis() - this.timeOfDissapearance) > GASTLY_RESPAWN_THRESHOLD_MILLS;
    }

}