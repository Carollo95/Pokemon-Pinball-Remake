const BALL_DIAMETER = 24; //Diameter of the ball

const BONUS_SPAWN_BALL_X = 361; //Horizontal pixel for the spawn of a ball on bonus levels
const BONUS_SPAWN_BALL_Y = 245; //Vertical pixel for the spawn of a ball on bonus levels


class Ball {
    sprite;
    spawn_x;
    spawn_x;

    constructor(x, y) {
        this.sprite = new Sprite();
        this.sprite.layer = 5;
        this.spawn_x = x;
        this.spawn_y = y;
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.diameter = BALL_DIAMETER;
        this.sprite.debug = DEBUG;
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
}

function spawnBonusBall() {
    return new Ball(BONUS_SPAWN_BALL_X, BONUS_SPAWN_BALL_Y);
}
