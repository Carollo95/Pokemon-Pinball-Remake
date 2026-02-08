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
    getInnerArrowAnimation(){return Asset.getAnimation("blueFieldLeftInnerArrow")}
    getCaptureArrowAnimation(){return Asset.getAnimation("blueFieldCaptureArrows")}
    getEvolutionArrowAnimation(){return Asset.getAnimation("blueFieldEvolutionArrows")}
    
    flipCentralArrow(direction){
        switch (direction) {
            case BLUE_ARROW_DIRECTION.NORTH:
                this.caveArrowExtraFrames = 2;
                this.rightInnerArrowExtraFrames = 0;
                this.leftInnerArrowExtraFrames = 0;
                break;
            case BLUE_ARROW_DIRECTION.EAST:
                this.caveArrowExtraFrames = 0;
                this.rightInnerArrowExtraFrames = 2;
                this.leftInnerArrowExtraFrames = 0;
                break;
            case BLUE_ARROW_DIRECTION.WEST:
                this.caveArrowExtraFrames = 0;
                this.rightInnerArrowExtraFrames = 0;
                this.leftInnerArrowExtraFrames = 2;
                break;
            case BLUE_ARROW_DIRECTION.SOUTH:
                this.caveArrowExtraFrames = 0;
                this.rightInnerArrowExtraFrames = 0;
                this.leftInnerArrowExtraFrames = 0;
                break;
            default:
                break;
        }
    }

}