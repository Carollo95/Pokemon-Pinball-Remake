class caveManager {

    constructor() {
        this.detectorC = new CaveDetector(27, 419, 1);
        this.detectorA = new CaveDetector(59, 419, 2);
        this.detectorV = new CaveDetector(261, 419, 3);
        this.detectorE = new CaveDetector(293, 419, 4);
    }


    update(ballSprite) {
        this.detectorC.update(ballSprite);
        this.detectorA.update(ballSprite);
        this.detectorV.update(ballSprite);
        this.detectorE.update(ballSprite);


        if (this.detectorC.active && this.detectorA.active && this.detectorV.active && this.detectorE.active) {
            console.log("CAVE ACTIVATED!");
        }
    }

    shiftLeft() {
        let pivot = this.detectorC.active;
        this.detectorC.setActive(this.detectorA.active);
        this.detectorA.setActive(this.detectorV.active);
        this.detectorV.setActive(this.detectorE.active);
        this.detectorE.setActive(pivot);
    }

    shiftRight() {
        let pivot = this.detectorE.active;
        this.detectorE.setActive(this.detectorV.active);
        this.detectorV.setActive(this.detectorA.active);
        this.detectorA.setActive(this.detectorC.active);
        this.detectorC.setActive(pivot);
    }

    reset(){
        this.detectorC.setActive(false);
        this.detectorA.setActive(false);
        this.detectorV.setActive(false);
        this.detectorE.setActive(false);
    }

}