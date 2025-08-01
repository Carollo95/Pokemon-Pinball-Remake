const HEIGHT_OF_BALL_LOSS = SCREEN_HEIGHT;
const WIDTH_THRESHOLD_TO_CLOSE_GATE = 310;

let gate;

function createBonusNewBallIfBallLoss() {
    if (checkBonusBallLoss()) {
        spawnBonusBall();
        openBonusGate();
    }
}

function checkBonusBallLoss() {
    return ball.y > HEIGHT_OF_BALL_LOSS;
}

function openBonusGate() {
    disableSprite(gate);
    bg = loadImage(BONUS_GHOST_BACKGROUND_OPEN);
}

function closeBonusGate() {
    enableSprite(gate);
    bg = loadImage(BONUS_GHOST_BACKGROUND);
}

function closeBonusGateIfBallInsideBoard() {
    if (chechBallInsideBonusBoard()) {
        closeBonusGate();
    }
}

function chechBallInsideBonusBoard() {
    return ball.x < WIDTH_THRESHOLD_TO_CLOSE_GATE;
}
