
const SPEED_PUSH_MULTIPLIER = 2;

class SpeedPad {

    constructor(x, y, multiplierY = SPEED_PUSH_MULTIPLIER, multiplierX = 1) {
        this.sprite = new Sprite(x, y, 1, 1, "none");
        this.sprite.debug = DEBUG;
        this.sprite.visible = false;
        this.multiplierY = multiplierY;
        this.multipierX = multiplierX;
    }

    update(ball) {
        if (this.sprite.overlap(ball.sprite) && ball.sprite.velocity.y < 0) {
            ball.sprite.velocity.y = Math.max(ball.sprite.velocity.y * this.multiplierY, -10);
            ball.sprite.velocity.x *= this.multipierX;
        }
    }


}