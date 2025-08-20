const SHAKE_STRENGTH = 4; //Strenght of the screen shake

class Stage {
    constructor() {
        this.shakeDuration = 0;
        world.gravity.y = GRAVITY;
    }

    drawBackground() {
        background(this.bg);
    }

    replaceBackground(image) {
        this.bg = image;
    }

    startShake() {
        this.shakeDuration = 20;
    }

    shake() {
        if (this.shakeDuration > 0) {
            let displacement = random(-SHAKE_STRENGTH, SHAKE_STRENGTH)
            translate(0, displacement);
            image(this.bg, 0, displacement, width, height);

            this.shakeDuration--;
        }
    }

    draw() {
        this.drawBackground();
        this.shake();
    }
}