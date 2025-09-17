class RedStage extends Stage {

    constructor(status) {
        super(status);

        this.background = Asset.getBackground('redStageBackground');

        this.attachBall(Ball.spawnStageBall());
        this.attachFlippers(createTableFlippers());
        this.attachStageText(createStageStatusBanner(this.status));
    }


    //Left pikachu well and diglett
    setup() {
        this.createScenarioGeometry([
            [0, 555],
            [114, 555],
            [16, 493],
            [16, 418],
            [26, 398],
            [47, 391],
            [47, 352],
            [58, 336],
            [0, 336],
            [0, 555]
        ]);

        //Left top borders
        this.createScenarioGeometry([
            [0, 336],
            [58, 336],
            [42, 308],
            [30, 264],
            [20, 200],
            [20, 34],
            [26, 26],
            [34, 24],
            [34, 0],
            [0, 0],
            [0, 336]
        ]);

        //Top and right borders
        this.createScenarioGeometry([
            [34, 0],
            [34, 24],
            [42, 26],
            [50, 34],
            [50, 66],
            [56, 66],
            [74, 52],
            [94, 40],
            [118, 28],
            [128, 24],
            [142, 22],
            [200, 22],
            [234, 30],
            [258, 42],
            [278, 50],
            [304, 70],
            [320, 90],
            [336, 122],
            [340, 138],
            [346, 158],
            [346, 556],
            [384, 556],
            [384, 0],
            [34, 0]
        ]);

        //Right pikachu well and diglett
        this.createScenarioGeometry([
            [346, 556],
            [320, 556],
            [206, 556],
            [304, 494],
            [304, 494],
            [304, 418],
            [294, 398],
            [272, 392],
            [272, 352],
            [262, 334],
            [320, 334],
            [320, 556],
            [346, 556]]);


        //Right scenario border
        this.createScenarioGeometry([
            [262, 334],
            [276, 312],
            [286, 280],
            [296, 265],
            [300, 202],
            [300, 148],
            [294, 126],
            [276, 82],
            [290, 92],
            [310, 124],
            [320, 166],
            [320, 334],
            [262, 334]
        ]);

        //Top thingy
        this.createScenarioGeometry([
            [234, 78],
            [210, 58],
            [189, 48],
            [174, 48],
            [152, 48],
            [134, 48],
            [113, 58],
            [90, 72],
            [78, 85],
            [105, 74],
            [136, 64],
            [144, 62],
            [168, 62],
            [192, 64],
            [216, 72],
            [234, 78]
        ]);

        //Left side flippers
        this.createScenarioGeometry([
            [208, 502],
            [272, 464],
            [272, 414],
            [276, 412],
            [280, 414],
            [280, 480],
            [214, 524],
            [208, 506]
        ]);

        //Right side flippers
        this.createScenarioGeometry([
            [108, 502],
            [48, 464],
            [48, 414],
            [44, 412],
            [40, 414],
            [40, 414],
            [40, 480],
            [104, 524],
            [108, 506]
        ]);

        //Left thingy
        this.createScenarioGeometry([
            [60, 169],
            [52, 192],
            [52, 229],
            [56, 250],
            [60, 268],
            [78, 302],
            [90, 288],
            [76, 270],
            [64, 238],
            [58, 222],
            [56, 210],
            [56, 192],
            [60, 169]
        ]);

        //staryu ball upgrade 
        this.createScenarioGeometry([
            [112, 256],
            [94, 240],
            [90, 214],
            [90, 166],
            [98, 134],
            [98, 154],
            [92, 164],
            [92, 178],
            [104, 202],
            [128, 226],
            [130, 236],
            [112, 256]
        ]);

        //Ball upgrade separator left
        this.createScenarioGeometry([
            [134, 100],
            [138, 94],
            [142, 100],
            [142, 126],
            [138, 128],
            [134, 126],
            [134, 100]
        ]);

        //Ball upgrade separator right
        this.createScenarioGeometry([
            [182, 84],
            [186, 88],
            [186, 112],
            [182, 116],
            [178, 112],
            [178, 88],
            [182, 84]
        ]);

        //Bellsprout ball upgrade
        this.createScenarioGeometry([
            [212, 224],
            [220, 168],
            [220, 100],
            [236, 108],
            [256, 126],
            [266, 148],
            [270, 164],
            [272, 200],
            [266, 248],
            [254, 278],
            [240, 300],
            [230, 288],
            [246, 268],
            [258, 230],
            [262, 210],
            [262, 180],
            [258, 168],
            [248, 162],
            [236, 166],
            [230, 176],
            [230, 214],
            [218, 242],
            [212, 224]
        ]);

    }

    draw() {
        super.draw();
    }

}