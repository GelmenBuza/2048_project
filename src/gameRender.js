import Game from "./classes/game"

const newGame = document.querySelector('.newGame')
const bestScore = document.querySelector('.bestScore')
const currentScore = document.querySelector('.currentScore')
const gameField = document.querySelector('.gameCells')

const game = new Game();

function render(game) {
    gameField.innerHTML = "";
    for (let y = 0; y < game.cells.length; y++) {
        for (let x = 0; x < game.cells[y].length; x++) {
            if (!game.cells[y][x]) continue;
            // let div = `
            //   <div class="tile position">2</div>
            // `

            const tile = game.cells[y][x];
            let div = document.createElement("div");
            div.innerHTML = tile.score;
            div.classList.add("cellGame");

            div.setAttribute("style", `top: ${y * 100 + y * 10}px; left: ${x * 100 + x * 10}px; background-color: ${tile.color}`);

            gameField.appendChild(div);
        }
    }
}

export default function start() {
    let game = new Game();

    newGame.addEventListener("click", () => {
        game.generateNewGame();
        render(game);
    });
}