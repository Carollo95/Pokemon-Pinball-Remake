let ball;
let leftFlipper, rightFlipper;

let bg;



function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);

  bg = loadImage('assets/img/background_test.png');

  createBall();
  createFlippers()

  world.gravity.y = GRAVITY;

  new Sprite(400, 580, 800, 40, 'static'); // Remove just a test
}

function createBall() {
  ball = new Sprite();
  ball.x = 150;
  ball.y = 250;
  ball.diameter = BALL_DIAMETER;
  ball.debug = DEBUG;
}

function createFlippers() {

  leftFlipper = new Sprite(LEFT_FLIPPER_ROTATION_POINT_X, LEFT_FLIPPER_ROTATION_POINT_Y, FLIPPER_LENGTH, FLIPPER_WIDTH, 'kinematic');
  leftFlipper.rotation = LEFT_FLIPPER_MIN_ROTATION;
  leftFlipper.debug = DEBUG;
  leftFlipper.offset.x = 14;

  rightFlipper = new Sprite(RIGHT_FLIPPER_ROTATION_POINT_X, RIGHT_FLIPPER_ROTATION_POINT_Y, FLIPPER_LENGTH, FLIPPER_WIDTH, 'kinematic');
  rightFlipper.rotation = RIGHT_FLIPPER_MIN_ROTATION;
  rightFlipper.debug = DEBUG;
  rightFlipper.offset.x = -14;

  // To prevent the flipper of doing full 360s
  leftFlipper.body.setFixedRotation(true);
  rightFlipper.body.setFixedRotation(true);

}

function draw() {
  background(bg);

  if (kb.pressing('l')) {
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


  if (kb.pressing('a')) {
    if (leftFlipper.rotation > LEFT_FLIPPER_MAX_ROTATION + EPSILON) {
      leftFlipper.rotationSpeed = LEFT_FLIPPER_ROTATION_SPEED;
    }else {
      leftFlipper.rotation = LEFT_FLIPPER_MAX_ROTATION;
      leftFlipper.rotationSpeed = 0;
    }
  } else {
    if (leftFlipper.rotation < LEFT_FLIPPER_MIN_ROTATION) {
      leftFlipper.rotationSpeed = - LEFT_FLIPPER_ROTATION_SPEED;
    }else {
      leftFlipper.rotation = LEFT_FLIPPER_MIN_ROTATION;
      leftFlipper.rotationSpeed = 0;
    }
  }
}
