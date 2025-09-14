class RedStage extends Stage {

    constructor(status) {
        super(status);

        this.background = Asset.getBackground('redStageBackground');

        this.attachBall(Ball.spawnStageBall());
        this.attachFlippers(createTableFlippers());
        this.attachStageText(createStageStatusBanner(this.status));
    }


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

        this.createScenarioGeometry([
            [34, 0],
            [34, 24],
            [42, 26],
            [50, 34],
            [50, 66],
            [56, 66],
            [74, 52],
            [94, 40],
            [128, 28],
            [143, 22],
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

        this.createScenarioGeometry([
            [346, 556],
            [206, 556],
            [304, 494],
            [304, 494],
            [304, 418],
            [294, 398],
            [272, 392],
            [272, 352],
            [262, 335],
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
            [320, 556],
            [346, 556]
        ]);


        //Side flippers
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


    }

    draw() {
        super.draw();
    }

}