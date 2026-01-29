class BlueFieldArrows extends Arrows {

    constructor() {
        super();
    }

    getCaptureArrows(){return new Sprite(243, 340, 30, 50, "none");}
    getEvolutionArrows(){return new Sprite(77, 340, 30, 50, "none")}
    getCaveArrows(){return new Sprite(161, 315, 26, 22, "none");}   
    getLeftInnerArrow(){return new Sprite(136, 312, 20, 30, "none");}
    getRightInnerArrow(){return new Sprite(186, 312, 20, 30, "none");}

    getCaveArrowAnimation(){return Asset.getAnimation("blueFieldCaveArrow")}
    getRightInnerArrowAnimation(){return Asset.getAnimation("blueFieldRightInnerArrow")}
    getLeftInnerArrowAnimation(){return Asset.getAnimation("blueFieldLeftInnerArrow")}
    getCaptureArrowAnimation(){return Asset.getAnimation("blueFieldCaptureArrows")}
    getEvolutionArrowAnimation(){return Asset.getAnimation("blueFieldEvolutionArrows")}
    
    flipCentralArrow(){
        //TODO
    }

}