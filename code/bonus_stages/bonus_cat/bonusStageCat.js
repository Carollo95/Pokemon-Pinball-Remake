const CAT_STAGE_TIME_MILLIS = 200000;//61000;

class BonusStageCat extends BonusStage {

    highLaneCoins = new Array(8);
    lowLaneCoins = new Array(6);

    flyingCoins = new Array();

    meowth;
    coinCounter;
    timer;

    constructor() {
        super();
    }

    setup() {
        super.replaceBackground(bonusCatBackgroundOpen);
        super.createBonusScenarioGeometry();

        this.timer = new Timer(TIMER_POSITION_BONUS_LOW_Y, CAT_STAGE_TIME_MILLIS);

        playSong(songCatStage);

        this.meowth = new Meowth();
        this.coinCounter = new CoinCounter();
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

        this.updateFlyingCoins();
        this.updateCoins();

        this.updateTimer();

        if (this.scenarioTop.collide(this.ball.sprite)) {
            sfx08.play();
        }

    }

    updateTimer() {
        this.timer.update();
        if (this.timer.timeIsUp()) {
            this.flippers.disableFlippers();
            if (!this.levelCompleted) {
                this.loseStage();
            }
        }
    }

    loseStage() {
        this.levelCompleted = true;
        this.millisSinceStageComplete = millis();
        this.stageText.setText(" end meowth stage ", (STAGE_RESULT_SHOW_MILLS / 2));
        this.isStageLost = true;
    }

    updateCoins() {
        for (var i = 0; i < this.highLaneCoins.length; i++) {
            this.updateCoin(this.highLaneCoins[i]);
        }
        for (var i = 0; i < this.lowLaneCoins.length; i++) {
            this.updateCoin(this.lowLaneCoins[i]);
        }
    }

    updateCoin(coin) {
        let coinsTaken = coin.update(this.ball.sprite);
        if (coinsTaken > 0) {
            this.coinCounter.addCoins(coinsTaken);
            if (this.coinCounter.counter == 20) {
                this.clearStage();
            }
        }
    }

    updateFlyingCoins() {
        for (var c = 0; c < this.flyingCoins.length; c++) {
            if (this.flyingCoins[c]) {
                this.flyingCoins[c].update();
                if (this.meowth.isHighLane) {
                    for (let i = 0; i < 8; i++) {
                        if (this.highLaneCoins[i].isClose(this.flyingCoins[c].sprite)) {
                            this.flyingCoins[c].disableSprite();
                            this.highLaneCoins[i].enableSprite();
                        }
                    }
                } else {
                    for (let i = 0; i < 6; i++) {
                        if (this.lowLaneCoins[i].isClose(this.flyingCoins[c].sprite)) {
                            this.flyingCoins[c].disableSprite();
                            this.lowLaneCoins[i].enableSprite();
                        }
                    }
                }
            }
        }

        this.flyingCoins = this.flyingCoins.filter(c => !c.disabled)
    }

    checkCreateCoin() {
        if (this.meowth.createCoin) {
            this.createCoinProjectile(this.meowth.sprite.pos);
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

    createCoinProjectile(startPos) {
        this.flyingCoins.push(new FlyingCoin(startPos.x, startPos.y));
    }

    clearStage() {
        sfx2A.play();
        this.isStageWon = true;
        this.millisSinceStageComplete = millis();
        this.stageText.setText("meowth stage clear ", (STAGE_RESULT_SHOW_MILLS / 2)); //TODO internationalize
    }


}