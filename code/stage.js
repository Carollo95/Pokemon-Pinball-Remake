const SHAKE_STRENGTH = 4; //Strenght of the screen shake

class Stage {
    bg;
    shakeDuration;
    flippers;
    ball;

    constructor() {
        this.shakeDuration = 0;
    }

    drawBackground() {
        background(this.bg);
    }

    replaceBackground(name) {
        this.bg = getImage(name);
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