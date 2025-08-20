const BALL_DIAMETER = 24; //Diameter of the ball

const BONUS_SPAWN_BALL_X = 361; //Horizontal pixel for the spawn of a ball on bonus levels
const BONUS_SPAWN_BALL_Y = 245; //Vertical pixel for the spawn of a ball on bonus levels

class Ball {

    constructor(x, y) {
        this.sprite = new Sprite(x, y, BALL_DIAMETER, "dynamic");
        this.sprite.debug = DEBUG;
        this.sprite.layer = BALL_LAYER;
        this.spawnX = x;
        this.spawnY = y;
    }

    getPosition() {
        return (this.sprite.x, this.sprite.y);
    }

    getPositionX() {
        return this.sprite.x;
    }

    getPositionY() {
        return this.sprite.y;
    }

    static spawnBonusBall() {
        return new Ball(BONUS_SPAWN_BALL_X, BONUS_SPAWN_BALL_Y);
    }
}

