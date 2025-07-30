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

function createFlippers(){

  leftFlipper = new Sprite(LEFT_FLIPPER_ROTATION_POINT_X, LEFT_FLIPPER_ROTATION_POINT_Y, FLIPPER_LENGTH, FLIPPER_WIDTH, 'kinematic');
  leftFlipper.rotation = 35;
  leftFlipper.debug = DEBUG;
  leftFlipper.offset.x = 14;

  rightFlipper = new Sprite(RIGHT_FLIPPER_ROTATION_POINT_X, RIGHT_FLIPPER_ROTATION_POINT_Y, FLIPPER_LENGTH, FLIPPER_WIDTH, 'kinematic');
  rightFlipper.rotation = -35
  rightFlipper.debug = DEBUG;
  rightFlipper.offset.x = -14;

  // To prevent the flipper of doing full 360s
  leftFlipper.body.setFixedRotation(true);
  rightFlipper.body.setFixedRotation(true);

}

function draw() {
  background(bg);

 
  if (kb.pressing('l')) {
    if (rightFlipper.rotation < 15) rightFlipper.rotation += 15;
  } else {
    if (rightFlipper.rotation > -35) rightFlipper.rotation -= 15;
  }


  if (kb.pressing('a')) {
    if (leftFlipper.rotation > -15) leftFlipper.rotation -= 15;
  } else {
    if (leftFlipper.rotation < 35) leftFlipper.rotation += 15;
  }
}
