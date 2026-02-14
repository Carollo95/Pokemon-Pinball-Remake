const HIGH_SCORE_ARROW_ANIMATION_TIMER = 600;
const HIGH_SCORE_ARROW_FRAME_TIMER = 15;

const HIGH_SCORE_STATE = {
    VIEW: 'VIEW',
    EDIT: 'EDIT'
}

const HIGH_SCORE_TABLES = {
    RED: 'RED',
    BLUE: 'BLUE'
}

const HIGH_SCORE_ROWS = [
    [148],
    [196],
    [244],
    [292],
    [340]
];

const HIGH_SCORE_LETTER_X = [84, 100, 116];
const HIGH_SCORE_NUMBER_X = [148, 164, 180, 196, 212, 228, 244, 260, 276, 292, 308, 324];
const NUMBER_BLANK_FRAME = 10;
const HIGH_SCORE_MAX_DIGITS = 12;
const NUMBER_WIDTH = 16;
const NUMBER_HEIGHT = 24;
const SEPARATOR_WIDTH = 6;
const SEPARATOR_HEIGHT = 8;
const SEPARATOR_OFFSET_X = (NUMBER_WIDTH - SEPARATOR_WIDTH) / 2;
const SEPARATOR_OFFSET_Y = (NUMBER_HEIGHT - SEPARATOR_HEIGHT) / 2 + 2;
const SEPARATOR_POSITIONS_FROM_RIGHT = [4, 7, 10];

const BLUE_NUMBER_COLORS = [[248, 0, 0], [248, 64, 0], [248, 128, 0], [248, 192, 0], [248, 248, 0]];
const RED_NUMBER_COLORS = [[0, 0, 248], [0, 64, 248], [0, 128, 248], [0, 192, 248], [0, 248, 248]];

const RED_ARROW_X = 326;
const RED_ARROW_MAX_X = RED_ARROW_X + 4;
const BLUE_ARROW_X = 58;
const BLUE_ARROW_MAX_X = BLUE_ARROW_X - 4;

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
];

class HighScore extends Sketch {

    constructor() {
        super();
        this.createFrame();
        this.attachControls(new Controls(() => { }, () => { }, () => { }, this.leftFlipperCallback, this.centerFlipperCallback, this.rightFlipperCallback));
    }

    leftFlipperCallback = () => {
        if (this.state === HIGH_SCORE_STATE.VIEW && this.table === HIGH_SCORE_TABLES.BLUE) {
            this.switchTable(HIGH_SCORE_TABLES.RED);
        } else if (this.state === HIGH_SCORE_STATE.EDIT) {
            this.moveToPreviousLetter();
        }
    }

    rightFlipperCallback = () => {
        if (this.state === HIGH_SCORE_STATE.VIEW && this.table === HIGH_SCORE_TABLES.RED) {
            this.switchTable(HIGH_SCORE_TABLES.BLUE);
        } else if (this.state === HIGH_SCORE_STATE.EDIT) {
            this.moveToNextLetter();
        }
    }

    centerFlipperCallback = () => {
        if (this.state === HIGH_SCORE_STATE.EDIT) {
            this.moveToNextCharacter();
        } else {
            console.log("Go to main menu");
        }
    }

    setup(table, newHighScore) {

        this.table = table;
        let savedData = this.getSavedData();
        newHighScore = this.clampHighScore(newHighScore);

        for (let i = 0; i < 5; i++) {
            if (newHighScore !== undefined && newHighScore > parseInt(savedData[i].points)) {
                this.editedRow = i;
                savedData.splice(i, 0, {
                    name: [46, 46, 46],
                    points: newHighScore.toString()
                });
                savedData.pop();
                break;
            }
        }

        this.savedData = savedData;

        if (this.editedRow !== undefined) {
            this.state = HIGH_SCORE_STATE.EDIT;
            this.editedLetter = 0;
            this.createDataSprites();
            this.changeBackground(this.table);
            this.setData(savedData);
            Audio.playMusic('entryName');
        } else {
            this.state = HIGH_SCORE_STATE.VIEW;
            this.createSwitchArrow();
            this.switchTable(this.table);
            Audio.playMusic('highScoreScreen');
        }
    }

