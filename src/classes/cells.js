import colors from "../colors.js";

export default class Cell {
    
    constructor (score) {
        this.score = score;
        this.color = colors[`c_${score}`];
        if (score > 4) {
            this.fontColor = 'black'
        }
    }

    getScore () {
        return this.score;
    }

    getColor () {
        return this.color;
    }

}