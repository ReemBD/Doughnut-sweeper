
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
    return count === 0 ? '' : count
}

function revealMines(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            if (cell.isMine) {
                cell.isShown = true;
                renderCell(cell.id);
            }
        }
    }
}

function getRandomMines(level) {
    for (var i = 0; i < level.MINES; i++) {
        getRandomMine(level.SIZE)
    }
}

function getRandomMine(boardSize) {
    var randRow = getRandomInt(0, boardSize)
    var randCol = getRandomInt(0, boardSize)
    var cell = gBoard[randRow][randCol]
    if (cell.isMine || cell.isShown) {
        getRandomMine(boardSize)
        return;
    }
    gBoard[randRow][randCol].isMine = true;
}

function playMineSound() {
    var correctSound = new Audio('sounds/correct.mp4')
    correctSound.play();
}