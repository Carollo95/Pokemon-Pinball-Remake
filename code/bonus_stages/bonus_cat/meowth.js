const MEOWTH_HITBOX_WIDTH = 20; //Width fo the meowth hitbox
const MEOWTH_HITBOX_HEIGHT = 20; //Height fo the meowth hitbox

const MEOWTH_SPEED = 2; //Speed at which meowth walks across the screen
const MEOWTH_MIN_HORIZONTAL_MOVEMENT = 80;
const MEOWTH_MAX_HORIZONTAL_MOVEMENT = 290;

const MEOWTH_HIGH_POS = 160;
const MEOWTH_LOW_POS = 230;

class Meowth {

    keepMovingRight = true;

    sprite;

    constructor() {
        this.sprite = new Sprite(MEOWTH_MIN_HORIZONTAL_MOVEMENT, MEOWTH_HIGH_POS, MEOWTH_HITBOX_WIDTH, MEOWTH_HITBOX_HEIGHT, "static");
        this.sprite.debug = DEBUG;

        this.sprite.addAnimation("walk", animMeowthWalk);
        this.sprite.mirror.x = true;
    }

    update() {
        this.moveXAxis();

        if(this.isRandomChangeOfHorizontalDirection()){
            this.changeHorizontalDirection();
        }
    }

    moveXAxis() {
        if (this.keepMovinRight) {
            this.sprite.pos.x += MEOWTH_SPEED;
            if (this.sprite.pos.x > MEOWTH_MAX_HORIZONTAL_MOVEMENT) {
                this.changeHorizontalDirection();
            }
        } else {
            this.sprite.pos.x -= MEOWTH_SPEED;
            if (this.sprite.pos.x < MEOWTH_MIN_HORIZONTAL_MOVEMENT) {
                this.changeHorizontalDirection();
            }
        }
    }

    changeHorizontalDirection(){
        this.keepMovinRight = !this.keepMovinRight;
        this.sprite.mirror.x = !this.sprite.mirror.x;
    }

    isRandomChangeOfHorizontalDirection(){
        return random(0,1000) > 995;
    }

}