const BALL_DIAMETER = 24; //Diameter of the ball

const BONUS_SPAWN_BALL_X = 361; //Horizontal pixel for the spawn of a ball on bonus levels
const BONUS_SPAWN_BALL_Y = 245; //Vertical pixel for the spawn of a ball on bonus levels

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
    }

    /** Returns the current X position of the ball. */
    getPositionX() {
        return this.sprite.x;
    }

    /** Returns the current Y position of the ball. */
    getPositionY() {
        return this.sprite.y;
    }

    /** Creates and returns a new ball for a bonus level. */
    static spawnBonusBall() {
        return new Ball(BONUS_SPAWN_BALL_X, BONUS_SPAWN_BALL_Y);
    }
}

