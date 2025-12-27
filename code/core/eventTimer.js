class EventTimer{

    constructor(cooldownTime){
        this.cooldownTime = cooldownTime;
        this.lastActivationTime = -cooldownTime;
    }
    
    restart(){
        this.lastActivationTime = millis();
    }

    hasElapsed(){
        return millis() - this.lastActivationTime >= this.cooldownTime;
    }

}