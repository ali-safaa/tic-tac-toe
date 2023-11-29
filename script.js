const button = document.querySelector("[data-resetGame]");
const boxes = document.querySelectorAll("[data-box]");
const game = document.querySelector("[data-game]");

let arr = new Array(9).fill(null);
let turn = "x";
let player_turn;

function nextTurn() {
     if (turn == "x") {
          turn = "o";
     } else {
          turn = "x";
     }
}

function updateBoard() {
     for (let i = 0; i < arr.length; i++) {
          const boxes = document.querySelector(`[data-box='${i}']`);
          player_turn = arr[i] == "x" ? "x-turn" : "o-turn"; // if player x will be blue else will be red.
          boxes.innerHTML = `<h1 class="${player_turn}">${
               arr[i] ? arr[i] : ""
          }</h1>`;
     }
}

boxes.forEach((box) => {
     box.addEventListener("click", () => {
          onClickBox(box.dataset.box);
          if (findWinningCombinations()) {
               setTimeout(() => {
                    game.innerHTML = `<h1 class="winner-player">winner (${
                         arr[box.dataset.box]
                    })</h1>`;
               }, 1000);
          } else {
               return null;
          }
     });
});

// creating value in the arr and send it to update board to show on boxes
function onClickBox(i) {
     createMove(i);
     nextTurn();
     updateBoard();
}

function createMove(i) {
     if (winner()) return;

     if (arr[i]) return;

     arr[i] = turn;
}

// finding the winner
function findWinningCombinations() {
     const winningCombinations = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [2, 4, 6],
          [0, 4, 8],
     ];

     for (const Combination of winningCombinations) {
          const [a, b, c] = Combination;
          if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
               return Combination;
          }
     }
     return null;
}

function winner() {
     const winningCombinations = findWinningCombinations();
     if (winningCombinations) {
          return true;
     } else {
          return false;
     }
}

button.addEventListener("click", () => document.location.reload());
