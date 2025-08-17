
class BonusStageCat extends BonusStage {

    highLaneCoins = new Array(8);
    lowLaneCoins = new Array(6);

    constructor() {
        super();
    }

    setup() {
        super.replaceBackground(bonusCatBackgroundOpen);
        super.createBonusScenarioGeometry();

        playSong(songCatStage);

        this.meowth = new Meowth();
        this.createCoins();

    }

    createCoins() {
        this.highLaneCoins[0] = new Coin(COIN_HIGH_SLOT_1, true);
        this.highLaneCoins[1] = new Coin(COIN_HIGH_SLOT_2, true);
        this.highLaneCoins[2] = new Coin(COIN_HIGH_SLOT_3, true);
        this.highLaneCoins[3] = new Coin(COIN_HIGH_SLOT_4, true);
        this.highLaneCoins[4] = new Coin(COIN_HIGH_SLOT_5, true);
        this.highLaneCoins[5] = new Coin(COIN_HIGH_SLOT_6, true);
        this.highLaneCoins[6] = new Coin(COIN_HIGH_SLOT_7, true);
        this.highLaneCoins[7] = new Coin(COIN_HIGH_SLOT_8, true);

        this.lowLaneCoins[0] = new Coin(COIN_LOW_SLOT_1, false);
        this.lowLaneCoins[1] = new Coin(COIN_LOW_SLOT_2, false);
        this.lowLaneCoins[2] = new Coin(COIN_LOW_SLOT_3, false);
        this.lowLaneCoins[3] = new Coin(COIN_LOW_SLOT_4, false);
        this.lowLaneCoins[4] = new Coin(COIN_LOW_SLOT_5, false);
        this.lowLaneCoins[5] = new Coin(COIN_LOW_SLOT_6, false);
    }

    draw() {
        super.draw();
        this.drawStage();

        if (this.isStageLost || this.isStageWon) {
            if ((millis() - this.millisSinceStageComplete) > STAGE_RESULT_SHOW_MILLS) {
                //TODO end stage
            }
        }
    }

    drawStage() {
        super.createBonusNewBallIfBallLoss(bonusCatBackgroundOpen);
        super.closeBonusGateIfBallInsideBoard(bonusCatBackgroundClosed);

        this.meowth.update(this.ball.sprite);
        this.checkCreateCoin();

        if (this.scenarioTop.collide(this.ball.sprite)) {
            sfx08.play();
        }

    }

    checkCreateCoin() {
        if (this.meowth.createCoin) {
            this.createCoin();
        }
    }

    enableRandomHighCoin() {
        let ran = int(random(0, 8));

        for (var i = 0; i < 8; i++) {
            if (!this.highLaneCoins[ran].disabled) {
                ran = (ran + 1) % 8;
            } else {
                this.highLaneCoins[ran].enableSprite();
                return;
            }
        }
    }

    enableRandomLowCoin() {
        let ran = int(random(0, 6));

        for (var i = 0; i < 6; i++) {
            if (!this.lowLaneCoins[ran].disabled) {
                ran = (ran + 1) % 6;
            } else {
                this.lowLaneCoins[ran].enableSprite();
                return;
            }
        }
    }

}