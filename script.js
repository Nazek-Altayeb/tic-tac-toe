let restartBtn = document.getElementById("restartBtn");
let Player = document.getElementById("player");
let boxes = Array.from(document.getElementsByClassName("box"));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);

const firstPlayer = "X";
const secondPlayer = "O";
let currentPlayer = firstPlayer;
let spaces = Array(9).fill(null);

const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", fillBox));
};

const fillBox = (event) => {
  const id = event.target.id;
  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    event.target.innerText = currentPlayer;
    if (playerHasWon() !== false) {
      player.innerText = `${currentPlayer} has won !`;
      let winningBlocks = playerHasWon();
      winningBlocks.map(
        (box) => (boxes[box].style.backgroundColor = winnerIndicator)
      );
      return;
    }

    currentPlayer = currentPlayer == firstPlayer ? secondPlayer : firstPlayer;
  }
};

const restartGame = () => {
  spaces.fill(null);
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
  });
  player.innerHTML = "Tic Tac Toe";
  currentPlayer = firstPlayer;
};

restartBtn.addEventListener("click", restartGame);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const playerHasWon = () => {
  for (const combination of winningCombinations) {
    let [a, b, c] = combination;

    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
};

startGame();