    clampHighScore(newHighScore) {
        if (newHighScore !== undefined) {
            newHighScore = Number(newHighScore);
            if (newHighScore > 999999999999) {
                newHighScore = 999999999999;
            }
        }
        return newHighScore;
    }

    changeBackground(table) {
        switch (table) {
            case HIGH_SCORE_TABLES.RED:
                this.background = Asset.getBackground('highScoreRed');
                break;
            case HIGH_SCORE_TABLES.BLUE:
                this.background = Asset.getBackground('highScoreBlue');
                break;
        }
    }

    createDataSprites() {
        this.letterMatrix = HIGH_SCORE_ROWS.map(([y]) => HIGH_SCORE_LETTER_X.map((x) => this.createLetterSprite(x, y)));
        this.numberMatrix = HIGH_SCORE_ROWS.map(([y], i) => HIGH_SCORE_NUMBER_X.map((x) => this.createNumberSprite(x, y, this.getColors()[i])));
        const separatorIndexes = this.getSeparatorIndexes();
        this.separatorMatrix = HIGH_SCORE_ROWS.map(([y]) =>
            separatorIndexes.map((index) => {
                const x = HIGH_SCORE_NUMBER_X[index];
                return this.createSeparatorSprite(x + SEPARATOR_OFFSET_X, y + SEPARATOR_OFFSET_Y);
            }));
    }

    removeDataSprites() {
        if (this.letterMatrix) this.letterMatrix.forEach(row => row.forEach(sprite => sprite.remove()));
        if (this.numberMatrix) this.numberMatrix.forEach(row => row.forEach(sprite => sprite.remove()));
        if (this.separatorMatrix) this.separatorMatrix.forEach(row => row.forEach(sprite => sprite.remove()));
    }

    getColors() {
        switch (this.table) {
            case HIGH_SCORE_TABLES.RED:
                return RED_NUMBER_COLORS;
            case HIGH_SCORE_TABLES.BLUE:
                return BLUE_NUMBER_COLORS;
        }
    }

