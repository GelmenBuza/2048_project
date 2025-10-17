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
        

        this.cells[y][x] = new Cell(v)
    }

    getCells() {
        return this.cells;
    }
}
