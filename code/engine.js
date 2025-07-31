let DEBUG = false;

let SCREEN_WIDTH = 384;
let SCREEN_HEIGHT = 556;

let GRAVITY = 10;
let EPSILON = 0.1;

let bg;

function disableScript(script) {
    script.sleeping = true;
    script.physics = "none";

}

function enableScript(script) {
    script.sleeping = false;
    script.physics = "static";
}
