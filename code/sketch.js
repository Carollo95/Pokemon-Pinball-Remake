let bg;

function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);

  bg = loadImage('assets/img/bonus-ghost/bonus_ghost_background.png');

  createBall(150, 250);
  createBonusFlippers()

  world.gravity.y = GRAVITY;

}


function draw() {
  background(bg);

  controlLeftFlipper();
  controlRightFlipper();
}