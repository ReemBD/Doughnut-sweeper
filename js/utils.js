function createMat(ROWS, COLS) {
  var mat = []
  for (var i = 0; i < ROWS; i++) {
    var row = []
    for (var j = 0; j < COLS; j++) {
      row.push('')
    }
    mat.push(row)
  }
  return mat
}

function printMat(mat, selector) {
  var strHTML = '<table class="table" border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;
      strHTML += `<td onclick="cellClicked(${cell.id})"class="` + className + '"> ' + cell + ' </td>'
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

function getCellById(board, cellId) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (board[i][j].id === cellId) return board[i][j];
    }
  }
}
// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}


function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}


function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';

  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  if (color === '#000000') color = '#0000ff';
  return color;
}


function getRandomEmptyLocation() {
  if (gGame.score !== 0) {
    var rowIdx = getRandomInt(0, 10)
    var colIdx = getRandomInt(0, 10)
    var cell = gBoard[rowIdx][colIdx];
    debugger;
    while (cell !== EMPTY) {
      rowIdx = getRandomInt(0, 10)
      colIdx = getRandomInt(0, 10)
      cell = gBoard[rowIdx][colIdx];
    }

    return { i: rowIdx, j: colIdx }
  }
}

/*
if isMine true, adds +1 to the count.
if isShown true, query cell dom, innerText = count
*/

function countMinesAround(mat, rowIdx, colIdx) {
  var count = 0
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i >= mat.length) continue
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (j < 0 || j >= mat.length) continue
      if (rowIdx === i && colIdx === j) continue
      if (mat[i][j].isMine) count++
    }
  }
  return count
}

// function startTime() {
//   gStartingTime = Date.now;
// }
// function timer() {

// }