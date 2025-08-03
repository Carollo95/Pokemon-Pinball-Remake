const HEIGHT_OF_BALL_LOSS = SCREEN_HEIGHT; //Height at which a ball is considered lost
const WIDTH_THRESHOLD_TO_CLOSE_GATE = 310; //Horizontal pixel that when a ball crosses it, the gate on bonus levels closes

let gate;
let levelCompleted = false;

function createBonusNewBallIfBallLoss(bonusGateBackground) {
    if (checkBonusBallLoss() && !levelCompleted) {
        spawnBonusBall();
        openBonusGate(bonusGateBackground);
    }
}

function checkBonusBallLoss() {
    return ball.y > HEIGHT_OF_BALL_LOSS;
}

function openBonusGate(bonusGateBackground) {
    disableSprite(gate);
    replaceBackground(bonusGateBackground);
}

function closeBonusGate(bonusGateBackground) {
    enableSprite(gate);
    replaceBackground(bonusGateBackground);
}

function closeBonusGateIfBallInsideBoard(bonusGateBackground) {
    if (chechBallInsideBonusBoard()) {
        closeBonusGate(bonusGateBackground);
    }
}

function chechBallInsideBonusBoard() {
    return ball.x < WIDTH_THRESHOLD_TO_CLOSE_GATE;
}
