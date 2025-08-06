class Timer {
    totalMillis;
    startingMillis;
    remainingMillis;
    timeU;
    constructor(totalMillis) {
        this.timeUp = false;
        this.totalMillis = totalMillis;
        this.startingMillis = millis();
        this.remainingMillis = this.totalMillis;
    }

    update() {
        if (!this.timeIsUp()) {
            let newTime = this.totalMillis - (millis() - this.startingMillis);
            if(newTime <= 0){
                this.timeUp = true;
            }else{
            this.remainingMillis = newTime;
            console.log(this.getTime());
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

}