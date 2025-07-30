let HEIGHT_OF_BALL_LOSS = SCREEN_HEIGHT;
let WIDTH_THRESHOLD_TO_CLOSE_GATE = 310;

function createBonusNewBallIfBallLoss() {
    if (checkBonusBallLoss()) {
        spawnBonusBall();
        disableScript(gate);
    }
}

function checkBonusBallLoss() {
    return ball.y > HEIGHT_OF_BALL_LOSS;
}

function closeBonusGateIfBallInsideBoard() {
    if (chechBallInsideBonusBoard()) {
        enableScript(gate);
    }
}

function chechBallInsideBonusBoard() {
    return ball.x < WIDTH_THRESHOLD_TO_CLOSE_GATE;
}
