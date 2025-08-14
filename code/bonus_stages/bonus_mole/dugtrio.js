DUGTRIO_WIDTH = 58; //Width of the Dugtrio hitbox
DUGTRIO_HEIGHT = 58; //Height of the Dugtrio hitbox

DUGTRIO_TIME_OF_HURT = 500;

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
        this.sprite.addAnimation("idle2", animDugtrio2);
        this.sprite.addAnimation("hurt2", animDugtrio2Hurt)
        this.sprite.addAnimation("idle3", animDugtrio3);
        this.sprite.addAnimation("hurt3", animDugtrio3Hurt)
        this.sprite.addAnimation("idle4", animDugtrio4);
        this.sprite.addAnimation("hurt4", animDugtrio4Hurt)

        this.sprite.visible = false;
        disableSprite(this.sprite);
    }

    spawn() {
        enableSprite(this.sprite);
        this.sprite.visible = true;
        this.sprite.changeAnimation("idle1");
    }

    update(ballSprite) {
        if (!this.disabled) {
            if (this.isHurtTimeFinished()) {
                if (this.phase == 4) {
                    this.phase++;
                    this.timeOfHurt = millis();
                    this.sprite.changeAnimation("idle4");
                } else if (this.phase == 5) {
                    this.disableSprite();
                } else {
                    this.sprite.changeAnimation("idle" + this.phase);
                    this.checkCollision(ballSprite);
                }
            }
        }
    }

    checkCollision(ballSprite) {
        if (this.sprite.collide(ballSprite)) {
            this.sprite.changeAnimation("hurt" + this.phase)
            this.phase++;
            sfx36.play();
            this.timeOfHurt = millis();
        }
    }

    isHurtTimeFinished() {
        return (millis() - this.timeOfHurt) > DUGTRIO_TIME_OF_HURT
    }

    disableSprite() {
        disableSprite(this.sprite);
        this.sprite.visible = false;
        this.timeOfDissapearance = millis();
        this.disabled = true;
    }

}