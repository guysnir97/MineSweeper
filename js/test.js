
console.log(changeSize)
function changeSize(number = 4, mines = 2) {
    var minesAndSizeBoard = {};
    if (number === 4 && mines === 2) {
      minesAndSizeBoard.number = number;
      minesAndSizeBoard.mines = mines;
    }
    if (number === 12 && mines === 4) {
      minesAndSizeBoard.number = number;
      minesAndSizeBoard.mines = mines;
    }
    if (number === 30 && mines === 12) {
      minesAndSizeBoard.number = number;
      minesAndSizeBoard.mines = mines;
    }
    return minesAndSizeBoard;
  }
  