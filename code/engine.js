//Ball
let ball;

function createBall(x, y) {
    ball = new Sprite();
    ball.x = x;
    ball.y = y;
    ball.diameter = BALL_DIAMETER;
    ball.debug = DEBUG;
}

function spawnBonusBall(){
    createBall(BONUS_SPAWN_BALL_X, BONUS_SPAWN_BALL_Y);
}


//Flippers
let leftFlipper, rightFlipper;
function controlFlipper(flipper, key, minRotation, maxRotation, speed, epsilon) {
    if (kb.pressing(key)) {
        if (flipper.rotation > maxRotation + epsilon) {
            flipper.rotationSpeed = speed;
        } else {
            flipper.rotation = maxRotation;
            flipper.rotationSpeed = 0;
        }
    }
}

function createTableFlippers() {
    createFlippers(LEFT_FLIPPER_ROTATION_POINT_X, LEFT_FLIPPER_ROTATION_POINT_Y, RIGHT_FLIPPER_ROTATION_POINT_X, RIGHT_FLIPPER_ROTATION_POINT_Y);
}

function createBonusFlippers() {
    createFlippers(BONUS_LEFT_FLIPPER_ROTATION_POINT_X, BONUS_LEFT_FLIPPER_ROTATION_POINT_Y, BONUS_RIGHT_FLIPPER_ROTATION_POINT_X, BONUS_RIGHT_FLIPPER_ROTATION_POINT_Y);
}

function createFlippers(leftFlipperRotationPointX, leftFlipperRotationPointY, rightFlipperRotationPointX, rightFlipperRotationPointY) {

    leftFlipper = new Sprite(leftFlipperRotationPointX, leftFlipperRotationPointY, FLIPPER_LENGTH, FLIPPER_WIDTH, 'kinematic');
    leftFlipper.rotation = LEFT_FLIPPER_MIN_ROTATION;
    leftFlipper.debug = DEBUG;
    leftFlipper.offset.x = 14;

    rightFlipper = new Sprite(rightFlipperRotationPointX, rightFlipperRotationPointY, FLIPPER_LENGTH, FLIPPER_WIDTH, 'kinematic');
    rightFlipper.rotation = RIGHT_FLIPPER_MIN_ROTATION;
    rightFlipper.debug = DEBUG;
    rightFlipper.offset.x = -14;
}

function controlLeftFlipper() {
    if (kb.pressing(LEFT_FLIPPER_KEY)) {
        if (leftFlipper.rotation > LEFT_FLIPPER_MAX_ROTATION + EPSILON) {
            leftFlipper.rotationSpeed = LEFT_FLIPPER_ROTATION_SPEED;
        } else {
            leftFlipper.rotation = LEFT_FLIPPER_MAX_ROTATION;
            leftFlipper.rotationSpeed = 0;

        }
    } else {
        if (leftFlipper.rotation < LEFT_FLIPPER_MIN_ROTATION) {
            leftFlipper.rotationSpeed = - LEFT_FLIPPER_ROTATION_SPEED;
        } else {
            leftFlipper.rotation = LEFT_FLIPPER_MIN_ROTATION;
            leftFlipper.rotationSpeed = 0;
        }
    }
}

function controlRightFlipper() {
    if (kb.pressing(RIGHT_FLIPPER_KEY)) {
        if (rightFlipper.rotation < RIGHT_FLIPPER_MAX_ROTATION - EPSILON) {
            rightFlipper.rotationSpeed = RIGHT_FLIPPER_ROTATION_SPEED;
        } else {
            rightFlipper.rotation = RIGHT_FLIPPER_MAX_ROTATION;
            rightFlipper.rotationSpeed = 0;
        }
    } else {
        if (rightFlipper.rotation > RIGHT_FLIPPER_MIN_ROTATION) {
            rightFlipper.rotationSpeed = -RIGHT_FLIPPER_ROTATION_SPEED;
        } else {
            rightFlipper.rotation = RIGHT_FLIPPER_MIN_ROTATION;
            rightFlipper.rotationSpeed = 0;
        }
    }
}
