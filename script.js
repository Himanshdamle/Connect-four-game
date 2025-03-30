const game = [
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
];

const gameBoardLength = game.length;

const container = document.querySelector("#playable-balls-box");

let whichColor = "blue";
container.addEventListener(
  "mouseenter",
  (e) => {
    if (e.target !== container) {
      e.target.classList.add(turn);
      container.style.borderColor = whichColor;
    }
  },
  true
);
container.addEventListener(
  "mouseleave",
  (e) => {
    if (e.target !== container) {
      e.target.classList.remove(turn, !turn);
      container.style.borderColor = whichColor;
    }
  },
  true
);

const cols = document.querySelectorAll(".column");
let turn = false; // false = 'blue', true = 'red'

container.addEventListener(
  "click",
  (e) => {
    document.querySelector(".intro-box").style.display = "none";
    if (e.target === container) return;

    const col = document.getElementsByClassName(e.target.classList[1])[1];

    const cellPicked = [...col.children]
      .reverse()
      .find((cell) => cell.getAttribute("filled") !== "true");
    cellPicked.classList.add(turn);
    cellPicked.setAttribute("filled", "true");
    const [preciseRow, preciseCol] = cellPicked
      .getAttribute("index")
      .match(/\d+/g)
      .map(Number);
    /**
     *index.match(/\d+/g) extracts all numbers from the string "[5][4]" → Result: ["5", "4"]
     *.map(Number) converts them into integers → [5, 4]
     */
    game[preciseRow][preciseCol] = turn;

    if (checkVertical(turn, preciseRow, preciseCol)) return;
    else if (checkWin(turn, preciseRow, preciseCol, false)) return;
    else if (
      checkWin(turn, preciseRow, preciseCol, true, "left") ||
      checkWin(turn, preciseRow, preciseCol, true, "rigth")
    )
      return;

    turn = !turn;
    e.target.classList.remove(!turn);
    e.target.classList.add(turn);
    whichColor = turn ? "red" : "blue";
    container.style.borderColor = whichColor;
  },
  true
);

function checkVertical(color, row, col) {
  if (row + 1 >= gameBoardLength) return;
  let move = 1;
  for (let i = 0; i < move; i++) {
    row++;
    if (row >= gameBoardLength) return;

    const check = game[row][col];
    if (check === !color) return;
    else move++;

    if (move === 4) {
      color ? declareWinner("RED") : declareWinner("BLUE");
      return true;
    }
  }
}

function checkWin(color, row, col, isDiagonal, diagonalDir) {
  let count = 1;
  const initialCol = col,
    initialRow = row;
  let moveRight = true;

  while (true) {
    // Adjust row/col based on direction
    if (isDiagonal) {
      row += moveRight
        ? diagonalDir === "right"
          ? -1
          : 1
        : diagonalDir === "right"
        ? 1
        : -1;
    }
    col += moveRight ? 1 : -1;

    if (
      row < 0 ||
      row >= gameBoardLength ||
      col < 0 ||
      col >= gameBoardLength ||
      game[row][col] !== color
    ) {
      // Reset to the initial position and switch direction
      if (!moveRight) break;
      moveRight = false;
      row = initialRow;
      col = initialCol;
    } else {
      count++;
    }

    if (count >= 4) {
      color ? declareWinner("RED") : declareWinner("BLUE");
      return true;
    }
  }
}

function startConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });

  setTimeout(() => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.7 },
    });
  }, 500);
}

function declareWinner(player) {
  const winnerPopup = document.getElementById("winner-popup");
  const winnerText = document.getElementById("winner-text");
  winnerText.innerText = `🎉 ${player ? "Red" : "Blue"} Wins! 🎉`;
  winnerPopup.classList.remove("hidden");

  startConfetti();

  container.style.pointerEvents = "none";
}

document.getElementById("restart-btn").addEventListener("click", () => {
  location.reload();
});
