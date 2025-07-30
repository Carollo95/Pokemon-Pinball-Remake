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

  controlFlipper(
    leftFlipper,
    'a',
    LEFT_FLIPPER_MIN_ROTATION,
    LEFT_FLIPPER_MAX_ROTATION,
    LEFT_FLIPPER_ROTATION_SPEED,
    EPSILON
  );

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
