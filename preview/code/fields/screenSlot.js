const SLOT_TIME_PER_SPIN_FRAME = 100;
const SLOT_TIME_SLOW_DOWN_FRAME_RATE = 80;
const SLOT_SLOW_DOWN_MAX = 700;

const SLOT_REWARD_TIME = 4000;
const SLOT_PHASE_TIME = SLOT_REWARD_TIME / 2

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
    GO_TO_BONUS_SEEL: 16,
    GO_TO_BONUS_MEWTWO: 17
}

const SLOT_STATUS = {
    SPINNING: 0,
    STOPPED: 1
}

class ScreenSlot {
    constructor(slotFinishCallback) {
        this.slotFinishCallback = slotFinishCallback;
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
            this.sprite.addAnimation("small" + i, Asset.getAnimation('small' + i))
            this.sprite.addAnimation("big" + i, Asset.getAnimation('big' + i));
        }
        this.sprite.addAnimation("slotsBW", Asset.getAnimation('slotsBW'));
        this.sprite.ani.playing = false;

        this.spinTimer = new EventTimer(SLOT_TIME_PER_SPIN_FRAME);
        this.slotPhaseTimer = new EventTimer(SLOT_PHASE_TIME);
        this.slotRewardTimer = new EventTimer(SLOT_REWARD_TIME);
        this.index = 0;
        this.subIndex = 0;
        this.validIndexes = [];
        this.slowDown = false;

        this.status = SLOT_STATUS.STOPPED;

