const HIGH_SCORE_STATE = {
    VIEW: 'VIEW',
    EDIT: 'EDIT'
}

const HIGH_SCORE_ROWS = [
    [146],
    [194],
    [242],
    [290],
    [338]
];

const HIGH_SCORE_LETTER_X = [84, 100, 116];


const HIGH_SCORE_DEFAULT_TEXT = [
    {
        name: [1, 2, 3],
        points: "999999999"
    },
    {
        name: [10, 12, 13],
        points: "123456789"
    },
    {
        name: [4, 6, 5],
        points: "123456789"
    },
    {
        name: [1, 2, 3],
        points: "123456789"
    },
    {
        name: [1, 2, 3],
        points: "000000000"
    }
]

class HighScore extends Sketch {

    constructor() {
        super();
        this.background = Asset.getBackground('highScoreRed');
        this.createFrame();
    }

    setup() {
        this.letterMatrix = HIGH_SCORE_ROWS.map(([y]) => HIGH_SCORE_LETTER_X.map((x) => this.createLetterSprite(x, y)));

        this.setData(HIGH_SCORE_DEFAULT_TEXT);
    }

    createLetterSprite(x, y) {
        let sprite = new Sprite(x, y, 16, 32, "static");
        sprite.layer = SCENARIO_LAYER;
        sprite.debug = DEBUG;
        sprite.addAnimation("default", Asset.getAnimation('HighScoreLetters'));
        sprite.ani.playing = false;
        return sprite;
    }

    setData(data) {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 3; j++) {
                this.letterMatrix[i][j].ani.frame = data[i].name[j];
            }
        }
    }

    draw() {
        super.draw();
    }

}