    createSwitchArrow() {
        this.arrowSprite = new Sprite(RED_ARROW_X, 362, 36, 20, "static");
        this.arrowSprite.layer = SCENARIO_LAYER;
        this.arrowSprite.debug = DEBUG;
        this.arrowSprite.addAnimation("default", Asset.getAnimation('HighScoreArrow'));
        this.arrowSprite.visible = this.state === HIGH_SCORE_STATE.VIEW;

        this.arrowSpriteAnimationTimer = new EventTimer(HIGH_SCORE_ARROW_ANIMATION_TIMER);
        this.arrowSpriteFrameTimer = new EventTimer(HIGH_SCORE_ARROW_FRAME_TIMER);
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

    createSeparatorSprite(x, y) {
        let sprite = new Sprite(x, y, SEPARATOR_WIDTH, SEPARATOR_HEIGHT, "static");
        sprite.layer = OVER_SCENARIO_LAYER;
        sprite.debug = DEBUG;
        sprite.addAnimation("default", Asset.getAnimation('HighScoreNumberSeparator'));
        sprite.ani.playing = false;
        return sprite;
    }

    getSeparatorIndexes() {
        return SEPARATOR_POSITIONS_FROM_RIGHT.map((position) => HIGH_SCORE_MAX_DIGITS - position);
    }

    setData(data) {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 3; j++) {
                this.letterMatrix[i][j].ani.frame = data[i].name[j];
            }
        }
        for (let i = 0; i < 5; i++) {
            let points = String(data[i].points ?? "");
            if (points.length > HIGH_SCORE_MAX_DIGITS) {
                points = "9".repeat(HIGH_SCORE_MAX_DIGITS);
            }
            const startIndex = Math.max(0, HIGH_SCORE_MAX_DIGITS - points.length);
            for (let j = 0; j < HIGH_SCORE_MAX_DIGITS; j++) {
                if (j < startIndex) {
                    this.numberMatrix[i][j].ani.frame = NUMBER_BLANK_FRAME;
                } else {
                    const digit = points[j - startIndex];
                    this.numberMatrix[i][j].ani.frame = digit === undefined ? NUMBER_BLANK_FRAME : Number(digit);
                }
            }
            if (this.separatorMatrix) {
                for (let j = 0; j < SEPARATOR_POSITIONS_FROM_RIGHT.length; j++) {
                    const showSeparator = points.length >= SEPARATOR_POSITIONS_FROM_RIGHT[j];
                    this.separatorMatrix[i][j].visible = showSeparator;
                }
            }
        }
    }

    draw() {
        super.draw();

        if (this.state === HIGH_SCORE_STATE.VIEW) {
            this.updateSwitchArrow();
        }
    }

    updateSwitchArrow() {
        if (this.arrowSpriteAnimationTimer.hasElapsed()) {
            if (this.arrowSpriteFrameTimer.hasElapsed()) {
                if (this.arrowSprite.mirror.x) {
                    this.arrowSprite.x = this.arrowSprite.x - 1;
                    if (this.arrowSprite.x < BLUE_ARROW_MAX_X) {
                        this.arrowSprite.x = BLUE_ARROW_X;
                        this.arrowSpriteAnimationTimer.restart();
                    }
                } else {
                    this.arrowSprite.x = this.arrowSprite.x + 1;
                    if (this.arrowSprite.x > RED_ARROW_MAX_X) {
                        this.arrowSprite.x = RED_ARROW_X;
                        this.arrowSpriteAnimationTimer.restart();
                    }
                }
                this.arrowSpriteFrameTimer.restart();

            }
        }
    }

    getSavedData() {
        const savedData = localStorage.getItem('highScoreData-' + this.table)
        if (savedData !== null) {
            return JSON.parse(savedData);
        } else {
            return DEFAULT_HIGH_SCORE_DATA;
        }
    }

    switchTable(newTable) {
        this.table = newTable;
        switch (this.table) {
            case HIGH_SCORE_TABLES.RED:
                this.arrowSprite.x = RED_ARROW_X;
                this.arrowSprite.mirror.x = false;
                break;
            case HIGH_SCORE_TABLES.BLUE:
                this.arrowSprite.x = BLUE_ARROW_X;
                this.arrowSprite.mirror.x = true;
                break;
        }
        this.changeBackground(this.table);
        this.removeDataSprites();
        this.createDataSprites();
        this.setData(this.getSavedData());
    }

    saveData(data) {
        localStorage.setItem('highScoreData-' + this.table, JSON.stringify(data));
    }

    moveToPreviousLetter() {
        if (this.letterMatrix[this.editedRow][this.editedLetter].ani.frame <= 0) {
            this.letterMatrix[this.editedRow][this.editedLetter].ani.frame = 46;
        } else {
            this.letterMatrix[this.editedRow][this.editedLetter].ani.frame--;
        }
    }

    moveToNextLetter() {
        if (this.letterMatrix[this.editedRow][this.editedLetter].ani.frame >= 46) {
            this.letterMatrix[this.editedRow][this.editedLetter].ani.frame = 0;
        } else {
            this.letterMatrix[this.editedRow][this.editedLetter].ani.frame++;
        }
    }

    moveToNextCharacter() {
        this.editedLetter++;
        if (this.editedLetter > 2) {
            this.saveData(this.getData());
            this.changeToView();
        }
    }

    getData() {
        const data = [];
        for (let i = 0; i < 5; i++) {
            data.push({
                name: [
                    this.letterMatrix[i][0].ani.frame,
                    this.letterMatrix[i][1].ani.frame,
                    this.letterMatrix[i][2].ani.frame
                ],
                points: this.savedData[i].points
            });
        }
        return data;
    }

    changeToView() {
        this.editedRow = undefined;
        this.setup(this.table, 0);
    }

}
