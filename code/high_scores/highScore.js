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
const HIGH_SCORE_NUMBER_X = [196, 212, 228, 244, 260, 276, 292, 308, 324];

const BLUE_NUMBER_COLORS = [[248, 0, 0], [248, 64, 0], [248, 128, 0], [248, 192, 0], [248, 248, 0]];
const RED_NUMBER_COLORS = [[0, 0, 248], [0, 64, 248], [0, 128, 248], [0, 192, 248], [0, 248, 248]];


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
        this.numberMatrix = HIGH_SCORE_ROWS.map(([y], i) => HIGH_SCORE_NUMBER_X.map((x) => this.createNumberSprite(x, y, RED_NUMBER_COLORS[i])));

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

    createNumberSprite(x, y, color) {
        let sprite = new Sprite(x, y, 16, 24, "static");
        sprite.layer = SCENARIO_LAYER;
        sprite.debug = DEBUG;
        sprite.addAnimation("default", Asset.getAnimation('HighScoreNumbers'));
        sprite.ani.playing = false;
        sprite.myColor = color;
        sprite.draw = function () {
            push();
            tint(this.myColor[0], this.myColor[1], this.myColor[2]);
            this.ani.draw(0, 0);
            pop();
        };
        return sprite;
    }

    setData(data) {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 3; j++) {
                this.letterMatrix[i][j].ani.frame = data[i].name[j];
            }
        }
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 9; j++) {
                this.numberMatrix[i][j].ani.frame = data[i].points[j];
            }
        }
    }

    draw() {
        super.draw();
    }

}
