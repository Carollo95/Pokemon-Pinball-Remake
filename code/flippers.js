let FLIPPER_LENGTH = 48;
let FLIPPER_WIDTH = 18

let LEFT_FLIPPER_ROTATION_POINT_X = 111;
let LEFT_FLIPPER_ROTATION_POINT_Y = 515;

let RIGHT_FLIPPER_ROTATION_POINT_X = 209;
let RIGHT_FLIPPER_ROTATION_POINT_Y = LEFT_FLIPPER_ROTATION_POINT_Y;

let BONUS_LEFT_FLIPPER_ROTATION_POINT_X = 139;
let BONUS_LEFT_FLIPPER_ROTATION_POINT_Y = 349;

let BONUS_RIGHT_FLIPPER_ROTATION_POINT_X = 237;
let BONUS_RIGHT_FLIPPER_ROTATION_POINT_Y = BONUS_LEFT_FLIPPER_ROTATION_POINT_Y;

let LEFT_FLIPPER_MIN_ROTATION = 35;
let RIGHT_FLIPPER_MIN_ROTATION = LEFT_FLIPPER_MIN_ROTATION * -1;
let LEFT_FLIPPER_MAX_ROTATION = -15;
let RIGHT_FLIPPER_MAX_ROTATION = LEFT_FLIPPER_MAX_ROTATION * -1;

let RIGHT_FLIPPER_ROTATION_SPEED = 15;
let LEFT_FLIPPER_ROTATION_SPEED = RIGHT_FLIPPER_ROTATION_SPEED * -1;

let LEFT_FLIPPER_KEY = 'a';
let RIGHT_FLIPPER_KEY = 'l';

let leftFlipper, rightFlipper;
let flippersEnabled = true;

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
    leftFlipper.pixelPerfect = true;

    rightFlipper = new Sprite(rightFlipperRotationPointX, rightFlipperRotationPointY, FLIPPER_LENGTH, FLIPPER_WIDTH, 'kinematic');
    rightFlipper.rotation = RIGHT_FLIPPER_MIN_ROTATION;
    rightFlipper.debug = DEBUG;
    rightFlipper.offset.x = -14;
    rightFlipper.pixelPerfect = true;
}

function controlLeftFlipper() {
    if (flippersEnabled) {
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
}

function controlRightFlipper() {
    if (flippersEnabled) {
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
}


function disableFlippers() {
    flippersEnabled = false;

    rightFlipper.rotation = RIGHT_FLIPPER_MIN_ROTATION;
    leftFlipper.rotation = LEFT_FLIPPER_MIN_ROTATION;

}

function enableFlippers() {
    flippersEnabled = true;
}