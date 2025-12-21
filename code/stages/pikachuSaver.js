const PIKACHU_LEFT_POSITION_X = 32;
const PIKACHU_RIGHT_POSITION_X = 294;

const PIKACHU_ANIMATION_LENGTH = 2000;

class PikachuSaver {

    constructor() {
        this.sprite = new Sprite(PIKACHU_LEFT_POSITION_X, 506, 32, 32, 'none');
        this.sprite.debug = DEBUG;
        this.sprite.layer = SCENARIO_LAYER;

        this.sprite.addAnimation('hurt', Asset.getAnimation('pikachuSaverHurt'));
        this.sprite.addAnimation('idle', Asset.getAnimation('pikachuSaverIdle'));

        this.isCharged = false;
        this.superCharged = false;

        this.animationStart = -10000;
        this.inAnimation = false;

    }

    update(ball) {
        if (millis() - this.animationStart < PIKACHU_ANIMATION_LENGTH) {
            this.sprite.changeAnimation('hurt')
            return;
        }

        if (this.sprite.overlapping(ball.sprite)) {
            this.sprite.changeAnimation('hurt')
            if (this.inAnimation) {
                this.inAnimation = false;
                this.isCharged = false;
                ball.launchFromGutter();
                this.sprite.changeAnimation('idle');
            } else if (this.isCharged) {
                ball.stop();
                this.animationStart = millis();
                this.inAnimation = true;
            } else {
                this.sprite.ani.onComplete = () => {
                    this.sprite.changeAnimation('idle');
                }
            }
        }
    }

    charge() {
        this.isCharged = true;
    }

    superCharge() {
        this.isSupercharged = true;
    }

    moveLeft() {
        this.sprite.pos.x = PIKACHU_LEFT_POSITION_X;
    }

    moveRight() {
        this.sprite.pos.x = PIKACHU_RIGHT_POSITION_X;
    }
}