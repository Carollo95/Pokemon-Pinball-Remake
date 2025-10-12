const TIMER_POSITION_BONUS_X = 290;
const TIMER_POSITION_BONUS_HIGH_Y = 116;
const TIMER_POSITION_BONUS_LOW_Y = 320;
const TIMER_POSITION_FIELD_Y = 16;
const TIMER_POSITION_FIELD_X = 320;

const TIMER_CHAR_WIDTH = 16;
const TIMER_CHAR_HEIGHT = 32;

class Timer {
    constructor(x, y, totalMillis, onTimeUpCallback = () => { }) {
        this.timeUp = false;
        this.stopped = false;
        this.totalMillis = totalMillis;
        this.startingMillis = millis();
        this.timeOfLastSFX = 0;
        this.onTimeUpCallback = onTimeUpCallback;
        this.remainingMillis = this.totalMillis;

        this.minutesSprite = new Sprite(x, y, TIMER_CHAR_WIDTH, TIMER_CHAR_HEIGHT, "none");
        this.minutesSprite.layer = HUD_LAYER;
        this.colonSprite = new Sprite(x + TIMER_CHAR_WIDTH, y, TIMER_CHAR_WIDTH, TIMER_CHAR_HEIGHT, "none");
        this.colonSprite.layer = HUD_LAYER;
        this.second1Sprite = new Sprite(x + TIMER_CHAR_WIDTH * 2, y, TIMER_CHAR_WIDTH, TIMER_CHAR_HEIGHT, "none");
        this.second1Sprite.layer = HUD_LAYER;
        this.second2Sprite = new Sprite(x + TIMER_CHAR_WIDTH * 3, y, TIMER_CHAR_WIDTH, TIMER_CHAR_HEIGHT, "none");
        this.second2Sprite.layer = HUD_LAYER;

        for (let i = 0; i < 10; i++) {
            const key = 'animTimer' + i;
            this.minutesSprite.addAnimation(i.toString(), Asset.getAnimation(key));
            this.minutesSprite.debug = DEBUG;
            this.second1Sprite.addAnimation(i.toString(), Asset.getAnimation(key));
            this.second1Sprite.debug = DEBUG;
            this.second2Sprite.addAnimation(i.toString(), Asset.getAnimation(key));
            this.second2Sprite.debug = DEBUG;
        }

        this.colonSprite.addAnimation("colon", Asset.getAnimation('animTimerColon'));
        this.colonSprite.changeAnimation("colon");

    }

    update() {
        if (!this.timeIsUp() && !this.stopped) {
            let newTime = this.totalMillis - (millis() - this.startingMillis);
            if (newTime <= 0) {
                this.timeUp = true;
                this.onTimeUpCallback();
            } else {
                this.remainingMillis = newTime;
            }

            this.updateSprite();
            this.soundSFX();
        }
    }

    updateSprite() {
        let time = this.getTime();
        this.minutesSprite.changeAnimation(time.charAt(0));
        this.second1Sprite.changeAnimation(time.charAt(2));
        this.second2Sprite.changeAnimation(time.charAt(3));
    }

    soundSFX() {
        if (!this.stopped
            && millis() - this.timeOfLastSFX > 1000) {

            if (this.getTime() === "0:20") {
                this.timeOfLastSFX = millis();
                Audio.playSFX('sfx49');
            } else if (this.getTime() === "0:10") {
                this.timeOfLastSFX = millis();
                Audio.playSFX('sfx4A');
            } else if (this.getTime() === "0:05") {
                this.timeOfLastSFX = millis();
                Audio.playSFX('sfx4B');
            }
        }
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

    disable() {
        this.stop();
        this.minutesSprite.visible = false;
        this.colonSprite.visible = false;
        this.second1Sprite.visible = false;
        this.second2Sprite.visible = false;
    }


    static createBonusLowTimer(timer) {
        return new Timer(TIMER_POSITION_BONUS_X, TIMER_POSITION_BONUS_LOW_Y, timer);
    }

    static createBonusHighTimer(timer) {
        return new Timer(TIMER_POSITION_BONUS_X, TIMER_POSITION_BONUS_HIGH_Y, timer);
    }

    static createFieldTimer(timer) {
        return new Timer(TIMER_POSITION_FIELD_X, TIMER_POSITION_FIELD_Y, timer);
    }
}