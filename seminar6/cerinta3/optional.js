// Tic Tac Toe functional

let board = Array(9).fill(null);
let currPlayer = "X";
let gameActive = true;

let statusElem = document.getElementById("status");
let resetBtn = document.getElementById("reset");

const squares = document.querySelectorAll(".square");
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // randuri
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // coloane
  [0, 4, 8],
  [2, 4, 6], // diagonale
];

function checkWinner() {
  // parcurgem toate liniile castigatoare posibile
  // daca intalnim 3 valori X/O pe una dintre ele, jucatorul respectiv castiga
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      statusElem.textContent = `Player ${board[a]} WINS!`;
      gameActive = false;
      return true;
    }
  }

  // toate pozitiile sunt ocupate iar verificarea anterioara nu a fost indeplinita
  // nu avem castigator, insa jocul se incheie
  if (!board.includes(null)) {
    statusElem.textContent = "DRAW!";
    gameActive = false;
    return true;
  }

  // inca nu avem un castigator, continuam jocul
  return false;
}

function handleClick(e) {
  const square = e.target;
  const index = Array.from(squares).indexOf(square);

  // patrat deja ocupat sau joc terminat
  if (board[index] || !gameActive) return;

  board[index] = currPlayer;
  square.textContent = currPlayer;
  square.classList.add(currPlayer.toLowerCase());

  if (checkWinner()) return;

  currPlayer = currPlayer === "X" ? "O" : "X";
  statusElem.textContent = `Player ${currPlayer}'s turn`;
}

function resetGame() {
  board.fill(null);
  currPlayer = "X";
  gameActive = true;
  squares.forEach((square) => {
    square.textContent = "";
    square.classList.remove("x", "o");
  });
  statusElem.textContent = "Player X's turn";
}

squares.forEach((square) => square.addEventListener("click", handleClick));
resetBtn.addEventListener("click", resetGame);
