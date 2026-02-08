class RedFieldCharger extends Charger{
    
    constructor(onSpinnerMoveCallback, onFullChargeCallback) {
        super(286, 180, 242, 144, onSpinnerMoveCallback, onFullChargeCallback);
    }


    getPaddleAnimation(){
        return Asset.getAnimation('redFieldPaddle')
    }

    getChargerIndicatorAnimation(){
        return Asset.getAnimation('redFieldChargeIndicator');
    }

}