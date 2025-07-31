let BALL_DIAMETER = 24;

let BONUS_SPAWN_BALL_X = 361;
let BONUS_SPAWN_BALL_Y = 245;

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
