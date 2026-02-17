
class Pokedex extends Sketch {

    constructor() {
        super();
        this.createFrame();
        this.attachControls(new Controls(() => { }, () => { }, () => { }, this.leftFlipperCallback, this.centerFlipperCallback, this.rightFlipperCallback));

        this.background = Asset.getBackground('pokedex');
    }



    leftFlipperCallback = () => {

    }

    rightFlipperCallback = () => {

    }

    centerFlipperCallback = () => {
      
    }

    setup() {
        Audio.playMusic("titleScreen");
    }

    draw() {
        super.draw();

    }

}
