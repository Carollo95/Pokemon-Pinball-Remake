const GENGAR_RESPAWN_THRESHOLD_MILLS = 3000;
const GENGAR_HITBOX_HEIGHT = 45;
const GENGAR_HITBOX_WIDTH = 30;
const GENGAR_SPEED = 0.5; // Step speed
const GENGAR_STEP_LENGTH = 10.0; //Pixel length of each step
const GENGAR_HITPOINTS = 1;//5; //Number of hits to go down
const GENGAR_STEP_COOLDOWN_MILLS = 1500; //Time between steps
const GENGAR_MAX_DISTANCE = 100; //Number of pixels it can advance


class Gengar {
    hitPoints;
    keepMovingDown;
    sprite;
    start_y;
    step_start_y;
    timeOfLastStep;
    timeOfDissapearanceM

    constructor(x, y) {
        this.start_y = y;
        this.step_start_y = y;
        this.keepMovingDown = true;

        this.sprite = new Sprite(x, y, GENGAR_HITBOX_WIDTH, GENGAR_HITBOX_HEIGHT, "static");
        this.sprite.debug = DEBUG;

        this.hitPoints = GENGAR_HITPOINTS;
        this.timeOfLastStep = millis();
        this.timeOfDissapearance = millis();
    }


    update() {
        this.checkCollision();
        this.move();
    }

    checkCollision() {
        if (this.sprite.collide(ball)) {
            this.hitPoints -= 1;
            if (this.hitPoints < 0) {
                this.disableSprite(); //TODO temporary
            } else {
                disableSprite(this.sprite);
                this.keepMovingDown = false;
            }
        }
    }

    move() {

        if (this.hasPassedStepCooldown()) {
            this.takeStepForwards();
            this.takeStepBackwards();
        }
    }

    isAtMaxDistanceFromStart() {
        return this.sprite.pos.y - this.start_y >= GENGAR_MAX_DISTANCE;
    }

    isAtMinDistanceFromStart() {
        return this.sprite.pos.y <= GENGAR_SPAWN_Y;
    }

    hasPassedStepCooldown() {
        return (millis() - this.timeOfLastStep) > GENGAR_STEP_COOLDOWN_MILLS;
    }

    takeStepBackwards() {
        if (!this.keepMovingDown) {
            this.sprite.pos.y -= GENGAR_SPEED;

            if (this.backstepCompleted()) {
                this.step_start_y = this.sprite.pos.y;
                this.keepMovingDown = true;
                enableSprite(this.sprite);
                this.timeOfLastStep = millis();
            }

            if (this.isAtMinDistanceFromStart()) {
                this.keepMovingDown = true;
            }
        }
    }

    takeStepForwards() {
        if (this.keepMovingDown) {
            this.sprite.pos.y += GENGAR_SPEED;

            if (this.stepCompleted()) {
                this.step_start_y = this.sprite.pos.y;
                this.timeOfLastStep = millis();
            }

            if (this.isAtMaxDistanceFromStart()) {
                this.keepMovingDown = false;
            }
        }
    }

    stepCompleted() {
        return this.sprite.pos.y > (this.step_start_y + GENGAR_STEP_LENGTH);
    }
    backstepCompleted() {
        return this.sprite.pos.y < (this.step_start_y - GENGAR_STEP_LENGTH);
    }

    disableSprite() {
        disableSprite(this.sprite);
        this.sprite.visible = false;
        this.timeOfLastStep = millis();
        this.timeOfDissapearance = millis();
    }

    isDisabled() {
        return !this.sprite.visible;
    }

    readyToRespawn() {
        return this.isDisabled() && this.hasPassedDeathCooldown();
    }

    hasPassedDeathCooldown() {
        return (millis() - this.timeOfDissapearance) > GENGAR_RESPAWN_THRESHOLD_MILLS;
    }

}