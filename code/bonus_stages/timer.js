const TIMER_POSITION_BONUS_X = 285;
const TIMER_POSITION_BONUS_Y = 126;
const TIMER_CHAR_HEIGHT = 32;
const TIMER_CHAR_WIDTH = 16;

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

    constructor(totalMillis) {
        this.timeUp = false;
        this.stopped = false;
        this.totalMillis = totalMillis;
        this.startingMillis = millis();
        this.remainingMillis = this.totalMillis;

        this.minutesSprite = new Sprite(TIMER_POSITION_BONUS_X, TIMER_POSITION_BONUS_Y, TIMER_CHAR_WIDTH, TIMER_CHAR_HEIGHT, "none");
        this.colonSprite = new Sprite(TIMER_POSITION_BONUS_X + TIMER_CHAR_WIDTH, TIMER_POSITION_BONUS_Y, TIMER_CHAR_WIDTH, TIMER_CHAR_HEIGHT, "none");
        this.second1Sprite = new Sprite(TIMER_POSITION_BONUS_X + TIMER_CHAR_WIDTH * 2, TIMER_POSITION_BONUS_Y, TIMER_CHAR_WIDTH, TIMER_CHAR_HEIGHT, "none");
        this.second2Sprite = new Sprite(TIMER_POSITION_BONUS_X + TIMER_CHAR_WIDTH * 3, TIMER_POSITION_BONUS_Y, TIMER_CHAR_WIDTH, TIMER_CHAR_HEIGHT, "none");

        let sheet;
        for (let i = 0; i < 10; i++) {
            this.minutesSprite.addAnimation(i.toString(), getAnimation(TIMER_NUMBERS_PREFIX + i + ".png", TIMER_CHAR_WIDTH, TIMER_CHAR_HEIGHT, 1));
            this.minutesSprite.debug = DEBUG;
            this.second1Sprite.addAnimation(i.toString(), getAnimation(TIMER_NUMBERS_PREFIX + i + ".png", TIMER_CHAR_WIDTH, TIMER_CHAR_HEIGHT, 1));
            this.second1Sprite.debug = DEBUG;
            this.second2Sprite.addAnimation(i.toString(), getAnimation(TIMER_NUMBERS_PREFIX + i + ".png", TIMER_CHAR_WIDTH, TIMER_CHAR_HEIGHT, 1));
            this.second2Sprite.debug = DEBUG;
        }
        this.colonSprite.addAnimation("colon", getAnimation(TIMER_NUMBERS_PREFIX + "colon.png", TIMER_CHAR_WIDTH, TIMER_CHAR_HEIGHT, 1));
        this.colonSprite.changeAnimation("colon");

    }

    update() {
        if (!this.timeIsUp() && !this.stopped) {
            let newTime = this.totalMillis - (millis() - this.startingMillis);
            if (newTime <= 0) {
                this.timeUp = true;
            } else {
                this.remainingMillis = newTime;
                console.log(this.getTime());
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

    stopTimer(){
        this.stopped = true;
    }

}