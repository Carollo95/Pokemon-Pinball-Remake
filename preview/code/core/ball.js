const BALL_DIAMETER = 24; //Diameter of the ball

const BONUS_SPAWN_BALL_X = 361; //Horizontal pixel for the spawn of a ball on bonus levels
const BONUS_SPAWN_BALL_Y = 245; //Vertical pixel for the spawn of a ball on bonus levels

const MAX_VEL = 15;       // velocity at which animation reaches max speed
const MAX_ANI_SPEED = 2;  // maximum animation speed (positive value)
const BALL_EPSILON = 1;      // threshold to consider "stopped"

const MINIMIZATION_SPRITE_DELAY = 100;

class Ball {

    /**
     * Creates a new Ball instance.
     * @param {number} x - Initial X position.
     * @param {number} y - Initial Y position.
     */
    constructor(x, y) {
        this.sprite = new Sprite(x, y, BALL_DIAMETER, "dynamic");
        this.sprite.debug = DEBUG;
        this.sprite.layer = BALL_LAYER;
        this.sprite.friction = 0.1;
        this.spawnX = x;
        this.spawnY = y;

        this.sprite.addAnimation("pokeBallSmall", Asset.getAnimation('animPokeBallSmall'));
        this.sprite.addAnimation("pokeBallSmall2", Asset.getAnimation('animPokeBallSmall2'));
        this.sprite.addAnimation("pokeBall", Asset.getAnimation('animPokeBall'));

        this.minimizing = false;
        this.lastSizeUpdate = -10000;
    }

    update() {
        this.updateSize();

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

    updateSize(){
        if(this.minimizing && this.timeToUpdateSize()){
            this.lastSizeUpdate = millis();
            if(this.sprite.animation.name === "pokeBall"){
                this.sprite.changeAnimation("pokeBallSmall");
            }else if(this.sprite.animation.name === "pokeBallSmall"){
                this.sprite.changeAnimation("pokeBallSmall2");
            }else if(this.sprite.animation.name === "pokeBallSmall2"){
                this.sprite.visible = false;
                this.minimizing = false;

                //Called only once
                if(this.onMinimizedCallback) this.onMinimizedCallback();
                this.onMinimizedCallback = undefined;
            }
        }
    }

    timeToUpdateSize(){
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
        //TODO add other types of balls
        return 1;
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

    /** Creates and returns a new ball for a bonus level. */
    static spawnBonusBall() {
        return new Ball(BONUS_SPAWN_BALL_X, BONUS_SPAWN_BALL_Y);
    }
    static spawnStageBall() {
        return new Ball(334, 542);
    }

    minimize(onMinimizedCallback = () => {}) {
        this.minimizing = true;
        this.onMinimizedCallback = onMinimizedCallback;
    }

    maximize(){
        this.sprite.changeAnimation("pokeBall");
        this.minimizing = false;
        this.sprite.visible = true;
    }


}

