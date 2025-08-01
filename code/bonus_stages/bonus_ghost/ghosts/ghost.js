class Ghost {
    keepMovinDown;
    sprite;
    start_x;
    start_y;
    timeOfLastStep = 0;

    maxVerticalMovement;
    speed;
    thresholdMills;

    constructor(x, y) {
        this.start_x = x;
        this.start_y = y;
        this.keepMovinDown = true;
    }

        move() {
        if (this.keepMovinDown) {
            this.sprite.pos.x += this.speed;
            if (this.sprite.pos.x > this.start_x + this.maxVerticalMovement) {
                this.keepMovinDown = false;
            }
        } else {
            this.sprite.pos.x -= this.speed;
            if (this.sprite.pos.x < this.start_x) {
                this.keepMovinDown = true;
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
        this.timeOfLastStep = millis();
    }

    isDisabled() {
        return !this.sprite.visible;
    }

    readyToRespawn() {
        return this.isDisabled() && this.hasPassedDeathCooldown();
    }

    hasPassedDeathCooldown() {
        return (millis() - this.timeOfLastStep) > this.thresholdMills;
    }

}