const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
const scoreDrawElement = document.getElementById('scoreDraw');

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

let options = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let running = false;

let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;

initializeGame();

function initializeGame() {
  cells.forEach(cell => cell.addEventListener('click', cellClicked));
  resetButton.addEventListener('click', resetGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function cellClicked() {
  const cellIndex = this.getAttribute('cellIndex');
  if (options[cellIndex] !== '' || !running) return;

  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer, 'clicked');
}

function changePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const condition = winningConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA === '' || cellB === '' || cellC === '') continue;

    if (cellA === cellB && cellB === cellC) {
      roundWon = true;
      condition.forEach(index => {
        document.querySelector(`[cellIndex="${index}"]`).classList.add('winning-cell');
      });
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} wins!`;
    running = false;

    // Update score
    if (currentPlayer === 'X') {
      scoreX++;
      scoreXElement.textContent = scoreX;
    } else {
      scoreO++;
      scoreOElement.textContent = scoreO;
    }
  } else if (!options.includes('')) {
    statusText.textContent = 'Draw!';
    running = false;

    // Update draw score
    scoreDraw++;
    scoreDrawElement.textContent = scoreDraw;
  } else {
    changePlayer();
  }
}

function resetGame() {
  currentPlayer = 'X';
  options = ['', '', '', '', '', '', '', '', ''];
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.className = 'cell'; // Reset classes
  });
  running = true;
}
