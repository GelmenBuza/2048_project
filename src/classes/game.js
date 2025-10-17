import Cell from "./cells";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


export default class Game {

    constructor() {
        this.cellSize = 100;
        this.cellCount = 2;

        this.score = 0;
        this.bestScore = 0;

        this.gameError = {
            top: false,
            bottom: false,
            left: false,
            right: false,
        }

        this.cells = [
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null]
        ];
    }

    getEmptyCells() {
        const result = [];
        for (let i = 0; i < this.cells.length; i += 1) {
            for (let j = 0; j < this.cells[i].length; j += 1) {
                if (this.cells[i][j] === null) {
                    result.push([i, j])
                }
            }
        }
        return result;
    }

    getCountCells() {
        let count = 0
        for (let i = 0; i < this.cells.length; i += 1) {
            for (let j = 0; j < this.cells[i].length; j += 1) {
                if (this.cells[i][j] !== null) {
                    count += 1;
                }
            }
        }
    }

    generateNewGame() {
        console.log(this.gameError)
        this.gameError = {
            top: false,
            bottom: false,
            left: false,
            right: false,
        }
        this.cells = [
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null]
        ]

        this.spawnCells();
        this.spawnCells();
    }

    spawnCells(x, y, v) {
        if (!x || !y) {
            if (Math.random() > 0.8) {
                v = 4;
            } else {
                v = 2;
            }
            const emptyCords = this.getEmptyCells();

            let [newY, newX] = emptyCords[getRandomInt(emptyCords.length)];
            x = newX;
            y = newY;
        }


        this.cells[y][x] = new Cell(v);
    }

    moveTop() {
        try {
            for (let i = this.cells.length - 1; i >= 0; i -= 1) {
                for (let j = this.cells[i].length - 1; j >= 0; j -= 1) {
                    if (!!this.cells[i][j]) {
                        for (let o = i - 1; o >= 0; o -= 1) {
                            if (!this.cells[o][j]) continue;
                            else {
                                if (this.cells[i][j].score === this.cells[o][j].score) {
                                    this.cells[i][j] = new Cell(this.cells[i][j].score + this.cells[o][j].score)
                                    this.cells[o][j] = null;
                                    this.score += this.cells[i][j].score;
                                    break;
                                }
                                else {
                                    break;
                                }
                            }
                        }
                    }
                }
            }

            //Передвежение
            for (let i = 0; i < this.cells.length; i += 1) {
                for (let j = 0; j < this.cells[i].length; j += 1) {
                    if (!this.cells[i][j]) continue;
                    for (let o = 0; o < i; o += 1) {
                        if (!this.cells[o][j]) {
                            this.cells[o][j] = this.cells[i][j];
                            this.cells[i][j] = null;
                        }
                    }
                }
            }
            this.spawnCells();
            this.gameError.top = false;
        }
        catch {
            this.gameError.top = true;
        }

        //Сумма

    }

    moveBottom() {
        try {
            //Сумма
            for (let i = 0; i < this.cells.length; i += 1) {
                for (let j = 0; j < this.cells[i].length; j += 1) {
                    if (!!this.cells[i][j]) {
                        for (let o = i + 1; o < this.cells.length; o += 1) {
                            if (!this.cells[o][j]) continue;
                            else {
                                if (this.cells[i][j].score === this.cells[o][j].score) {
                                    this.cells[i][j] = new Cell(this.cells[i][j].score + this.cells[o][j].score);
                                    this.cells[o][j] = null;
                                    this.score += this.cells[i][j].score;
                                    break;
                                }
                                else {
                                    break;
                                }
                            }
                        }
                    }
                }
            }

            //Передвежение
            for (let i = this.cells.length - 1; i >= 0; i -= 1) {
                for (let j = this.cells[i].length - 1; j >= 0; j -= 1) {
                    if (!this.cells[i][j]) continue;
                    for (let o = this.cells.length - 1; o > i; o -= 1) {
                        if (!this.cells[o][j]) {
                            this.cells[o][j] = this.cells[i][j];
                            this.cells[i][j] = null;
                        }
                    }
                }
            }
            this.spawnCells();
            this.gameError.bottom = false;
        }
        catch {
            this.gameError.bottom = true;
        }

    }

    moveLeft() {
        try {
            // Сумма
            for (let i = this.cells.length - 1; i >= 0; i -= 1) {
                for (let j = this.cells[i].length - 1; j >= 0; j -= 1) {
                    if (!!this.cells[i][j]) {
                        for (let o = j - 1; o >= 0; o -= 1) {
                            if (!this.cells[i][o]) continue;
                            else {
                                if (this.cells[i][j].score === this.cells[i][o].score) {
                                    this.cells[i][j] = new Cell(this.cells[i][j].score + this.cells[i][o].score)
                                    this.cells[i][o] = null;
                                    this.score += this.cells[i][j].score;
                                    break;
                                }
                                else {
                                    break;
                                }
                            }
                        }
                    }
                }
            }

            // Передвежение
            for (let i = 0; i < this.cells.length; i += 1) {
                for (let j = 0; j < this.cells[i].length; j += 1) {
                    if (!this.cells[i][j]) continue;
                    for (let o = 0; o < j; o += 1) {
                        if (!this.cells[i][o]) {
                            this.cells[i][o] = this.cells[i][j];
                            this.cells[i][j] = null;
                        }
                    }
                }
            }
            this.spawnCells();
            this.gameError.left = false;
        }
        catch {
            this.gameError.left = true;
        }
    }

    moveRight() {
        try {
            // Сумма
            for (let i = 0; i < this.cells.length; i += 1) {
                for (let j = 0; j < this.cells[i].length; j += 1) {
                    if (!!this.cells[i][j]) {
                        for (let o = j + 1; o < this.cells[i].length; o += 1) {
                            if (!this.cells[i][o]) continue;
                            else {
                                if (this.cells[i][j].score === this.cells[i][o].score) {
                                    this.cells[i][j] = new Cell(this.cells[i][j].score + this.cells[i][o].score)
                                    this.cells[i][o] = null;
                                    this.score += this.cells[i][j].score;
                                    break;
                                }
                                else {
                                    break;
                                }
                            }
                        }
                    }
                }
            }

            // Передввежение
            for (let i = 0; i < this.cells.length; i += 1) {
                for (let j = this.cells[i].length - 1; j >= 0; j -= 1) {
                    if (!this.cells[i][j]) continue;
                    for (let o = this.cells[i].length - 1; o > j; o -= 1) {
                        if (!this.cells[i][o]) {
                            this.cells[i][o] = this.cells[i][j];
                            this.cells[i][j] = null;
                        }
                    }
                }
            }
            this.spawnCells();
            this.gameError.right = false;
        }
        catch {
            this.gameError.right = true;
        }

    }
}
