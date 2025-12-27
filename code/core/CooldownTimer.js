class CooldownTimer{

    constructor(cooldownTime){
        this.cooldownTime = cooldownTime;
        this.lastActivationTime = -cooldownTime;
    }
    
    restart(){
        this.lastActivationTime = millis();
    }

    hasCooldownElapsed(){
        return millis() - this.lastActivationTime >= this.cooldownTime;
    }

}