const FLIPPER_LENGTH = 48; //Length of the flipper
const FLIPPER_WIDTH = 2; //Height of the flipper

const LEFT_FLIPPER_ROTATION_POINT_X = 111; //Horizontal pixel for the left flipper axis of rotation
const LEFT_FLIPPER_ROTATION_POINT_Y = 515; //Vertical pixel for the left flipper axis of rotation

const RIGHT_FLIPPER_ROTATION_POINT_X = 209; //Horizontal pixel for the right flipper axis of rotation
const RIGHT_FLIPPER_ROTATION_POINT_Y = LEFT_FLIPPER_ROTATION_POINT_Y; //Vertical pixel for the right flipper axis of rotation

const BONUS_LEFT_FLIPPER_ROTATION_POINT_X = 139; //Horizontal pixel for the left flipper axis of rotation on a bonus level
const BONUS_LEFT_FLIPPER_ROTATION_POINT_Y = 349; //Vertical pixel for the left flipper axis of rotation on a bonus level

const BONUS_RIGHT_FLIPPER_ROTATION_POINT_X = 237; //Horizontal pixel for the right flipper axis of rotation on a bonus level
const BONUS_RIGHT_FLIPPER_ROTATION_POINT_Y = BONUS_LEFT_FLIPPER_ROTATION_POINT_Y; //Vertical pixel for the right flipper axis of rotation on a bonus level

const LEFT_FLIPPER_MIN_ROTATION = 35; //Min angle for the left flipper
const RIGHT_FLIPPER_MIN_ROTATION = LEFT_FLIPPER_MIN_ROTATION * -1; //Min angle for the right flipper
const LEFT_FLIPPER_MAX_ROTATION = -35; //Max angle for the left flipper
const RIGHT_FLIPPER_MAX_ROTATION = LEFT_FLIPPER_MAX_ROTATION * -1; //Max angle for the right flipper

const RIGHT_FLIPPER_ROTATION_SPEED = 15; //Movement speed for the right flipper
const LEFT_FLIPPER_ROTATION_SPEED = RIGHT_FLIPPER_ROTATION_SPEED * -1; //Movement speed for the left flipper

const LEFT_FLIPPER_KEY = 'a'; //Key for the movemenet of the left flipper
const RIGHT_FLIPPER_KEY = 'l'; //Key for the movemenet of the right flipper

const FLIPPER_IMAGE_WIDHT = 48;
const FLIPPER_IMAGE_HEIGHT = 48;

const LEFT_FLIPPER_OFFSET = 14;
const RIGHT_FLIPPER_OFFSET = -14;


class Flippers {
    leftFlipper;
    rightFlipper;

    flippersEnabled;
    constructor(leftFlipperRotationPointX, leftFlipperRotationPointY, rightFlipperRotationPointX, rightFlipperRotationPointY) {

        this.flippersEnabled = true;

        this.leftFlipper = new Sprite(leftFlipperRotationPointX, leftFlipperRotationPointY, FLIPPER_LENGTH, FLIPPER_WIDTH, 'kinematic');
        this.leftFlipper.rotation = LEFT_FLIPPER_MIN_ROTATION;
        this.leftFlipper.debug = DEBUG;
        this.leftFlipper.offset.x = LEFT_FLIPPER_OFFSET;

        this.leftFlipper.addAnimation("up", getAnimation(LEFT_FLIPPER_UP, FLIPPER_IMAGE_WIDHT, FLIPPER_IMAGE_HEIGHT, 1));
        this.leftFlipper.addAnimation("middle", getAnimation(LEFT_FLIPPER_MIDDLE, FLIPPER_IMAGE_WIDHT, FLIPPER_IMAGE_HEIGHT, 1));
        this.leftFlipper.addAnimation("down", getAnimation(LEFT_FLIPPER_DOWN, FLIPPER_IMAGE_WIDHT, FLIPPER_IMAGE_HEIGHT, 1));
        this.leftFlipper.draw = function () {
            if (this.animation.name == "down") {
                rotate(-LEFT_FLIPPER_MIN_ROTATION);
            } else if (this.animation.name == "middle") {
                rotate(0);
            } else {
                rotate(-LEFT_FLIPPER_MAX_ROTATION);
            }
            this.animation.draw(LEFT_FLIPPER_OFFSET, -2);

        }

        this.rightFlipper = new Sprite(rightFlipperRotationPointX, rightFlipperRotationPointY, FLIPPER_LENGTH, FLIPPER_WIDTH, 'kinematic');
        this.rightFlipper.rotation = RIGHT_FLIPPER_MIN_ROTATION;
        this.rightFlipper.debug = DEBUG;
        this.rightFlipper.offset.x = RIGHT_FLIPPER_OFFSET;

        this.rightFlipper.addAnimation("up", getAnimation(RIGHT_FLIPPER_UP, FLIPPER_IMAGE_WIDHT, FLIPPER_IMAGE_HEIGHT, 1));
        this.rightFlipper.addAnimation("middle", getAnimation(RIGHT_FLIPPER_MIDDLE, FLIPPER_IMAGE_WIDHT, FLIPPER_IMAGE_HEIGHT, 1));
        this.rightFlipper.addAnimation("down", getAnimation(RIGHT_FLIPPER_DOWN, FLIPPER_IMAGE_WIDHT, FLIPPER_IMAGE_HEIGHT, 1));
        this.rightFlipper.draw = function () {
            if (this.animation.name == "down") {
                rotate(-RIGHT_FLIPPER_MIN_ROTATION);
            } else if (this.animation.name == "middle") {
                rotate(0);
            } else {
                rotate(-RIGHT_FLIPPER_MAX_ROTATION);
            }
            this.animation.draw(RIGHT_FLIPPER_OFFSET, -2);
        }
    }

