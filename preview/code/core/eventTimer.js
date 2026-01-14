class EventTimer {

    constructor(cooldownTime) {
        this.cooldownTime = cooldownTime;
        this.lastActivationTime = -cooldownTime;

        this.timeAdded = 0;
    }

    restart() {
        this.lastActivationTime = millis();
    }

    hasElapsed() {
        return millis() - this.lastActivationTime >= (this.cooldownTime + this.timeAdded);
    }

    hasLessThanMillisPending(ms) {
        const elapsed = millis() - this.lastActivationTime;
        const remaining = (this.cooldownTime + this.timeAdded) - elapsed;
        return remaining > 0 && remaining < ms;
    }

    addToInterval(timeToAdd) {
        this.timeAdded += timeToAdd;
    }

    restartTimeAdded() {
        this.timeAdded = 0;
    }

    changeCooldown(newCooldown) {
        this.cooldownTime = newCooldown;
    }

}