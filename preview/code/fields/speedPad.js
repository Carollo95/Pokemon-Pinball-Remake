
const SPEED_PUSH_MULTIPLIER = 2; 

class SpeedPad {

    constructor(x, y) {
        this.sprite = new Sprite(x, y, 1, 1, "none");
        this.sprite.debug = DEBUG;
        this.sprite.visible = false;
    }

    update(ball) {
        if (this.sprite.overlap(ball.sprite) && ball.sprite.velocity.y < 0) {
            ball.sprite.velocity.y *= SPEED_PUSH_MULTIPLIER;
        }
    }


}