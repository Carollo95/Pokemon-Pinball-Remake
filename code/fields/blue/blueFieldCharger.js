class BlueFieldCharger extends Charger{
    
    constructor(onSpinnerMoveCallback, onFullChargeCallback) {
        super(292, 182, 66, 174, onSpinnerMoveCallback, onFullChargeCallback);
    }


    getPaddleAnimation(){
        return Asset.getAnimation('blueFieldPaddle')
    }

    getChargerIndicatorAnimation(){
        return Asset.getAnimation('blueFieldChargeIndicator');
    }

}