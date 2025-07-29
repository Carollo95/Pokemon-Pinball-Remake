let ball;
let leftFlipper, rightFlipper;

let BALL_DIAMETER = 32;

let FLIPPER_LENGTH = 48;
let FLIPPER_WIDTH = 18

let LEFT_FLIPPER_ROTATION_POINT_X = 114;
let LEFT_FLIPPER_ROTATION_POINT_Y = 516;


function setup() {
  createCanvas(320, 576);

  createBall();
  createFlippers()

  world.gravity.y = 10;

  new Sprite(400, 580, 800, 40, 'static'); // Remove just a test
}

function createBall() {
  ball = new Sprite();
  ball.x = 150;
  ball.y = 250;
  ball.diameter = BALL_DIAMETER;
}

function createFlippers(){

  leftFlipper = new Sprite(114, 516, FLIPPER_LENGTH, FLIPPER_WIDTH, 'kinematic');
  leftFlipper.rotation = 30;

  rightFlipper = new Sprite(174, 516, FLIPPER_LENGTH, FLIPPER_WIDTH, 'kinematic');
  rightFlipper.rotation = 30;

  // To prevent the flipper of doing full 360s
  leftFlipper.body.setFixedRotation(true);
  rightFlipper.body.setFixedRotation(true);

}

function draw() {
  background(200);


  if (kb.pressing('a')) {
    if (rightFlipper.rotation < 30) rightFlipper.rotation += 30;
  } else {
    if (rightFlipper.rotation > -30) rightFlipper.rotation -= 30;
  }


  if (kb.pressing('l')) {
    if (leftFlipper.rotation > -30) leftFlipper.rotation -= 30;
  } else {
    if (leftFlipper.rotation < 30) leftFlipper.rotation += 30;
  }
}
