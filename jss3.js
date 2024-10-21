let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;
let opponent = "player";
const statusDisplay = document.getElementById("status");
const opponentDisplay = document.getElementById("opponent");

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("reset");

document.getElementById("player-vs-player").addEventListener("click", () => {
    opponent = "player";
    opponentDisplay.textContent = "Player";
    resetGame();
});

document.getElementById("player-vs-computer").addEventListener("click", () => {
    opponent = "computer";
    opponentDisplay.textContent = "Computer";
    resetGame();
});

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleCellClick(index));
});

resetButton.addEventListener("click", resetGame);

function handleCellClick(index) {
    if (board[index] !== "" || !isGameActive) return;

    updateBoard(index, currentPlayer);
    checkResult();

    if (opponent === "computer" && currentPlayer === "O" && isGameActive) {
        setTimeout(() => computerMove(), 500);
    }
}

function updateBoard(index, player) {
    board[index] = player;
    document.getElementById(`cell-${index}`).textContent = player;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function computerMove() {
    let emptyCells = board.map((val, idx) => (val === "" ? idx : null)).filter((val) => val !== null);
    let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    updateBoard(randomCell, "O");
    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer === "X" ? "O" : "X"} has won!`;
        isGameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusDisplay.textContent = "It's a draw!";
        isGameActive = false;
        return;
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameActive = true;
    statusDisplay.textContent = `Playing against: ${opponentDisplay.textContent}`;
    cells.forEach((cell) => (cell.textContent = ""));
}
