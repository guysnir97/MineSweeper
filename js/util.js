function renderCell(locationI, locationJ, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${locationI}-${locationJ}`);
  elCell.innerHTML = value;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function blowUpNegs(cellI, cellJ, mat) {
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= mat.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= mat[i].length) continue;
      if (i === cellI && j === cellJ) continue;
      console.log(mat[i][j]);
      if (mat[i][j] === Mine) {
        // update the model:
        mat[i][j] = '';
        // update the dom:
        renderb(i, j, '');
      }
    }
  }
}

function startTimer() {
  time1 = Date.now();
  myTime = setInterval(timeCycle, 1);
}
function timeCycle() {
  var time2 = Date.now();
  var msTimeDiff = time2 - time1;
  var timeDiffStr = new Date(msTimeDiff).toISOString().slice(17, -1);
  document.querySelector('.stopwatch span').innerHTML = timeDiffStr;
}
function stopTimer() {
  clearInterval(myTime);
}
function showCellNegs(cellI, cellJ) {
  // var elCell = document.querySelector(`#cell${cellI}-${cellJ} span`);
  // console.log(elCell);
  // elCell.classList.remove('hidden');
  // console.log(elCell);
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= gBoard.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= gBoard.length) continue;
      if (gBoard[i][j].isMine) continue;
      if (gBoard[i][j].isShown) continue;
      gGame.shownCount++;
      gBoard[i][j].isShown = true;
      
      var x = document.querySelector(`#cell${i}-${j} .hidden`);
      console.log(`i: ${i}    j: ${j}`)
      console.log(x)
      x.classList.remove('hidden');
      // console.log(x)
      var cell_td = document.querySelector(`#cell${i}-${j}`);
      console.log(cell_td)
      cell_td.style.backgroundColor = 'red';
    }
  }
}
