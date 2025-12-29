const SLOT_STATES = {
    SMALL: 0,
    BIG: 1,
    BONUS_MULTIPLIER: 2,
    SMALL_SAVER: 3,
    GREAT_SAVER: 4,
    ULTRA_SAVER: 5,
    PIKACHU: 6,
    GREAT_UPGRADE: 7,
    ULTRA_UPGRADE: 8,
    MASTER_UPGRADE: 9,
    EXTRA_BALL: 10,
    CATCHEM_STARTER: 11,
    EVOLUTION_STARTER: 12,
    GO_TO_BONUS_DUGTRIO: 13,
    GO_TO_BONUS_GASTLY: 14,
    GO_TO_BONUS_MEOWTH: 15,
    GO_TO_BONUS_SEAL: 16,
    GO_TO_BONUS_MEWTWO: 17
}

class ScreenSlot {
    constructor() {
        this.sprite = new Sprite(160, 364, 96, 64, "none");
        this.sprite.debug = DEBUG;
        this.sprite.layer = SCENARIO_LAYER;
        this.sprite.addAnimation("slotsBW", Asset.getAnimation('slotsBW'));
        this.sprite.ani.playing = false;
        
        this.spinTimer = new EventTimer(500);
        this.index = 0;
        this.validIndexes = [];

    }

    show(visible) {
        this.sprite.visible = visible;
    }

    update(ballSprite) {
        if (this.spinTimer.hasElapsed()) {
            this.index = (this.index + 1) % this.validIndexes.length;
            this.sprite.ani.frame = this.index;
            this.spinTimer.restart();
        }
    }

    startSlotMachine() {
        this.sprite.changeAnimation("slotsBW");
        this.validIndexes = this.selectValidSlots();
        this.spinTimer.restart();
    }

    selectValidSlots() {
        //TODO add some logic here
        return [0, 3, 8];
    }

}