        this.slotNumber = 0;

    }

    show(visible) {
        this.sprite.visible = visible;
    }

    update() {
        if (this.status === SLOT_STATUS.SPINNING && this.spinTimer.hasElapsed()) {
            this.spinSlots();
        } else if (this.status === SLOT_STATUS.STOPPED) {
            let pos = this.validIndexes[this.index];
            if (this.stoppedHasSecondPhase(pos) && this.slotPhaseTimer.hasElapsed() && this.sprite.ani.name.startsWith("slots")) {
                this.changePhase(pos);
            } else if (this.slotRewardTimer.hasElapsed()) {
                this.slotFinishCallback(pos, this.subIndex);
                this.slotNumber++;
            }
        }
    }

    spinSlots() {
        this.index = (this.index + 1) % this.validIndexes.length;
        let pos = this.validIndexes[this.index];
        this.sprite.ani.frame = pos;
        this.spinTimer.restart();

        if (this.slowDown) {
            this.spinTimer.addToInterval(SLOT_TIME_SLOW_DOWN_FRAME_RATE);
            if (this.spinTimer.timeAdded >= SLOT_SLOW_DOWN_MAX) {
                this.stopSlotMachine(pos)
            } else {
                Audio.playSFX('sfx09');
            }
        } else {
            Audio.playSFX('sfx09');
        }
    }

    stopSlotMachine(pos) {
        this.status = SLOT_STATUS.STOPPED;
        this.slotPhaseTimer.restart();
        this.slotRewardTimer.restart();
        this.sprite.changeAni("slots" + (pos));
        this.playSlotResultSFX(pos);
    }


    playSlotResultSFX(index) {
        switch (index) {
            case SLOT_STATES.SMALL:
                Audio.playSFX('sfx42');
                break;
            case SLOT_STATES.GREAT_UPGRADE:
            case SLOT_STATES.ULTRA_UPGRADE:
            case SLOT_STATES.MASTER_UPGRADE:
            case SLOT_STATES.BIG:
            case SLOT_STATES.BONUS_MULTIPLIER:
            case SLOT_STATES.SMALL_SAVER:
            case SLOT_STATES.GREAT_SAVER:
            case SLOT_STATES.EXTRA_BALL:
            case SLOT_STATES.ULTRA_SAVER:
            case SLOT_STATES.CATCHEM_STARTER:
            case SLOT_STATES.EVOLUTION_STARTER:
                Audio.playSFX('sfx43');
                break;
            case SLOT_STATES.PIKACHU:
                Audio.playSFXsequence(["sfx43", "sfx4E"]);
                break;
            case SLOT_STATES.GO_TO_BONUS_DUGTRIO:
            case SLOT_STATES.GO_TO_BONUS_GASTLY:
            case SLOT_STATES.GO_TO_BONUS_MEOWTH:
            case SLOT_STATES.GO_TO_BONUS_SEEL:
            case SLOT_STATES.GO_TO_BONUS_MEWTWO:
                Audio.playSFXsequence(["sfx43", "sfx23"]);
                break;
            default:
                break;
        }
    }

    startSlowingDown() {
        this.slowDown = true;
    }

    startSlotMachine(startSlotMachineParams) {
        this.slowDown = false;
        this.validIndexes = this.selectValidSlots(startSlotMachineParams);
        this.index = 0;
        this.sprite.ani.frame = this.validIndexes[this.index];
        this.sprite.changeAnimation("slotsBW");
        this.status = SLOT_STATUS.SPINNING;
        this.spinTimer.restart();
        this.spinTimer.restartTimeAdded();
    }

    selectValidSlots(startSlotMachineParams) {
        let validSlots = [];

        if (this.slotNumber <= 2) {
            validSlots.push(SLOT_STATES.SMALL);
            validSlots.push(SLOT_STATES.BONUS_MULTIPLIER);
            validSlots.push(SLOT_STATES.SMALL_SAVER);
        } else if (this.slotNumber <= 4) {
            validSlots.push(SLOT_STATES.SMALL);
            validSlots.push(SLOT_STATES.BIG);
            validSlots.push(SLOT_STATES.BONUS_MULTIPLIER);
            validSlots.push(SLOT_STATES.SMALL_SAVER);
        } else if (this.slotNumber <= 8) {
            validSlots.push(SLOT_STATES.BIG);
            validSlots.push(SLOT_STATES.BONUS_MULTIPLIER);
            validSlots.push(SLOT_STATES.GREAT_SAVER);
            if (this.ballType !== BALL_TYPES.MASTERBALL) {
                validSlots.push(this.getNextBallUpgrade(startSlotMachineParams.ballType));
            }
            validSlots.push(this.getNextGoToBonusLevel(startSlotMachineParams.nextBonusLevel));
        } else {
            validSlots.push(SLOT_STATES.BIG);
            validSlots.push(SLOT_STATES.BONUS_MULTIPLIER);
            validSlots.push(SLOT_STATES.ULTRA_SAVER);
            if(!startSlotMachineParams.extraActive){
                validSlots.push(SLOT_STATES.EXTRA_BALL);
            }
            if (this.ballType !== BALL_TYPES.MASTERBALL) {
                validSlots.push(this.getNextBallUpgrade(startSlotMachineParams.ballType));
            }
            validSlots.push(this.getNextGoToBonusLevel(startSlotMachineParams.nextBonusLevel));
        }

        if (!startSlotMachineParams.pikachuSaverActive) {
            validSlots.push(SLOT_STATES.PIKACHU);
        }

        if (startSlotMachineParams.catchemArrowsLevel === 3) {
            validSlots.push(SLOT_STATES.CATCHEM_STARTER);
        }

        if (startSlotMachineParams.evolutionArrowsLevel === 3) {
            validSlots.push(SLOT_STATES.EVOLUTION_STARTER);
        }

        return validSlots;
    }

    getNextBallUpgrade(ballType) {
        if (ballType === BALL_TYPES.POKEBALL) {
            return SLOT_STATES.GREAT_UPGRADE;
        } else if (ballType === BALL_TYPES.GREATBALL) {
            return SLOT_STATES.ULTRA_UPGRADE;
        } else if (ballType === BALL_TYPES.ULTRABALL) {
            return SLOT_STATES.MASTER_UPGRADE;
        }
    }

    getNextGoToBonusLevel(nextBonusLevel) {
        switch (nextBonusLevel) {
            case FIELD_BONUS.MOLE:
                return SLOT_STATES.GO_TO_BONUS_DUGTRIO;
            case FIELD_BONUS.GHOST:
                return SLOT_STATES.GO_TO_BONUS_GASTLY;
            case FIELD_BONUS.CLONE:
                return SLOT_STATES.GO_TO_BONUS_MEWTWO;
            case FIELD_BONUS.SEAL:
                return SLOT_STATES.GO_TO_BONUS_SEEL;
            case FIELD_BONUS.CAT:
                return SLOT_STATES.GO_TO_BONUS_MEOWTH;
            default:
                break;
        }
    }

    stoppedHasSecondPhase(slot) {
        return slot === SLOT_STATES.SMALL || slot === SLOT_STATES.BIG || slot === SLOT_STATES.BONUS_MULTIPLIER;
    }

    changePhase(slot) {
        switch (slot) {
            case SLOT_STATES.SMALL:
                this.subIndex = this.randIntBetween(1, 9);
                this.sprite.changeAni("small" + this.subIndex);
                break;
            case SLOT_STATES.BIG:
                this.subIndex = this.randIntBetween(1, 9);
                this.sprite.changeAni("big" + this.subIndex);
                break;
            case SLOT_STATES.BONUS_MULTIPLIER:
                this.subIndex = this.randIntBetween(1, 5);
                this.sprite.changeAni("multi" + this.subIndex);
                break;
            default:
                break;
        }
    }

    randIntBetween(a, b) {
        return Math.floor(Math.random() * (b - a + 1)) + a;
    }

    restartSlotNumber() {
        this.slotNumber = 0;
    }
startSlotMachineParams
}


class StartSlotMachineParams {
    constructor(pikachuSaverActive, catchemArrowsLevel, evolutionArrowsLevel, ballType, nextBonusLevel, extraActive) {
        this.pikachuSaverActive = pikachuSaverActive;
        this.catchemArrowsLevel = catchemArrowsLevel;
        this.evolutionArrowsLevel = evolutionArrowsLevel;
        this.ballType = ballType;
        this.nextBonusLevel = nextBonusLevel;
        this.extraActive = extraActive;
    }
}