const PIKACHU_LEFT_POSITION_X = 32;
const PIKACHU_RIGHT_POSITION_X = 294;

class PikachuSaver {

    constructor() {
        this.sprite = new Sprite(PIKACHU_LEFT_POSITION_X, 506, 32, 32, 'none');
        this.sprite.debug = DEBUG;
        this.sprite.layer = SCENARIO_LAYER;

        this.sprite.addAnimation('idle', Asset.getAnimation('pikachuSaverIdle'));

        this.isCharged = false;
        this.superCharged = false;

    }

    update(ballSprite) {

    }

    charge(){
        this.isCharged = true;
    }

    superCharge(){
        this.isSupercharged = true;
    }

    moveLeft() {
        this.sprite.pos.x = PIKACHU_LEFT_POSITION_X;
    }

    moveRight() {
        this.sprite.pos.x = PIKACHU_RIGHT_POSITION_X;
    }
}