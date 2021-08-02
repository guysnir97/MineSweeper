'use strict';
const MINE = '💣';
const FLAG = '🚩';
var gBoard;
var myTime;
var gisFirstClick;
var gLevel = {
  size: 4,
  mines: 2,
};
var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
};
// gBoard = buildBoard();

var gBoardTes = buildBoard();
function initGame() {
  gisFirstClick = true;
  gGame.shownCount = 0;
  gGame.markedCount = 0;
  gGame.isOn = true;
  gBoard = buildBoard();
  setMins();
  setMinesNegsCount(gBoard);
  renderBoard(gBoard);
}
function startGame() {
  stopTimer();
  initGame();
  document.querySelector('.message').style.display = 'none';
  document.querySelector('.start').style.display = 'block';
  document.querySelector('.stopwatch').style.display = 'block';
}

function buildBoard() {
  var board = [];
  for (var i = 0; i < gLevel.size; i++) {
    board[i] = [];
    for (var j = 0; j < gLevel.size; j++) {
      board[i][j] = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
      };
    }
  }
  return board;
}

function renderBoard(board) {
  var cellContant;
  var strHTML = '<table><tbody>';
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < board[0].length; j++) {
      cellContant = gBoard[i][j].isMine ? MINE : board[i][j].minesAroundCount;
      strHTML += `<td id="cell${i}-${j}" oncontextmenu=cellMarked(this,${i},${j}) 
       onclick="cellClicked(this,${i},${j})"><span class="hidden">${cellContant}</span>
      </td>`;
    }
    strHTML += '</tr>';
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector('.board-container');
  elContainer.innerHTML = strHTML;
}

function setMins() {
  var cells = getCells();
  for (var i = 0; i < gLevel.mines; i++) {
    var currentCell = cells.splice(
      getRandomInt(0, gBoard.length ** 2 - 1),
      1
    )[0];
    currentCell.isMine = true;
  }
}
function getCells() {
  var listCells = [];
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard.length; j++) {
      var curentcell = gBoard[i][j];
      listCells.push(curentcell);
    }
  }

  return listCells;
}

function setMinesNegsCount(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
      if (!board[i][j].isMine)
        board[i][j].minesAroundCount = countMineNegs(i, j, board);
    }
  }
  return board;
}
function countMineNegs(cellI, cellJ, board) {
  var mineNegs = 0;
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= board.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue;
      if (j < 0 || j >= board[i].length) continue;
      if (board[i][j].isMine) mineNegs++;
    }
  }
  if (mineNegs === 0) {
    mineNegs = '';
  }
  return mineNegs;
}
function isFirstClick() {
  if (gisFirstClick) {
    gisFirstClick = false;
    startTimer();
    document.querySelector('.start').style.display = 'block';
    document.querySelector('.stopwatch').style.display = 'block';
  }
}
function cellClicked(elCell, i, j) {
  isFirstClick();
  if (!gGame.isOn) return;
  if (gBoard[i][j].isShown) return;
  if (gBoard[i][j].isMarked) return;
  if(gBoard[i][j].minesAroundCount ==='') showCellNegs(i,j)
  if (gBoard[i][j].isMine) {
    showMine();
    GameOver();
  }
  if (!gBoard[i][j].isShown && !gBoard[i][j].isMine) {
    gBoard[i][j].isShown = true;
    gGame.shownCount++;
    document
      .querySelector('#' + elCell.id + ' .hidden ')
      .classList.remove('hidden');
    elCell.style.backgroundColor = 'red';
  }
  isGameWon();
}

function cellMarked(elCell, i, j) {
  console.log('hi');
  isFirstClick();
  if (gBoard[i][j].isShown) return;
  if (gBoard[i][j].isMarked) return;
  if (gGame.markedCount === gLevel.mines) return;
  gBoard[i][j].isMarked = true;
  gGame.markedCount++;
  elCell.children[0].classList.remove('hidden')
  elCell.children[0].innerHTML = FLAG;
  isGameWon();
}

function GameOver() {
  gGame.isOn = false;
  stopTimer();
  var elText = document.querySelector('.message');
  elText.style.display = 'block';
  elText.innerHTML = `you lost!`;
}

function isGameWon() {
  if (gGame.shownCount === gLevel.size ** 2 - gGame.markedCount) {
    gGame.isOn = false;
    stopTimer();
    var elText = document.querySelector('.message');
    elText.style.display = 'block';
    elText.innerHTML = `you won!`;
  }
}
function changeSize(size, mines) {
  if (size === 4 && mines === 2) {
    gLevel.size = 4;
    gLevel.mines = 2;
  }
  if (size === 8 && mines === 4) {
    gLevel.size = 8;
    gLevel.mines = 4;
  }
  if (size === 10 && mines === 3) {
    gLevel.size = 10;
    gLevel.mines = 3;
  }
  initGame();
}
function showMine() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard.length; j++) {
      var curCell = document.querySelector(`#cell${i}-${j} span`);
      if (gBoard[i][j].isMine) {
        curCell.classList.remove('hidden');
      }
    }
  }
}
