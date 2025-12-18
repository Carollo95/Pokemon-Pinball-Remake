const BALL_DIAMETER = 24; //Diameter of the ball

const BONUS_SPAWN_BALL_X = 361; //Horizontal pixel for the spawn of a ball on bonus levels
const BONUS_SPAWN_BALL_Y = 245; //Vertical pixel for the spawn of a ball on bonus levels
const FIELD_SPAWN_BALL_X = 334;
const FIELD_SPAWN_BALL_Y = 542;

const MAX_VEL = 15;       // velocity at which animation reaches max speed
const MAX_ANI_SPEED = 2;  // maximum animation speed (positive value)
const BALL_EPSILON = 1;      // threshold to consider "stopped"

const MINIMIZATION_SPRITE_DELAY = 100;

const UPGRADE_BALL_DURATION = 40000;

const BALL_TYPES = {
    POKEBALL: 'pokeBall',
    GREATBALL: 'greatBall',
    ULTRABALL: 'ultraBall',
    MASTERBALL: 'masterBall'
};

const POKE_BALL_MULTIPLIER = 1;
const GREAT_BALL_MULTIPLIER = 2;
const ULTRA_BALL_MULTIPLIER = 3;
const MASTER_BALL_MULTIPLIER = 5;

class Ball {

    /**
     * Creates a new Ball instance.
     * @param {number} x - Initial X position.
     * @param {number} y - Initial Y position.
     */
    constructor(x, y, onFullUpgradeAgainCallback = () => { }) {
        this.sprite = new Sprite(x, y, BALL_DIAMETER, "dynamic");
        this.sprite.debug = DEBUG;
        this.sprite.layer = BALL_LAYER;
        this.sprite.friction = 0.1;
        this.spawnX = x;
        this.spawnY = y;

        this.sprite.addAnimation("masterBallSmall", Asset.getAnimation('animMasterBallSmall'));
        this.sprite.addAnimation("masterBallSmall2", Asset.getAnimation('animMasterBallSmall2'));
        this.sprite.addAnimation("masterBall", Asset.getAnimation('animMasterBall'));
        this.sprite.addAnimation("ultraBallSmall", Asset.getAnimation('animUltraBallSmall'));
        this.sprite.addAnimation("ultraBallSmall2", Asset.getAnimation('animUltraBallSmall2'));
        this.sprite.addAnimation("ultraBall", Asset.getAnimation('animUltraBall'));
        this.sprite.addAnimation("greatBallSmall", Asset.getAnimation('animGreatBallSmall'));
        this.sprite.addAnimation("greatBallSmall2", Asset.getAnimation('animGreatBallSmall2'));
        this.sprite.addAnimation("greatBall", Asset.getAnimation('animGreatBall'));
        this.sprite.addAnimation("pokeBallSmall", Asset.getAnimation('animPokeBallSmall'));
        this.sprite.addAnimation("pokeBallSmall2", Asset.getAnimation('animPokeBallSmall2'));
        this.sprite.addAnimation("pokeBall", Asset.getAnimation('animPokeBall'));

        this.minimizing = false;
        this.lastSizeUpdate = -10000;
        this.lastUpgrade = 0;

        this.type = BALL_TYPES.POKEBALL;
        this.onFullUpgradeAgainCallback = onFullUpgradeAgainCallback;
    }

    update() {
        this.updateSize();

        if (millis() - this.lastUpgrade > UPGRADE_BALL_DURATION) {
            this.downGrade();
        }

        const velX = (this.sprite.velocity && this.sprite.velocity.x) || 0;
        const absVelX = Math.abs(velX);

        //case, almost stopped, ball is not moving
        if (absVelX < BALL_EPSILON) {
            this.sprite.ani.speed = 0;
            this.sprite.ani.frameDelay = 0;
            this.sprite.ani.playing = false;
            return;
        }

        //TODO is any of this crap in use???
        const t = Math.min(absVelX / MAX_VEL, 1);
        const speedMagnitude = t * MAX_ANI_SPEED;

        const MIN_DELAY = 1;
        const MAX_DELAY = 12;
        const frameDelay = Math.round(MAX_DELAY + (MIN_DELAY - MAX_DELAY) * (speedMagnitude / MAX_ANI_SPEED));
        this.sprite.ani.frameDelay = Math.max(MIN_DELAY, Math.min(MAX_DELAY, frameDelay));
    }

