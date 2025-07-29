let ball;

function setup() {
  createCanvas(320, 576);

  ball = new Sprite();
  ball.x = 150;
  ball.y = 250;
  ball.diameter = 16;

  world.gravity.y = 10;

  new Sprite(400, 580, 800, 40, 'static'); // Remove just a test
}

function draw() {
  background(200);
}
