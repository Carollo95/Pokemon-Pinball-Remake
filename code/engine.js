let DEBUG = false;

const SCREEN_WIDTH = 384;
const SCREEN_HEIGHT = 556;

const ANIMATION_DELAY = 12;

const GRAVITY = 10;
const EPSILON = 0.1;

let bg;

function disableSprite(sprite) {
    sprite.sleeping = true;
    sprite.physics = "none";
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

function replaceBackground(name) {
    bg = getImage(name);
}

function getAnimation(name, frameHeight, frameWidth, imageNum){
        let sheet = loadImage(name);
        let animation = loadAnimation(sheet, {frameSize: [frameHeight, frameWidth], frameCount: imageNum});
        animation.frameDelay = ANIMATION_DELAY;

        return animation;
}