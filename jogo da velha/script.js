
const boardElement = document.getElementById('board');
const statusEl = document.getElementById('status');
const currentPlayerEl = document.getElementById('currentPlayer');
const scoreXEl = document.getElementById('scoreX');
const scoreOEl = document.getElementById('scoreO');
const scoreEmpateEl = document.getElementById('scoreEmpate');
const btnReset = document.getElementById('btnReset');
const btnNovaPartida = document.getElementById('btnNovaPartida');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let scores = { X: 0, O: 0, Empates: 0 };
const winningCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];
function createBoard(){
  boardElement.innerHTML = ''; 
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.setAttribute('role', 'button');
    cell.setAttribute('aria-label', 'célula ' + (i+1));
    cell.addEventListener('click', onCellClick);
    boardElement.appendChild(cell);
  }
}
function onCellClick(e){
  const index = Number(e.currentTarget.getAttribute('data-index'));
  if (!gameActive) return;
  if (board[index] !== '') {
    const cell = e.currentTarget;
    cell.classList.add('taken');
    setTimeout(() => cell.classList.remove('taken'), 300);
    return;
  }

  // marcar no array e no HTML
  board[index] = currentPlayer;
  e.currentTarget.textContent = currentPlayer;
  e.currentTarget.classList.add('taken');
  const result = checkResult();
  if (result === 'win') {
    scores[currentPlayer] += 1;
    updateScoreboard();
    statusEl.innerHTML = 'Vitória! Jogador <strong>' + currentPlayer + '</strong> venceu!';
    gameActive = false;
    return;
  } else if (result === 'draw') {
    scores.Empates += 1;
    updateScoreboard();
    statusEl.innerHTML = 'Empate! Ninguém venceu.';
    gameActive = false;
    return;
  }
  currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
  currentPlayerEl.textContent = currentPlayer;
  statusEl.textContent = 'Jogador atual: ';
  statusEl.appendChild(currentPlayerEl);
}

function checkResult(){
  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    // estruturas condicionais
    if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
      highlightWin(winningCombos[i]);
      return 'win';
    }
  }
  let vazio = false;
  for (let j = 0; j < board.length; j++) {
    if (board[j] === '') { vazio = true; break; }
  }
  if (!vazio) return 'draw';

  return 'continue';
}

function highlightWin(combo){
  combo.forEach(idx => {
    const cell = boardElement.querySelector('[data-index="' + idx + '"]');
    if (cell) cell.classList.add('win');
  });
}

function updateScoreboard(){
  scoreXEl.textContent = scores.X;
  scoreOEl.textContent = scores.O;
  scoreEmpateEl.textContent = scores.Empates;
}


function resetBoard(){
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  currentPlayerEl.textContent = currentPlayer;
  statusEl.textContent = 'Jogador atual: ';
  statusEl.appendChild(currentPlayerEl);
  createBoard();
}


function novaPartida(){
  scores = { X: 0, O: 0, Empates: 0 };
  updateScoreboard();
  resetBoard();
}
btnReset.addEventListener('click', resetBoard);
btnNovaPartida.addEventListener('click', novaPartida);

createBoard();
updateScoreboard();