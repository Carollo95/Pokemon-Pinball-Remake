const GENGAR_HITBOX_HEIGHT = 62;
const GENGAR_HITBOX_WIDTH = 42;
const GENGAR_SPEED = 0.5;
const GENGAR_STEP_LENGTH = 10.0;
const GENGAR_HITPOINTS = 5;
const GENGAR_STEP_COOLDOWN_MS = 1500;
const GENGAR_MAX_DISTANCE = 100;
const GENGAR_INVINCIBILITY_MS = 1500;
const GENGAR_SPAWN_THRESHOLD_MS = 1000;

class Gengar extends Ghost {
    constructor(x, y) {
        super(x, y, GENGAR_HITBOX_WIDTH, GENGAR_HITBOX_HEIGHT);

        this.step_start_y = y;
        this.keepMovingDown = true;

        this.hitPoints = GENGAR_HITPOINTS;
        this.timeOfLastStep = millis();
        this.timeOfDisappearance = millis();
        this.respawnThresholdTime = GENGAR_SPAWN_THRESHOLD_MS;

        this.timeOfHurt = 0;

        // animations
        this.idleAnimation = animGengar;
        this.hurtAnimation = animGengarHurt;
        this.walkAnimation = animGengarWalk;

        this.sprite.addAnimation("idle", this.idleAnimation);
        this.sprite.addAnimation("hurt", this.hurtAnimation);
        this.sprite.addAnimation("walk", this.walkAnimation);

        this.sprite.changeAnimation("idle");
        this.sprite.layer = 9;
    }

    update(ballSprite) {
        if (this.disabled) return;

        if (this.hitPoints > 0) {
            this.blinkIfHurt();
            this.checkCollision(ballSprite);
            this.move();
        } else {
            this.gengarIsDefeated();
        }
    }

    blinkIfHurt() {
        if ((millis() - this.timeOfHurt) < GENGAR_INVINCIBILITY_MS) {
            this.blink();
        } else {
            EngineUtils.enableSprite(this.sprite);
            this.sprite.visible = true;
        }
    }

    gengarIsDefeated() {
        if (this.hitPoints === 0) {
            sfx2E.play();
            this.hitPoints--;
        }
        this.moonwalkIntoOblivion();
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
        return (millis() - this.timeOfHurt) < GENGAR_INVINCIBILITY_MS;
    }

    checkCollision(ballSprite) {
        if (this.sprite.collide(ballSprite)) {
            this.hitPoints--;
            EngineUtils.disableSprite(this.sprite);
            sfx37.play();
            this.sprite.changeAnimation("hurt");
            this.keepMovingDown = false;
            this.timeOfHurt = millis();
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
        return (this.sprite.pos.y - this.start_y) >= GENGAR_MAX_DISTANCE;
    }

    isAtMinDistanceFromStart() {
        if (this.hitPoints > 0) {
            return (this.sprite.pos.y - this.start_y) >= GENGAR_MAX_DISTANCE;
        } else {
            // Exit distance is farther away than normal backing distance
            return this.sprite.pos.y <= GENGAR_SPAWN_Y;
        }
    }

    hasPassedStepCooldown() {
        return (millis() - this.timeOfLastStep) > GENGAR_STEP_COOLDOWN_MS;
    }

    takeStepBackwards() {
        if (!this.keepMovingDown) {
            this.sprite.pos.y -= GENGAR_SPEED;

            if (this.isAtMinDistanceFromStart() || this.isBackstepCompleted()) {
                this.step_start_y = this.sprite.pos.y;
                this.keepMovingDown = true;
                this.timeOfLastStep = millis();
                this.sprite.changeAnimation("idle");
                EngineUtils.startShake();
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
                sfx2B.play();
                EngineUtils.startShake();
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
        return (this.sprite.pos.y < (this.step_start_y - GENGAR_STEP_LENGTH)) || (this.sprite.pos.y <= this.start_y);
    }

    disableSprite() {
        EngineUtils.disableSprite(this.sprite);
        this.disabled = true;
        this.sprite.visible = false;
        this.timeOfLastStep = millis();
        this.timeOfDisappearance = millis();
    }

    isDefeated() {
        return this.hitPoints <= 0;
    }
}