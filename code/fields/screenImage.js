class ScreenImage {
    constructor() {
        this.sprite = new Sprite(160, 364, 96, 64, "none");
        this.sprite.debug = DEBUG;
        this.sprite.layer = SCENARIO_LAYER;
        this.area = 0;

        this.sprite.addAnimation(FIELD_BONUS.MOLE, Asset.getAnimation('goToBonusMole'));
        this.sprite.addAnimation(FIELD_BONUS.GHOST, Asset.getAnimation('goToBonusGhost'));
        this.sprite.addAnimation(FIELD_BONUS.CAT, Asset.getAnimation('goToBonusCat'));
        this.sprite.addAnimation(FIELD_BONUS.SEAL, Asset.getAnimation('goToBonusSeal'));
        this.sprite.addAnimation(FIELD_BONUS.CLONE, Asset.getAnimation('goToBonusClone'));
        this.sprite.addAnimation(TRAVEL_DIRECTION.LEFT, Asset.getAnimation('travelLeft'));
        this.sprite.addAnimation(TRAVEL_DIRECTION.RIGHT, Asset.getAnimation('travelRight'));
        this.sprite.addAnimation(TRAVEL_DIRECTION.CAVE, Asset.getAnimation('travelCave'));
        this.sprite.addAnimation("slotCave", Asset.getAnimation('slotCave'));

    }

    show(visible) {
        this.sprite.visible = visible;
    }

    setBonus(bonus) {
        this.sprite.changeAnimation(bonus);
    }

    setTravelDirection(direction) {
        this.sprite.changeAnimation(direction);
    }

    setSlotCave(){
        this.sprite.changeAnimation("slotCave");
    }

}