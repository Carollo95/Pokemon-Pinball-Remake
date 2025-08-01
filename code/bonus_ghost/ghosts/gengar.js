const GENGAR_HITBOX_HEIGHT = 45;
const GENGAR_HITBOX_WIDTH = 30;
const GENGAR_SPEED = 0.5; // Step speed
const GENGAR_STEP_LENGTH = 10.0; //Pixel length of each step
const GENGAR_HITPOINTS = 5; //Number of hits to go down
const GENGAR_STEP_COOLDOWN_MILLS = 1500; //Time between steps
const GENGAR_MAX_DISTANCE = 100; //Number of pixels it can advance

class Gengar {
    hitPoints;
    keepMovinDown;
    sprite;
    start_y;
    step_start_y;
    timeOfLastStep;

    constructor(x, y) {
        this.start_y = y;
        this.step_start_y = y;
        this.keepMovinDown = true;

        this.sprite = new Sprite(x, y, GENGAR_HITBOX_WIDTH, GENGAR_HITBOX_HEIGHT, "static");
        this.sprite.debug = DEBUG;
        this.hitPoints = GENGAR_HITPOINTS;
        this.timeOfLastStep = millis();
    }


    update() {
        this.checkCollision();
        this.move();
    }

    checkCollision() {
        if (this.sprite.collide(ball)) {
            this.hitPoints -= 1;
            if (this.hitPoints < 0) {
                this.disableScript(); //TODO temporary
            }
        }
    }

    move() {
        if (this.hasPassedStepCooldown()) {
            this.takeStep();
        }
    }


    isAtMaxDistanceFromStart(){
        return this.sprite.pos.y - this.start_y >= GENGAR_MAX_DISTANCE;
    }

    hasPassedStepCooldown() {
        return (millis() - this.timeOfLastStep) > GENGAR_STEP_COOLDOWN_MILLS;
    }

    takeStep() {
        if (this.keepMovinDown) {
            this.sprite.pos.y += GENGAR_SPEED;

            if(this.stepCompleted()){
                this.step_start_y = this.sprite.pos.y;
                this.timeOfLastStep = millis();
            }

            if (this.isAtMaxDistanceFromStart()) {
                this.keepMovinDown = false;
            }
        }
    }

    stepCompleted(){
        return this.sprite.pos.y > (this.step_start_y + GENGAR_STEP_LENGTH);
    }

    disableScript() {
        disableSprite(this.sprite);
        this.sprite.visible = false;
        this.timeOfLastStep = millis();
    }

    isDisabled() {
        return !this.sprite.visible;
    }

    //TODO remove
    readyToRespawn() {
        return this.isDisabled() && this.hasPassedDeathCooldown();
    }

    //TODO remove
    hasPassedDeathCooldown() {
        return (millis() - this.timeOfLastStep) > this.thresholdMills;
    }
}