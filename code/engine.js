//Ball
let ball;
function createBall(x, y) {
    ball = new Sprite();
    ball.x = x;
    ball.y = y;
    ball.diameter = BALL_DIAMETER;
    ball.debug = DEBUG;
}


let leftFlipper, rightFlipper;
//Flippers
function controlFlipper(flipper, key, minRotation, maxRotation, speed, epsilon) {
    if (kb.pressing(key)) {
        if (flipper.rotation > maxRotation + epsilon) {
            flipper.rotationSpeed = speed;
        } else {
            flipper.rotation = maxRotation;
            flipper.rotationSpeed = 0;
        }
    } else {
        if (flipper.rotation < minRotation - epsilon) {
            flipper.rotationSpeed = -speed;
        } else {
            flipper.rotation = minRotation;
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

    // To prevent the flipper of doing full 360s
    leftFlipper.body.setFixedRotation(true);
    rightFlipper.body.setFixedRotation(true);

}

function controlLeftFlipper(){
    controlFlipper(
        leftFlipper,
        'a',
        LEFT_FLIPPER_MIN_ROTATION,
        LEFT_FLIPPER_MAX_ROTATION,
        LEFT_FLIPPER_ROTATION_SPEED,
        EPSILON
    );
}

function controlRightFlipper(){
    controlFlipper(
        rightFlipper,
        'l',
        RIGHT_FLIPPER_MIN_ROTATION,
        RIGHT_FLIPPER_MAX_ROTATION,
        RIGHT_FLIPPER_ROTATION_SPEED,
        EPSILON
    );
}

function controlFlipper(flipper, key, minRotation, maxRotation, speed, epsilon) {
  if (kb.pressing(key)) {
    if (flipper.rotation > maxRotation + epsilon) {
      flipper.rotationSpeed = speed;
    } else {
      flipper.rotation = maxRotation;
      flipper.rotationSpeed = 0;
    }
  } else {
    if (flipper.rotation < minRotation - epsilon) {
      flipper.rotationSpeed = -speed;
    } else {
      flipper.rotation = minRotation;
      flipper.rotationSpeed = 0;
    }
  }
}
