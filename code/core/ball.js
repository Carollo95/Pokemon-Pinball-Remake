const BALL_DIAMETER = 24; //Diameter of the ball

const BONUS_SPAWN_BALL_X = 361; //Horizontal pixel for the spawn of a ball on bonus levels
const BONUS_SPAWN_BALL_Y = 245; //Vertical pixel for the spawn of a ball on bonus levels

const MAX_VEL = 15;       // velocity at which animation reaches max speed
const MAX_ANI_SPEED = 2;  // maximum animation speed (positive value)
const BALL_EPSILON = 1;      // threshold to consider "stopped"

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
        this.spawnX = x;
        this.spawnY = y;

        this.sprite.addAnimation("pokeBall", Asset.getAnimation('animPokeBall'));
    }

    update() {
        const velX = (this.sprite.velocity && this.sprite.velocity.x) || 0;
        const absVelX = Math.abs(velX);

        //case, almost stopped, ball is not moving
        if (absVelX < BALL_EPSILON) {
            this.sprite.ani.speed = 0;
            this.sprite.ani.frameDelay = 0;
            this.sprite.ani.playing = false;
            return;
        }

        const t = Math.min(absVelX / MAX_VEL, 1);
        const speedMagnitude = t * MAX_ANI_SPEED;

        const MIN_DELAY = 1;
        const MAX_DELAY = 12;
        const frameDelay = Math.round(MAX_DELAY + (MIN_DELAY - MAX_DELAY) * (speedMagnitude / MAX_ANI_SPEED));
        this.sprite.ani.frameDelay = Math.max(MIN_DELAY, Math.min(MAX_DELAY, frameDelay));
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
        //TODO add other types of balls
        return points;
    }

    /** Creates and returns a new ball for a bonus level. */
    static spawnBonusBall() {
        return new Ball(BONUS_SPAWN_BALL_X, BONUS_SPAWN_BALL_Y);
    }
}

