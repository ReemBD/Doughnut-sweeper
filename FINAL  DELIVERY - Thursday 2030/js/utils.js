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

function buildBoard(SIZE) {
  gNextId = 101;
  var mat = []
  for (var i = 0; i < SIZE; i++) {
      var row = []
      for (var j = 0; j < SIZE; j++) {
          row.push({
              id: gNextId++,
              location: { i, j },
              minesAroundCount: 0,
              isShown: false,
              isMine: false,
              isMarked: false
          })
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

function startTimer() {
  gStartingTime = Date.now()
  gTimeCountInterval = setInterval(countTime, 1000);
}

function countTime() {
  var elTimer = document.querySelector('.timer');
  var now = Date.now();
  var timerSeconds = (now - gStartingTime) / 1000
  var timerMins = timerSeconds / 60

  /* FIXED TIME */
  var secondsFixed = Math.floor(timerSeconds);
  var timerMinsFixed = Math.floor(timerMins)
  var secondsForMins = secondsFixed % 60;

  /* TIME TO STRING */
  if (timerSeconds < 60) elTimer.innerText = (timerSeconds > 9) ? '00:' + secondsFixed : '00:0' + secondsFixed;
  if (secondsForMins < 10) elTimer.innerText = (timerMins > 9) ? timerMinsFixed + ':0' + secondsForMins : '0' + timerMinsFixed + ':0' + secondsForMins;
  else elTimer.innerText = (timerMins > 9) ? timerMinsFixed + ':' + secondsForMins : '0' + timerMinsFixed + ':' + secondsForMins;
}
