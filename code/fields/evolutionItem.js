const EVOLUTION_TARGET_TIME_JUMP_INTERVAL = 750;
const EVOLUTION_TARGET_TIME_JUMP_HIGH_POSITION_TIME = 100;
const EVOLUTION_TARGET_HEIGHT_JUMP = 4;

class EvolutionItem {
    constructor(x, y) {
        this.sprite = new Sprite(x, y, 16, 16, "none");
        this.sprite.debug = DEBUG;
        this.sprite.layer = SCENARIO_LAYER;
        this.sprite.visible = false;
        this.sprite.addAni('evolutionMethods', Asset.getAnimation('evolutionMethods'));
        this.sprite.ani.frame = 0;
        this.sprite.ani.playing = false;
        this.baseY = y;

        this.baseY = y;
        this.lastJumpStart = 0;
        this.jumping = false;
        this.active = false;
        this.callback = () => { };
    }

    update(ballSprite, currentCaptureLevel) {
        if (!this.active) return;

        if (this.sprite.overlaps(ballSprite)) {
            this.callback && this.callback();
            this.setActive(false);
            if (currentCaptureLevel < 2) {
                Audio.playSFX('sfx44');
            } else {
                Audio.playSFX('sfx45');
            }
            return;
        }

        const now = millis();

        if (!this.jumping && (now - this.lastJumpStart) >= EVOLUTION_TARGET_TIME_JUMP_INTERVAL) {
            this.jumping = true;
            this.lastJumpStart = now;
            this.sprite.pos.y = this.baseY - EVOLUTION_TARGET_HEIGHT_JUMP;
        }

        if (this.jumping && (now - this.lastJumpStart) >= EVOLUTION_TARGET_TIME_JUMP_HIGH_POSITION_TIME) {
            this.sprite.pos.y = this.baseY;
            this.jumping = false;
        }
    }

    setActive(active, callback) {
        this.active = !!active;
        this.sprite.visible = !!active;
        this.callback = callback || (() => { });

        this.lastJumpStart = millis();
        this.jumping = false;
        if (!active) this.sprite.pos.y = this.baseY;
    }

    setEvolutionMethod(evolutionMethod) {
        switch (evolutionMethod) {
            case EVOLUTION_METHODS.EXPERIENCE: this.sprite.ani.frame = 0; break;
            case EVOLUTION_METHODS.THUNDER_STONE: this.sprite.ani.frame = 1; break;
            case EVOLUTION_METHODS.MOON_STONE: this.sprite.ani.frame = 2; break;
            case EVOLUTION_METHODS.FIRE_STONE: this.sprite.ani.frame = 3; break;
            case EVOLUTION_METHODS.LEAF_STONE: this.sprite.ani.frame = 4; break;
            case EVOLUTION_METHODS.WATER_STONE: this.sprite.ani.frame = 5; break;
            case EVOLUTION_METHODS.LINK_CABLE: this.sprite.ani.frame = 6; break;
            default: this.sprite.ani.frame = 0; break;
        }
    }
}