class Ghost {
    keepMovinRight;
    sprite;
    start_x;
    start_y;
    timeOfDissapearance = 0;

    maxHorizontalMovement;
    speed;
    thresholdMills;

    constructor(x, y) {
        this.start_x = x;
        this.start_y = y;
        this.keepMovinRight = true;
    }

        move() {
        if (this.keepMovinRight) {
            this.sprite.pos.x += this.speed;
            if (this.sprite.pos.x > this.start_x + this.maxHorizontalMovement) {
                this.keepMovinRight = false;
            }
        } else {
            this.sprite.pos.x -= this.speed;
            if (this.sprite.pos.x < this.start_x) {
                this.keepMovinRight = true;
            }
        }
    }

    update() {
        if (!this.isDisabled()) {
            this.checkCollision();
            this.move();
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
        return (millis() - this.timeOfDissapearance) > this.thresholdMills;
    }

}