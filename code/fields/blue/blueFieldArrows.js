class BlueFieldArrows extends Arrows {

    constructor() {
        super();
    }
    
    getCaveArrowAnimation(){return Asset.getAnimation("blueFieldCaveArrow")}
    getRightInnerArrowAnimation(){return Asset.getAnimation("blueFieldBellsproutArrow")}
    getLeftInnerArrowAnimation(){return Asset.getAnimation("blueFieldLeftInnerArrow")}
    getCaptureArrowAnimation(){return Asset.getAnimation("blueFieldCaptureArrows")}
    getEvolutionArrowAnimation(){return Asset.getAnimation("blueFieldEvolutionArrows")}
    
    flipCentralArrow(){
        //TODO
    }

}