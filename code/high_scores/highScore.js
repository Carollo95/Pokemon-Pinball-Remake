const HIGH_SCORE_STATE = {
    VIEW: 'VIEW',
    EDIT: 'EDIT'
}

const HIGH_SCORE_ROWS = [
    [148],
    [196],
    [244],
    [292],
    [340]
];

const HIGH_SCORE_LETTER_X = [84, 100, 116];
const HIGH_SCORE_NUMBER_X = [196, 212, 228, 244, 260, 276, 292, 308, 324];

const BLUE_NUMBER_COLORS = [[248, 0, 0], [248, 64, 0], [248, 128, 0], [248, 192, 0], [248, 248, 0]];
const RED_NUMBER_COLORS = [[0, 0, 248], [0, 64, 248], [0, 128, 248], [0, 192, 248], [0, 248, 248]];


const DEFAULT_HIGH_SCORE_DATA = [
    {
        name: [13, 8, 13],
        points: "500000000"
    },
    {
        name: [2, 17, 4],
        points: "400000000"
    },
    {
        name: [6, 0, 12],
        points: "300000000"
    },
    {
        name: [7, 0, 11],
        points: "200000000"
    },
    {
        name: [9, 20, 15],
        points: "100000000"
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

        this.setData(this.getSavedData());
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

    getSavedData() {
        const savedData = localStorage.getItem('highScoreData')
        if(savedData !== null) {
        return JSON.parse(savedData);
        }else{
            return DEFAULT_HIGH_SCORE_DATA;
        }
    }

    saveData(data) {
        localStorage.setItem('highScoreData', JSON.stringify(data));
    }

}
