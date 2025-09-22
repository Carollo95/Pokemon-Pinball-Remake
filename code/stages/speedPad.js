
const SPEED_PUSH_MULTIPLIER = 2; 

class SpeedPad {

    constructor(x, y) {
        this.sprite = new Sprite(x, y, 1, 1, "none");
    }

    update(ball) {
        if (this.sprite.overlap(ball.sprite) && ball.sprite.velocity.y < 0) {
            ball.sprite.velocity.y *= SPEED_PUSH_MULTIPLIER;
            console.log("PUSH");
        }
    }


}