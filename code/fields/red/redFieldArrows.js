class RedFieldArrows extends Arrows {

    constructor() {
        super();
    }

    getCaptureArrows(){return new Sprite(245, 324, 46, 68, "none");}
    getEvolutionArrows(){return new Sprite(75, 324, 46, 68, "none")}
    getCaveArrows(){return new Sprite(161, 315, 26, 26, "none");}   
    getLeftInnerArrow(){return new Sprite(113, 284, 34, 32, "none");}
    getRightInnerArrow(){return new Sprite(207, 284, 34, 32, "none");}
    
    getCaveArrowAnimation(){return Asset.getAnimation("redFieldCaveArrow")}
    getInnerArrowAnimation(){return Asset.getAnimation("redFieldLeftInnerArrow")}
    getCaptureArrowAnimation(){return Asset.getAnimation("redFieldCaptureArrows")}
    getEvolutionArrowAnimation(){return Asset.getAnimation("redFieldEvolutionArrows")}

}