    updateSize() {
        if (this.minimizing && this.timeToUpdateSize()) {
            this.lastSizeUpdate = millis();
            if (this.sprite.animation.name.endsWith("Ball")) {
                this.sprite.changeAnimation(this.type + "Small");
            } else if (this.sprite.animation.name.endsWith("BallSmall")) {
                this.sprite.changeAnimation(this.type + "Small2");
            } else if (this.sprite.animation.name.endsWith("BallSmall2")) {
                this.sprite.visible = false;
                this.minimizing = false;

                //Called only once
                if (this.onMinimizedCallback) this.onMinimizedCallback();
                this.onMinimizedCallback = undefined;
            }
        }
    }

    timeToUpdateSize() {
        return millis() > this.lastSizeUpdate + MINIMIZATION_SPRITE_DELAY;
    }

    /** Returns the current X position of the ball. */
    getPositionX() {
        return this.sprite.x;
    }

    /** Returns the current Y position of the ball. */
    getPositionY() {
        return this.sprite.y;
    }

    multiplyPoints(points) {
        return this.getBallMultiplier() * points;
    }

    launchFromSpawn() {
        this.sprite.applyForce(0, -1000);
        Audio.playSFX('sfx0A');
    }

    getBallMultiplier() {
        switch (this.type) {
            case BALL_TYPES.POKEBALL: return POKE_BALL_MULTIPLIER;
            case BALL_TYPES.GREATBALL: return GREAT_BALL_MULTIPLIER;
            case BALL_TYPES.ULTRABALL: return ULTRA_BALL_MULTIPLIER;
            case BALL_TYPES.MASTERBALL: return MASTER_BALL_MULTIPLIER;
            default: return POKE_BALL_MULTIPLIER;
        }
    }

    stopOnCoordinates(x, y) {
        this.sprite.pos.x = x;
        this.sprite.pos.y = y;
        this.sprite.velocity.x = 0;
        this.sprite.velocity.y = 0;
        this.sprite.rotation = 0;
        this.sprite.rotationSpeed = 0;
        this.sprite.physics = "none";
        this.sprite.ani.frame = 0;
    }

    regainPhysics() {
        this.sprite.physics = "dynamic";
        this.sprite.velocity.x = 0.5;
    }

    minimize(onMinimizedCallback = () => { }) {
        this.minimizing = true;
        this.onMinimizedCallback = onMinimizedCallback;
    }

    maximize() {
        this.sprite.changeAnimation(this.type);
        this.minimizing = false;
        this.sprite.visible = true;
    }

    isVisible() {
        return this.sprite.visible;
    }

    upgrade() {
        //TODO play sfx
        this.lastUpgrade = millis();
        if (this.type === BALL_TYPES.MASTERBALL) {
            Audio.playSFX('sfx4D');
            this.onFullUpgradeAgainCallback();
        } else {
            Audio.playSFX('sfx3A');
            this.type = this.getNextType(this.type);
            this.sprite.changeAnimation(this.type);
        }
    }

    downGrade() {
        this.lastUpgrade = millis();
        this.type = this.getPreviousType(this.type);
        this.sprite.changeAnimation(this.type);
    }

    getNextType(type) {
        switch (type) {
            case BALL_TYPES.POKEBALL:
                return BALL_TYPES.GREATBALL;
            case BALL_TYPES.GREATBALL:
                return BALL_TYPES.ULTRABALL;
            case BALL_TYPES.ULTRABALL:
                return BALL_TYPES.MASTERBALL;
            case BALL_TYPES.MASTERBALL:
                return BALL_TYPES.MASTERBALL;
            default:
                return BALL_TYPES.POKEBALL;
        }
    }

    getPreviousType(type) {
        switch (type) {
            case BALL_TYPES.POKEBALL:
                return BALL_TYPES.POKEBALL;
            case BALL_TYPES.GREATBALL:
                return BALL_TYPES.POKEBALL;
            case BALL_TYPES.ULTRABALL:
                return BALL_TYPES.GREATBALL;
            case BALL_TYPES.MASTERBALL:
                return BALL_TYPES.ULTRABALL;
            default:
                return BALL_TYPES.POKEBALL;
        }
    }

    /** Creates and returns a new ball for a bonus level. */
    static spawnBonusBall() {
        return new Ball(BONUS_SPAWN_BALL_X, BONUS_SPAWN_BALL_Y);
    }

    static spawnFieldBall(onFullUpgradeAgainCallback = () => { }) {
        return new Ball(FIELD_SPAWN_BALL_X, FIELD_SPAWN_BALL_Y, onFullUpgradeAgainCallback);
    }

}

