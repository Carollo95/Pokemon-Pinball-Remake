class RedFieldArrows extends Arrows {

    constructor() {
        super();
    }
    
    getCaveArrowAnimation(){return Asset.getAnimation("redFieldCaveArrow")}
    getRightInnerArrowAnimation(){return Asset.getAnimation("redFieldBellsproutArrow")}
    getLeftInnerArrowAnimation(){return Asset.getAnimation("redFieldLeftInnerArrow")}
    getCaptureArrowAnimation(){return Asset.getAnimation("redFieldCaptureArrows")}
    getEvolutionArrowAnimation(){return Asset.getAnimation("redFieldEvolutionArrows")}

}