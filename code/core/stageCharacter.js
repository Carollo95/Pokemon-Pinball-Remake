const CHAR_SIZE = 16;
const SEPARATOR_SIZE = 4;

const LETTERS = 'abcdefghijklmnopqrstuvwxyzé';
const NUMBERS = '1234567890';

const CHAR_TYPE ={
    CHAR:CHAR_SIZE,
    SEPARATOR:SEPARATOR_SIZE
}

class StageCharacter {

    constructor(x, y, size = CHAR_SIZE) {
        this.sprite = new Sprite(x, y, size, CHAR_SIZE, "none");

        if (size === CHAR_SIZE) {
            for (const ch of LETTERS) {
                this.sprite.addAnimation('$' + ch, Asset.getAnimation('stageText' + ch.toUpperCase()));
            }

            for (const ch of NUMBERS) {
                this.sprite.addAnimation('$' + ch, Asset.getAnimation('stageText' + ch.toUpperCase()));
            }

            this.sprite.addAnimation('$ª', Asset.getAnimation('stageTextPokemon'));
            this.sprite.addAnimation('$º', Asset.getAnimation('stageTextBall'));
            this.sprite.addAnimation('$/', Asset.getAnimation('stageTextThunder'));
            this.sprite.addAnimation('$ ', Asset.getAnimation('stageTextSpace'));
            this.sprite.addAnimation('$$', Asset.getAnimation('stageTextDot'));
            this.sprite.addAnimation('$`', Asset.getAnimation('stageTextApostrophe'));
            this.sprite.addAnimation('$!', Asset.getAnimation('stageTextExcl'));
            this.sprite.addAnimation('$:', Asset.getAnimation('stageTextColon'));
            this.sprite.addAnimation('$>', Asset.getAnimation('stageTextRight'));
            this.sprite.addAnimation('$*', Asset.getAnimation('stageTextStar'));
            this.sprite.addAnimation('$ ', Asset.getAnimation('stageTextSpace'));
        } else {
            this.sprite.addAnimation('$,', Asset.getAnimation('stageTextCommaSeparator'));
            this.sprite.addAnimation('$ ', Asset.getAnimation('stageTextSeparator'));
        }

        this.sprite.debug = DEBUG;
        this.sprite.layer = HUD_LAYER;
    }

    changeAnimation(animName) {
        this.sprite.changeAnimation(animName);

    }

    getAni() {
        return this.sprite.ani
    }

    setVisible(visible) {
        this.sprite.visible = visible;
    }

    remove(){
        this.sprite.remove();
    }

}