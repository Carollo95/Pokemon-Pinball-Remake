const FLIPPER_LENGTH = 48; //Length of the flipper
const FLIPPER_WIDTH = 18; //Height of the flipper

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
const LEFT_FLIPPER_MAX_ROTATION = -21; //Max angle for the left flipper
const RIGHT_FLIPPER_MAX_ROTATION = LEFT_FLIPPER_MAX_ROTATION * -1; //Max angle for the right flipper

const RIGHT_FLIPPER_ROTATION_SPEED = 15; //Movement speed for the right flipper
const LEFT_FLIPPER_ROTATION_SPEED = RIGHT_FLIPPER_ROTATION_SPEED * -1; //Movement speed for the left flipper

const LEFT_FLIPPER_KEY = 'a'; //Key for the movemenet of the left flipper
const RIGHT_FLIPPER_KEY = 'l'; //Key for the movemenet of the right flipper

const LEFT_FLIPPER_OFFSET = 14;//Offset of the left flipper animation
const RIGHT_FLIPPER_OFFSET = -14; //Offset of the right flipper animation

const FLIPPER_SFX_PLAY_COOLDOWN = 200; //Cooldown betwen flipper sfx plays to avoid spamming


class Flippers {
    constructor(leftFlipperRotationPointX, leftFlipperRotationPointY, rightFlipperRotationPointX, rightFlipperRotationPointY) {
        this.flippersEnabled = true;

        this.createHtmlButtonControls();

        this.createLeftFlipper(leftFlipperRotationPointX, leftFlipperRotationPointY);
        this.createRightFlipper(rightFlipperRotationPointX, rightFlipperRotationPointY);

    }

