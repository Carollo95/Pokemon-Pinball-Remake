const TIMER_POSITION_BONUS_X = 290;
const TIMER_POSITION_BONUS_HIGH_Y = 116;
const TIMER_POSITION_BONUS_LOW_Y = 320;

class Timer {
    totalMillis;
    startingMillis;
    remainingMillis;
    timeUp;
    stopped;

    minutesSprite;
    colonSprite;
    second1Sprite;
    second2Sprite;

    constructor(y, totalMillis) {
        this.timeUp = false;
        this.stopped = false;
        this.totalMillis = totalMillis;
        this.startingMillis = millis();
        this.remainingMillis = this.totalMillis;

        this.minutesSprite = new Sprite(TIMER_POSITION_BONUS_X, y, TIMER_CHAR_WIDTH, TIMER_CHAR_HEIGHT, "none");
        this.minutesSprite.layer = 10;
        this.colonSprite = new Sprite(TIMER_POSITION_BONUS_X + TIMER_CHAR_WIDTH, y, TIMER_CHAR_WIDTH, TIMER_CHAR_HEIGHT, "none");
        this.colonSprite.layer = 10;
        this.second1Sprite = new Sprite(TIMER_POSITION_BONUS_X + TIMER_CHAR_WIDTH * 2, y, TIMER_CHAR_WIDTH, TIMER_CHAR_HEIGHT, "none");
        this.second1Sprite.layer = 10;
        this.second2Sprite = new Sprite(TIMER_POSITION_BONUS_X + TIMER_CHAR_WIDTH * 3, y, TIMER_CHAR_WIDTH, TIMER_CHAR_HEIGHT, "none");
        this.second2Sprite.layer = 10;

        for (let i = 0; i < 10; i++) {
            this.minutesSprite.addAnimation(i.toString(), animTimer[i]);
            this.minutesSprite.debug = DEBUG;
            this.second1Sprite.addAnimation(i.toString(), animTimer[i]);
            this.second1Sprite.debug = DEBUG;
            this.second2Sprite.addAnimation(i.toString(), animTimer[i]);
            this.second2Sprite.debug = DEBUG;
        }
        this.colonSprite.addAnimation("colon", animTimerColon);
        this.colonSprite.changeAnimation("colon");

    }

    update() {
        if (!this.timeIsUp() && !this.stopped) {
            let newTime = this.totalMillis - (millis() - this.startingMillis);
            if (newTime <= 0) {
                this.timeUp = true;
            } else {
                this.remainingMillis = newTime;
            }

            this.updateSprite();
        }
    }

    updateSprite() {
        let time = this.getTime();
        this.minutesSprite.changeAnimation(time.charAt(0));
        this.second1Sprite.changeAnimation(time.charAt(2));
        this.second2Sprite.changeAnimation(time.charAt(3));
    }

    timeIsUp() {
        return this.timeUp;
    }

    getTime() {
        let totalSeconds = Math.floor(this.remainingMillis / 1000);
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        return minutes + ":" + nf(seconds, 2);
    }

    stop() {
        this.stopped = true;
    }

    disable(){
        this.stop();
        this.minutesSprite.visible = false;
        this.colonSprite.visible = false;
        this.second1Sprite.visible = false;
        this.second2Sprite.visible = false;
    }

}