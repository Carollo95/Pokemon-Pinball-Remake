DUGTRIO_WIDTH = 58a; //Width of the Dugtrio hitbox
DUGTRIO_HEIGHT = 58; //Height of the Dugtrio hitbox

DIGLETT_TIME_OF_HURT = 500;

class Dugtrio {
    timeOfHurt = 0;
    disabled = false;
    phase = 1;

    sprite;
    constructor(x, y) {
        this.sprite = new Sprite(x, y, DUGTRIO_WIDTH, DUGTRIO_HEIGHT, "static");
        this.sprite.debug = DEBUG;

        this.sprite.addAnimation("idle1", animDugtrio1);
        this.sprite.addAnimation("hurt1", animDugtrio1Hurt)

        this.sprite.visible = false;
    }

    spawn() {
        this.sprite.visible = true;
        this.sprite.changeAnimation("idle1");
    }

    update(ballSprite) {
        if (!this.disabled) {
            if (this.timeOfHurt == 0) {
                this.checkCollision(ballSprite);
            } else {
                if (this.isHurtTimeFinished()) {
                    this.sprite.changeAnimation("hurt" + phase)
                }
            }
        }
    }

    checkCollision(ballSprite) {
        if (this.sprite.collide(ballSprite)) {
            this.sprite.changeAnimation("hurt" + phase)
            phase ++;
            this.sfx36.play();
            this.timeOfHurt = millis();
        }
    }

    isHurtTimeFinished() {
        return (millis() - this.timeOfHurt) > DIGLETT_TIME_OF_HURT
    }

    disableSprite() {
        disableSprite(this.sprite);
        this.sprite.visible = false;
        this.timeOfDissapearance = millis();
        this.disabled = true;
    }

}