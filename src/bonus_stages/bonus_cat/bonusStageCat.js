import {Audio} from "../../engine/audioManager.js";
import {Asset} from "../../engine/assetManager.js";
import {BONUS_STAGE_STATE, BonusStage, STAGE_RESULT_SHOW_MILLS} from "../bonusStage.js";
import {EngineUtils} from "../../engine/engine.js";
import {Timer} from "../../core/timer.js";
import {Meowth} from "./meowth.js";
import {CoinCounter} from "./coinCounter.js";
import {POINTS} from "../../core/points.js";
import {
    Coin,
    COIN_HIGH_SLOT_1,
    COIN_HIGH_SLOT_2,
    COIN_HIGH_SLOT_3,
    COIN_HIGH_SLOT_4,
    COIN_HIGH_SLOT_5,
    COIN_HIGH_SLOT_6, COIN_HIGH_SLOT_7, COIN_HIGH_SLOT_8, COIN_LOW_SLOT_1, COIN_LOW_SLOT_2, COIN_LOW_SLOT_3,
    COIN_LOW_SLOT_4, COIN_LOW_SLOT_5, COIN_LOW_SLOT_6
} from "./coin.js";
import {I18NManager} from "../../engine/i18nManager.js";
import {FlyingCoin} from "./flyingCoin.js";

const CAT_STAGE_TIME_MILLIS = 61000;
const VICTORY_STAGE_COINS = 20;

const CAT_STAGE_MAX_COINS_ON_SCREEN = 6;

export const CAT_STAGE_LAST_HIT = {
    CAT: 0,
    COIN: 1
}

export class BonusStageCat extends BonusStage {

    constructor(status, onEndCallback) {
        super(status, onEndCallback);
        this.lastElementHit = CAT_STAGE_LAST_HIT.CAT;
        this.highLaneCoins = new Array(8);
        this.lowLaneCoins = new Array(6);
        this.flyingCoins = [];
        this.millisSinceStageComplete = 0;
        this.state = BONUS_STAGE_STATE.PLAYING;
        this.playableStages = [BONUS_STAGE_STATE.PLAYING, BONUS_STAGE_STATE.WON];
    }

    setup() {
        super.replaceBackground(Asset.getBackground('bonusCatBackgroundOpen'));
        super.createBonusScenarioGeometry();

        this.attachTimer(Timer.createBonusLowTimer(CAT_STAGE_TIME_MILLIS));

        Audio.playMusic('catStage');

        this.meowth = new Meowth(this.onMeowthHitCallback);
        this.coinCounter = new CoinCounter();
        this.createCoins();
        EngineUtils.flashWhite();
    }

    onMeowthHitCallback = () => {
        EngineUtils.addPointsForBallHelper(POINTS.MEOWTH_HIT_POINTS);
        this.lastElementHit = CAT_STAGE_LAST_HIT.CAT;
        if (this.currentActiveCoins() < CAT_STAGE_MAX_COINS_ON_SCREEN) {
            this.createCoinProjectile(this.meowth.sprite.pos);
        }
    }

    currentActiveCoins() {
        return this.highLaneCoins.filter(c => !c.disabled).length + this.lowLaneCoins.filter(c => !c.disabled).length + this.flyingCoins.length;
    }

    createCoins() {
        const highSlots = [COIN_HIGH_SLOT_1, COIN_HIGH_SLOT_2, COIN_HIGH_SLOT_3, COIN_HIGH_SLOT_4,
            COIN_HIGH_SLOT_5, COIN_HIGH_SLOT_6, COIN_HIGH_SLOT_7, COIN_HIGH_SLOT_8];
        for (let i = 0; i < highSlots.length; i++) {
            this.highLaneCoins[i] = new Coin(highSlots[i], true, this.onCoinHitCallback);
        }

        const lowSlots = [COIN_LOW_SLOT_1, COIN_LOW_SLOT_2, COIN_LOW_SLOT_3, COIN_LOW_SLOT_4,
            COIN_LOW_SLOT_5, COIN_LOW_SLOT_6];
        for (let i = 0; i < lowSlots.length; i++) {
            this.lowLaneCoins[i] = new Coin(lowSlots[i], false, this.onCoinHitCallback);
        }
    }

    onCoinHitCallback = (multiplier) => {
        EngineUtils.addPointsForBallHelper(multiplier * POINTS.COIN_CAUGHT_POINTS);
        this.lastElementHit = CAT_STAGE_LAST_HIT.COIN;
    }

    draw() {
        super.draw();
        this.drawStage();

        if (this.state === BONUS_STAGE_STATE.LOST || this.getTimer().timeIsUp()) {
            this.meowth.stopAndSmug();
            if ((millis() - this.millisSinceStageComplete) > STAGE_RESULT_SHOW_MILLS) {
                super.finishStageSuccessfully();
            }
        }
    }

    drawStage() {
        // gate / new ball only while playing
        if ((this.state === BONUS_STAGE_STATE.PLAYING || this.state === BONUS_STAGE_STATE.WON) && !this.getTimer().timeIsUp()) {
            super.createBonusNewBallIfBallLoss(Asset.getBackground('bonusCatBackgroundOpen'));
            super.closeBonusGateIfBallInsideBoard(Asset.getBackground('bonusCatBackgroundClosed'));
        }

        this.meowth.update(this.getBall().sprite);

        this.updateFlyingCoins();
        this.updateCoins();

        this.updateTimer();
    }

    updateTimer() {
        this.getTimer().update();

        if (this.state !== BONUS_STAGE_STATE.LOST && this.getTimer().timeIsUp()) {
            this.getFlippers().disableFlippers();

            if (this.state !== BONUS_STAGE_STATE.WON) {
                this.endStage(BONUS_STAGE_STATE.LOST, "end_meowth_stage");
            } else {
                this.finishStage();
            }
        }
    }

    updateCoins() {
        for (const coin of this.highLaneCoins) this.updateCoin(coin);
        for (const coin of this.lowLaneCoins) this.updateCoin(coin);
    }

    updateCoin(coin) {
        const coinsTaken = coin.update(this.getBall().sprite, this.lastElementHit);
        if (coinsTaken > 0) {
            // Passing the VICTORY_STAGE_COINS threshold
            if (this.coinCounter.counter < VICTORY_STAGE_COINS && this.coinCounter.counter + coinsTaken >= VICTORY_STAGE_COINS) {
                this.clearStage();
            }
            this.coinCounter.addCoins(coinsTaken);
        }
    }

    updateFlyingCoins() {
        for (const c of this.flyingCoins) {
            if (!c || c.disabled) continue;
            c.update();
            const laneCoins = this.meowth.isHighLane ? this.highLaneCoins : this.lowLaneCoins;
            for (const slot of laneCoins) {
                if (slot.isClose(c.sprite)) {
                    c.disableSprite();
                    slot.enableSprite();
                    break;
                }
            }
        }

        this.flyingCoins = this.flyingCoins.filter(c => !c.disabled);
    }


    createCoinProjectile(startPos) {
        this.flyingCoins.push(new FlyingCoin(startPos.x, startPos.y));
    }

    clearStage() {
        Audio.interruptWithSFX('sfx2A');

        this.state = BONUS_STAGE_STATE.WON;
        this.getStageText().setScrollText(I18NManager.translate("meowth_stage_clear"), "", (STAGE_RESULT_SHOW_MILLS / 2));
    }

    /**
     * Stage is clear, and time runes out
     */
    finishStage() {
        super.disableTimer();
        this.getFlippers().disableFlippers();
        Audio.stopMusic();
        this.millisSinceStageComplete = millis();
    }

}
