// =======================
//     symbol choice
// =======================
let playerSymbol = null;
let computerSymbol = null;
let currentPlayer = "player";

const symbolChoiceButtons = document.querySelectorAll(".symbol-choice");
symbolChoiceButtons.forEach((btn) => {
    btn.onclick = (e) => {
        resetGame();
        const choosenSymbol = e.target.dataset.symbol;
        playerSymbol = choosenSymbol;
        computerSymbol = playerSymbol == "x" ? "o" : "x";
        e.target.classList.add("active");
    };
});

// =======================
//   difficulty choice
// =======================
const difficultyInputs = document.querySelectorAll("input[name='difficulty']");

const difficultyCheckedInput = document.querySelector(
    "input[name='difficulty']:checked"
);

let difficultyChoice = difficultyCheckedInput
    ? difficultyCheckedInput.value
    : null;

difficultyInputs.forEach((input) => {
    input.onchange = (e) => {
        difficultyChoice = input.value;
    };
});

// =======================
//       game play
// =======================
let game = [, , , , , , , , ,];
let isGamePlaying = true;
const resultDisplay = document.querySelector(".result .result-text");

const gameBoard = document.querySelector(".game-board");
const gameBoardCells = document.querySelectorAll(".game-cell");

gameBoardCells.forEach((cell) => {
    cell.onclick = (e) => {
        if (!isGamePlaying) return;
        const cellId = e.target.dataset.cellId;
        if (game[cellId] == undefined && playerSymbol) {
            console.log("got in the player");
            currentPlayer = "player";
            game[cellId] = playerSymbol;
            console.log(game);
            cell.textContent = playerSymbol;
            checkResult();
            computerTurn();
        }
    };
});

function computerTurn() {
    if (!isGamePlaying) return;
    if (difficultyChoice == "easy") {
        while (true) {
            const randomIndex = Math.floor(Math.random() * game.length);
            if (isGamePlaying && game[randomIndex] == undefined) {
                console.log("got in the computer");
                currentPlayer = "computer";
                game[randomIndex] = computerSymbol;
                console.log(game);
                gameBoardCells[randomIndex].textContent = computerSymbol;
                checkResult();
                break;
            }
        }
    } else {
        // TODO: hard mode
    }
}

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
];

function checkResult() {
    // gather all the player and computer spots indexes
    const playerIndexes = game.reduce((acc, val, index) => {
        if (val === playerSymbol) acc.push(index);
        return acc;
    }, []);
    const computerIndexes = game.reduce((acc, val, index) => {
        if (val === computerSymbol) acc.push(index);
        return acc;
    }, []);

    // if neither part didn't reach 3 moves stop
    if (playerIndexes.length < 3 && computerIndexes.length < 3) return;

    // check for win or loss
    for (const combo of winCombos) {
        if (combo.every((val) => playerIndexes.includes(val))) {
            showResult("You Won ! 🙌");
            return; // stop further checking
        }
        if (combo.every((val) => computerIndexes.includes(val))) {
            showResult("You Lost ! 😭");
            return; // stop further checking
        }
    }

    // check for draw if no one won and board is full
    if (Array.from(game).every((cell) => cell === "x" || cell === "o")) {
        showResult("It's a draw !");
        return;
    }
}

function showResult(string) {
    resultDisplay.textContent = string;
    isGamePlaying = false;
}

// reset game
function resetGame() {
    playerSymbol = null;
    computerSymbol = null;
    game = game.map((value) => undefined);
    gameBoardCells.forEach((cell) => {
        cell.innerHTML = "";
    });
    symbolChoiceButtons.forEach((btn) => {
        btn.classList.remove("active");
    });
}
