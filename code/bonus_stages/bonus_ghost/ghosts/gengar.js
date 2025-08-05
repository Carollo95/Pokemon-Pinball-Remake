const GENGAR_HITBOX_HEIGHT = 56; //Height of gengar's hitbox
const GENGAR_HITBOX_WIDTH = 36; //Width of gengar's hitbox
const GENGAR_SPEED = 0.5; // Step speed
const GENGAR_STEP_LENGTH = 10.0; //Pixel length of each step
const GENGAR_HITPOINTS = 5; //Number of hits to go down
const GENGAR_STEP_COOLDOWN_MILLS = 1500; //Time between steps
const GENGAR_MAX_DISTANCE = 100; //Number of pixels it can advance
const GENGAR__INVINCIBILITY_TIME = 1500; //Milliseconds of invulnerabiliy after getting hit


class Gengar extends Ghost {
    hitPoints;
    keepMovingDown;
    step_start_y;
    timeOfLastStep;
    timeOfDissapearance;
    walkAnimation;

    constructor(x, y) {
        super(x, y, GENGAR_HITBOX_WIDTH, GENGAR_HITBOX_HEIGHT);
        this.step_start_y = y;
        this.keepMovingDown = true;

        this.hitPoints = GENGAR_HITPOINTS;
        this.timeOfLastStep = millis();
        this.timeOfDissapearance = millis();

        this.idleAnimation = getAnimation(BONUS_GHOST_GENGAR, 96, 128, 3, 16);
        this.sprite.addAnimation("idle", this.idleAnimation);
        this.hurtAnimation = getAnimation(BONUS_GHOST_GENGAR_HURT, 112, 128, 1, DEFAULT_ANIMATION_DELAY);
        this.sprite.addAnimation("hurt", this.hurtAnimation);
        this.walkAnimation = getAnimation(BONUS_GHOST_GENGAR_WALK, 96, 128, 4, DEFAULT_ANIMATION_DELAY);
        this.sprite.addAnimation("walk", this.walkAnimation);

        this.sprite.changeAnimation("idle");
    }


    update() {
        if (this.hitPoints > 0) {
            if (this.isRecentlyHurt()) {
                this.blink();
            } else {
                enableSprite(this.sprite);
                this.sprite.visible = true; //If case blinking stops at an invisible frame
            }
            this.checkCollision();
            this.move();
        } else {
            this.moonwalkIntoOblivion();
        }
    }

    moonwalkIntoOblivion() {
        this.blink();
        if (!this.isAtMinDistanceFromStart()) {
            this.keepMovingDown = false;
            this.move();
        } else {
            this.disableSprite();
        }
    }

    isRecentlyHurt() {
        return (millis() - this.timeOfHurt) < GENGAR__INVINCIBILITY_TIME;
    }

    checkCollision() {
        if (this.sprite.collide(ball)) {
            this.hitPoints -= 1;
            if (this.hitPoints < 0) {
                disableSprite(this.sprite);
                //TODO not disable but walk butwards and disappear
            } else {
                disableSprite(this.sprite);
                this.sprite.changeAnimation("hurt");
                this.keepMovingDown = false;
                this.timeOfHurt = millis();
            }
        }
    }

    move() {
        if (this.hasPassedStepCooldown()) {
            this.sprite.changeAnimation("walk");
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

            if (this.isAtMinDistanceFromStart() || this.isBackstepCompleted()) {
                this.step_start_y = this.sprite.pos.y;
                this.keepMovingDown = true;
                this.timeOfLastStep = millis();
                this.sprite.changeAnimation("idle");
                startShake();
            }
        }
    }

    takeStepForwards() {
        if (this.keepMovingDown) {
            this.sprite.pos.y += GENGAR_SPEED;

            if (this.isStepCompleted()) {
                this.step_start_y = this.sprite.pos.y;
                this.timeOfLastStep = millis();
                this.sprite.changeAnimation("idle");
                startShake();
            }

            if (this.isAtMaxDistanceFromStart()) {
                this.keepMovingDown = false;
            }
        }
    }

    isStepCompleted() {
        return this.sprite.pos.y > (this.step_start_y + GENGAR_STEP_LENGTH);
    }

    isBackstepCompleted() {
        return this.sprite.pos.y < (this.step_start_y - GENGAR_STEP_LENGTH) || this.sprite.pos.y <= this.start_y;
    }

    disableSprite() {
        disableSprite(this.sprite);
        this.disabled = true;
        this.sprite.visible = false;
        this.timeOfLastStep = millis();
        this.timeOfDissapearance = millis();
    }

}