    createHtmlButtonControls() {
        leftFlipperButton.addEventListener("mousedown", () => {
            this.leftFlipperButtonPressed = true;
        });
        leftFlipperButton.addEventListener("mouseup", () => {
            this.leftFlipperButtonPressed = false;
        });
        leftFlipperButton.addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.leftFlipperButtonPressed = true;
        }, { passive: false });
        leftFlipperButton.addEventListener("touchend", (e) => {
            e.preventDefault();
            this.leftFlipperButtonPressed = false;
        }, { passive: false });

        document.addEventListener("mouseup", () => {
            this.leftFlipperButtonPressed = false;
            this.rightFlipperButtonPressed = false;
        });
        document.addEventListener("touchend", () => {
            this.leftFlipperButtonPressed = false;
            this.rightFlipperButtonPressed = false;
        });


        rightFlipperButton.addEventListener("mousedown", () => {
            this.rightFlipperButtonPressed = true;
        });
        rightFlipperButton.addEventListener("mouseup", () => {
            this.rightFlipperButtonPressed = false;
        });
        rightFlipperButton.addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.rightFlipperButtonPressed = true;
        }, { passive: false });
        rightFlipperButton.addEventListener("touchend", (e) => {
            e.preventDefault();
            this.rightFlipperButtonPressed = false;
        }, { passive: false });
    }

    createLeftFlipper(leftFlipperRotationPointX, leftFlipperRotationPointY) {
        this.leftFlipper = new Sprite(leftFlipperRotationPointX, leftFlipperRotationPointY, FLIPPER_LENGTH, FLIPPER_WIDTH, 'kinematic');
        this.leftFlipper.rotation = LEFT_FLIPPER_MIN_ROTATION;
        this.leftFlipper.debug = DEBUG;
        this.leftFlipper.offset.x = LEFT_FLIPPER_OFFSET;

        this.leftFlipper.addAnimation("up", animLeftFlipperUp);
        this.leftFlipper.addAnimation("middle", animLeftFlipperMiddle);
        this.leftFlipper.addAnimation("down", animLeftFlipperDown);
        this.leftFlipper.addAnimation("down_disabled", animLeftFlipperDownDisabled);
        this.leftFlipper.draw = function () { rotateFlipperAnimation(this, LEFT_FLIPPER_MIN_ROTATION, LEFT_FLIPPER_MAX_ROTATION, LEFT_FLIPPER_OFFSET); }

        this.hasLeftFlipperBeenLowered = true;
    }

    createRightFlipper(rightFlipperRotationPointX, rightFlipperRotationPointY) {
        this.rightFlipper = new Sprite(rightFlipperRotationPointX, rightFlipperRotationPointY, FLIPPER_LENGTH, FLIPPER_WIDTH, 'kinematic');
        this.rightFlipper.rotation = RIGHT_FLIPPER_MIN_ROTATION;
        this.rightFlipper.debug = DEBUG;
        this.rightFlipper.offset.x = RIGHT_FLIPPER_OFFSET;

        this.rightFlipper.addAnimation("up", animRightFlipperUp);
        this.rightFlipper.addAnimation("middle", animRightFlipperMiddle);
        this.rightFlipper.addAnimation("down", animRightFlipperDown);
        this.rightFlipper.addAnimation("down_disabled", animRightFlipperDownDisabled);
        this.rightFlipper.draw = function () { rotateFlipperAnimation(this, RIGHT_FLIPPER_MIN_ROTATION, RIGHT_FLIPPER_MAX_ROTATION, RIGHT_FLIPPER_OFFSET); }

        this.hasRightFlipperBeenLowered = true;
    }

    update() {
        this.controlLeftFlipper();
        this.controlRightFlipper();
    }

    controlLeftFlipper() {
        if (this.flippersEnabled) {
            if (this.isLeftFlipperAction()) {
                this.liftLeftFlipper();
            } else {
                this.lowerLeftFlipper();
            }
            this.playLeftFLipperSFX();
            this.changeLeftFlipperAnimation();
        }
    }

    isLeftFlipperAction() {
        return kb.pressing(LEFT_FLIPPER_KEY) || this.leftFlipperButtonPressed;
    }

    liftLeftFlipper() {
        this.shouldPlayFlipperSFX = true;
        if (this.leftFlipper.rotation > LEFT_FLIPPER_MAX_ROTATION + EPSILON) {
            this.leftFlipper.rotationSpeed = LEFT_FLIPPER_ROTATION_SPEED;
        } else {
            this.leftFlipper.rotation = LEFT_FLIPPER_MAX_ROTATION;
            this.leftFlipper.rotationSpeed = 0;

        }
    }

    lowerLeftFlipper() {
        if (this.leftFlipper.rotation < LEFT_FLIPPER_MIN_ROTATION) {
            this.leftFlipper.rotationSpeed = - LEFT_FLIPPER_ROTATION_SPEED;
        } else {
            this.leftFlipper.rotation = LEFT_FLIPPER_MIN_ROTATION;
            this.leftFlipper.rotationSpeed = 0;
        }
    }

    changeLeftFlipperAnimation() {
        if (this.leftFlipper.rotation < -10) {
            this.leftFlipper.changeAnimation("up");
        } else if (this.leftFlipper.rotation < 10) {
            this.leftFlipper.changeAnimation("middle");
        } else {
            this.leftFlipper.changeAnimation("down");
        }
    }

    disableLeftFlipper() {
        this.leftFlipper.rotation = LEFT_FLIPPER_MIN_ROTATION;
        this.leftFlipper.changeAnimation("down_disabled");
        this.leftFlipper.rotationSpeed = 0;
    }

    playLeftFLipperSFX() {
        if (this.leftFlipper.rotation == LEFT_FLIPPER_MIN_ROTATION) {
            this.hasLeftFlipperBeenLowered = true;

        } else if (this.hasLeftFlipperBeenLowered == true && this.leftFlipper.rotation > 0) {
            this.hasLeftFlipperBeenLowered = false;
            sfx0C.play();
        }
    }

    controlRightFlipper() {
        if (this.flippersEnabled) {
            if (this.isRightFlipperActive()) {
                this.liftRightFlipper();
            } else {
                this.lowerRightFlipper();
            }
            this.playRightFlipperSFX();
            this.changeActiveRightFlipperAnimation();
        }
    }

    isRightFlipperActive() {
        return kb.pressing(RIGHT_FLIPPER_KEY) || this.rightFlipperButtonPressed;
    }

    liftRightFlipper() {
        if (this.rightFlipper.rotation < RIGHT_FLIPPER_MAX_ROTATION - EPSILON) {
            this.rightFlipper.rotationSpeed = RIGHT_FLIPPER_ROTATION_SPEED;
        } else {
            this.rightFlipper.rotation = RIGHT_FLIPPER_MAX_ROTATION;
            this.rightFlipper.rotationSpeed = 0;
        }
    }

    lowerRightFlipper() {
        if (this.rightFlipper.rotation > RIGHT_FLIPPER_MIN_ROTATION) {
            this.rightFlipper.rotationSpeed = -RIGHT_FLIPPER_ROTATION_SPEED;
        } else {
            this.rightFlipper.rotation = RIGHT_FLIPPER_MIN_ROTATION;
            this.rightFlipper.rotationSpeed = 0;
        }
    }

    changeActiveRightFlipperAnimation() {
        if (this.rightFlipper.rotation > 10) {
            this.rightFlipper.changeAnimation("up");
        } else if (this.rightFlipper.rotation > -10) {

            this.rightFlipper.changeAnimation("middle");
        } else {
            this.rightFlipper.changeAnimation("down");
        }
    }

    disableRightFlipper() {
        this.rightFlipper.rotation = RIGHT_FLIPPER_MIN_ROTATION;
        this.rightFlipper.changeAnimation("down_disabled");
        this.rightFlipper.rotationSpeed = 0;
    }

    playRightFlipperSFX() {
        if (this.rightFlipper.rotation == RIGHT_FLIPPER_MIN_ROTATION) {
            this.hasRightFlipperBeenLowered = true;

        } else if (this.hasRightFlipperBeenLowered == true && this.rightFlipper.rotation < 0) {
            this.hasRightFlipperBeenLowered = false;
            sfx0C.play();
        }
    }


    disableFlippers() {
        this.flippersEnabled = false;

        this.disableRightFlipper();
        this.disableLeftFlipper();
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

function rotateFlipperAnimation(flipper, minFlipperRotation, maxFlipperRotation, flipperOffset) {
    if (DEBUG) {
        stroke(255, 0, 0);
        noFill();
        rectMode(CENTER);
        rect(flipper._offset._x, flipper._offset._y, flipper.width, flipper._h);
    }

    if (flipper.animation.name == "down" || flipper.animation.name == "down_disabled") {
        rotate(-minFlipperRotation);
    } else if (flipper.animation.name == "middle") {
        rotate(0);
    } else {
        rotate(-maxFlipperRotation);
    }
    flipper.animation.draw(flipperOffset, -2);


}