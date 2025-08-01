let DEBUG = false;

let SCREEN_WIDTH = 384;
let SCREEN_HEIGHT = 556;

let GRAVITY = 10;
let EPSILON = 0.1;

let bg;

function disableSprite(sprite) {
    sprite.sleeping = true;
    sprite.physics = "none";

}

function enableSprite(sprite) {
    sprite.sleeping = false;
    sprite.physics = "static";
}
