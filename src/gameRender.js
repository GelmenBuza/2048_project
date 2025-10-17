import Game from "./classes/game"

const newGame = document.querySelector('.newGame')
const bestScore = document.querySelector('.bestScore')
const currentScore = document.querySelector('.currentScore')
const gameField = document.querySelector('.gameCells')

const game = new Game();

function render(game) {
    gameField.innerHTML = "";
    currentScore.innerHTML = `${game.score}`;

    // Игровое поле
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

            div.setAttribute("style", `top: ${y * 100 + y * 10}px; left: ${x * 100 + x * 10}px; background-color: ${tile.color}; color: black`);

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

    function overGame(game) {
        console.log(game.gameError)
        if (game.gameError.bottom && game.gameError.left && game.gameError.right && game.gameError.top) {
            document.querySelector('.gameOver').setAttribute("style", `display: flex;`);
            document.getElementById('retry').addEventListener('click', () => {
                document.querySelector('.gameOver').removeAttribute("style", `display: flex;`);
                if (bestScore.textContent < game.score) {
                    bestScore.innerHTML = `${game.score}`;
                }
                game.score = 0;
                game.generateNewGame();
                render(game);
            })
            document.getElementById('overScore').innerHTML = `${game.score}`;
        }
    }

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                game.moveTop();
                overGame(game);
                render(game);
                break;
            case 'ArrowDown':
                game.moveBottom();
                overGame(game);
                render(game);
                break;
            case 'ArrowLeft':
                game.moveLeft();
                overGame(game);
                render(game);
                break;
            case 'ArrowRight':
                game.moveRight();
                overGame(game);
                render(game);
                break;
        }
    });

}