    update() {
        this.controlLeftFlipper();
        this.controlRightFlipper();
    }

    controlLeftFlipper() {
        if (this.flippersEnabled) {
            if (kb.pressing(LEFT_FLIPPER_KEY)) {
                if (this.leftFlipper.rotation > LEFT_FLIPPER_MAX_ROTATION + EPSILON) {
                    this.leftFlipper.rotationSpeed = LEFT_FLIPPER_ROTATION_SPEED;
                } else {
                    this.leftFlipper.rotation = LEFT_FLIPPER_MAX_ROTATION;
                    this.leftFlipper.rotationSpeed = 0;

                }
            } else {
                if (this.leftFlipper.rotation < LEFT_FLIPPER_MIN_ROTATION) {
                    this.leftFlipper.rotationSpeed = - LEFT_FLIPPER_ROTATION_SPEED;
                } else {
                    this.leftFlipper.rotation = LEFT_FLIPPER_MIN_ROTATION;
                    this.leftFlipper.rotationSpeed = 0;
                }
            }

            if (this.leftFlipper.rotation < -10) {
                this.leftFlipper.changeAnimation("up");
            } else if (this.leftFlipper.rotation < 10) {

                this.leftFlipper.changeAnimation("middle");
            } else {
                this.leftFlipper.changeAnimation("down");
            }

        }
    }

    controlRightFlipper() {
        if (this.flippersEnabled) {
            if (kb.pressing(RIGHT_FLIPPER_KEY)) {
                if (this.rightFlipper.rotation < RIGHT_FLIPPER_MAX_ROTATION - EPSILON) {
                    this.rightFlipper.rotationSpeed = RIGHT_FLIPPER_ROTATION_SPEED;
                } else {
                    this.rightFlipper.rotation = RIGHT_FLIPPER_MAX_ROTATION;
                    this.rightFlipper.rotationSpeed = 0;
                }
            } else {
                if (this.rightFlipper.rotation > RIGHT_FLIPPER_MIN_ROTATION) {
                    this.rightFlipper.rotationSpeed = -RIGHT_FLIPPER_ROTATION_SPEED;
                } else {
                    this.rightFlipper.rotation = RIGHT_FLIPPER_MIN_ROTATION;
                    this.rightFlipper.rotationSpeed = 0;
                }
            }

            if (this.rightFlipper.rotation > 10) {
                this.rightFlipper.changeAnimation("up");
            } else if (this.rightFlipper.rotation > -10) {

                this.rightFlipper.changeAnimation("middle");
            } else {
                this.rightFlipper.changeAnimation("down");
            }
        }
    }


    disableFlippers() {
        this.flippersEnabled = false;

        this.rightFlipper.rotation = RIGHT_FLIPPER_MIN_ROTATION;
        this.leftFlipper.rotation = LEFT_FLIPPER_MIN_ROTATION;

    }

    enableFlippers() {
        this.flippersEnabled = true;
    }
}

function createTableFlippers() {
    return new Flippers(LEFT_FLIPPER_ROTATION_POINT_X, LEFT_FLIPPER_ROTATION_POINT_Y, RIGHT_FLIPPER_ROTATION_POINT_X, RIGHT_FLIPPER_ROTATION_POINT_Y);
}

function createBonusFlippers() {
    return new Flippers(BONUS_LEFT_FLIPPER_ROTATION_POINT_X, BONUS_LEFT_FLIPPER_ROTATION_POINT_Y, BONUS_RIGHT_FLIPPER_ROTATION_POINT_X, BONUS_RIGHT_FLIPPER_ROTATION_POINT_Y);
}
