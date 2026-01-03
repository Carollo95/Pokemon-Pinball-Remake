const SLOT_TIME_PER_SPIN_FRAME = 300;
const SLOT_TIME_SLOW_DOWN_FRAME_RATE = 200;
const SLOT_SLOW_DOWN_MAX = 1000;

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

const SLOT_STATUS = {
    SPINNING: 0,
    STOPPED: 1
}

class ScreenSlot {
    constructor() {
        this.sprite = new Sprite(160, 364, 96, 64, "none");
        this.sprite.debug = DEBUG;
        this.sprite.layer = SCENARIO_LAYER;
        for (let i = 0; i < 18; i++) {
            this.sprite.addAnimation("slots" + i, Asset.getAnimation('slots' + i));
        }
        for (let i = 1; i <= 5; i++) {
            this.sprite.addAnimation("multi" + i, Asset.getAnimation('multi' + i));
        }
        for (let i = 1; i <= 9; i++) {
            this.sprite.addAnimation("big" + i, Asset.getAnimation('big' + i));
        }
        this.sprite.addAnimation("slotsBW", Asset.getAnimation('slotsBW'));
        this.sprite.ani.playing = false;

        this.spinTimer = new EventTimer(SLOT_TIME_PER_SPIN_FRAME);
        this.slotPhaseTimer = new EventTimer(1000);
        this.slotRewardTimer = new EventTimer(2000);
        this.index = 0;
        this.validIndexes = [];
        this.slowDown = false;

        this.status = SLOT_STATUS.STOPPED;

    }

    show(visible) {
        this.sprite.visible = visible;
    }

    update(ballSprite) {
        if (this.status === SLOT_STATUS.SPINNING && this.spinTimer.hasElapsed()) {
            this.index = (this.index + 1) % this.validIndexes.length;
            let pos = this.validIndexes[this.index];
            this.sprite.ani.frame = pos;
            this.spinTimer.restart();

            if (this.slowDown) {
                this.spinTimer.addToInterval(SLOT_TIME_SLOW_DOWN_FRAME_RATE);

                if (this.spinTimer.timeAdded >= SLOT_SLOW_DOWN_MAX) {
                    this.status = SLOT_STATUS.STOPPED;
                    this.slotPhaseTimer.restart();
                    this.slotRewardTimer.restart();
                    this.sprite.changeAni("slots" + (pos));
                }
            }
        } else if (this.status === SLOT_STATUS.STOPPED) {
            let pos = this.validIndexes[this.index];
            if (this.stoppedHasSecondPhase(pos) && this.slotPhaseTimer.hasElapsed()) {
                this.changePhase(pos);
            } else if (this.slotRewardTimer.hasElapsed()) {

            }
        }
    }

    callAction(actionNuber) {
        switch (actionNuber) {
            case SLOT_STATES.SMALL:
                smallAction();
                break;
            default:
                break;
        }
    }

    startSlowingDown() {
        this.slowDown = true;
    }

    startSlotMachine() {
        this.sprite.changeAnimation("slotsBW");
        this.slowDown = false;
        this.validIndexes = this.selectValidSlots();
        this.status = SLOT_STATUS.SPINNING;
        this.spinTimer.restart();
        this.spinTimer.restartTimeAdded();
    }

    selectValidSlots() {
        //TODO add some logic here
        return [SLOT_STATES.BONUS_MULTIPLIER];
    }

    smallAction() {

    }

    stoppedHasSecondPhase(slot) {
        return slot === SLOT_STATES.SMALL || slot === SLOT_STATES.BIG || slot === SLOT_STATES.BONUS_MULTIPLIER;
    }

    changePhase(slot) {
        switch (slot) {
            case SLOT_STATES.SMALL:
                break;
            case SLOT_STATES.BIG:
                this.sprite.changeAni("big5");//TODO set random
                break;
            case SLOT_STATES.BONUS_MULTIPLIER:
                this.sprite.changeAni("multi2");//TODO set random
                break;
            default:
                break;
        }
    }

}