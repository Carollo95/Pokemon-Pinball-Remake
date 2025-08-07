let DEBUG = true; //true to start the game on debug mode

const SCREEN_WIDTH = 384; //Widht of the canvas
const SCREEN_HEIGHT = 556; //Height of the canvas

const DEFAULT_ANIMATION_DELAY = 12; //Delay between frames of animation

GRAVITY = 10; //The gravity applied to the game
const EPSILON = 0.1; //Marging for physics calculation (Avoids jittering)

function disableSprite(sprite) {
    sprite.sleeping = true;
    sprite.physics = "none";
}

function startShake(){
    stage.startShake();
}

function enableSprite(sprite) {
    sprite.sleeping = false;
    sprite.physics = "static";
}
function getImage(name) {
    let image = loadImage(name + ".png");
    if (DEBUG) {
        image.filter(GRAY);
    }
    return image;
}

function getAnimation(name, frameHeight, frameWidth, imageNum, delay) {
    let sheet = getImage(name);
    let animation = loadAnimation(sheet, { frameSize: [frameHeight, frameWidth], frameCount: imageNum });
    animation.frameDelay = delay;

    return animation;
}
