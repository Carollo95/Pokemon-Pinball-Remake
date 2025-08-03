const BALL_DIAMETER = 24; //Diameter of the ball

const BONUS_SPAWN_BALL_X = 361; //Horizontal pixel for the spawn of a ball on bonus levels
const BONUS_SPAWN_BALL_Y = 245; //Vertical pixel for the spawn of a ball on bonus levels

let ball;

function createBall(x, y) {
    ball = new Sprite();
    ball.x = x;
    ball.y = y;
    ball.diameter = BALL_DIAMETER;
    ball.debug = DEBUG;
}

function spawnBonusBall() {
    createBall(BONUS_SPAWN_BALL_X, BONUS_SPAWN_BALL_Y);
}
