'use strict'

const CELL = 'cell'
const MINE = 'mine'

var gLevel
var gBoards = []
var gBoard = makeBoard()
renderBoard()

function init() {
    gBoard = makeBoard(gLevel)
    gBoards.push(gBoard)
    renderBoard(gLevel)
}

function makeBoard(level = 1) {
    var sizes = [4, 8, 12]
    var size = sizes[level - 1]
    var board = []
    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            board[i][j] = { type: CELL, isFlaged: false, mineNegsCount: 0, isPressed: false, coord: { i, j }, negs: [] }
        }
    }
    addMines(board, level)
    countBoardNegs(board)
    return board
}

function addMines(board, level = 1) {
    var minesCounts = [2, 12, 30]
    var minesCount = minesCounts[level - 1]
    while (minesCount > 0) {
        var cell = getEmptyCell(board)
        if (cell) cell.type = MINE
        minesCount--
    }
}

function renderBoard(level = 1) {
    var sizes = [4, 8, 12]
    var size = sizes[level - 1]
    var txtHtml = ''
    for (var i = 0; i < size; i++) {
        txtHtml += '<tr>\n'
        for (var j = 0; j < size; j++) {
            var value = gBoard[i][j].ispressed ? gBoard[i][j].mineNegsCount : ''
            if (gBoard[i][j].isFlaged) value = '🏴‍☠️'
            txtHtml += `\t<td class="cell-${i}-${j}" oncontextmenu="cellMarked(event)" onclick="cellClicked(this)">${value}</td>\n`
        }
        txtHtml += '</tr>\n'
    }
    console.log(txtHtml)
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = txtHtml
}





function countCellNegs(cell, mat) {
    var count = 0
    var negs = []
    for (var i = cell.coord.i - 1; i <= cell.coord.i + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cell.coord.j - 1; j <= cell.coord.j + 1; j++) {
            if (j < 0 || j >= mat[i].length) continue;
            if (i === cell.coord.i && j === cell.coord.j) continue;
            negs.push({ i, j })
            if (mat[i][j].type === MINE) count++
        }
    }
    cell.mineNegsCount = count
    cell.negs = negs
}

function countBoardNegs(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            countCellNegs(board[i][j], board)
        }
    }
}

function cellClicked(elCell) {
    var cellClass = elCell.classList[0]
    var coord = getCoorByClass(cellClass)
    var cell = gBoard[coord.i][coord.j]
    if (cell.isFlaged) return

    //modal
    cell.isPressed = true
    if (cell.type === MINE) gemeOver(false)
    else {
        //dom
        elCell.classList.add('pressed')
        var value = (cell.mineNegsCount) ? cell.mineNegsCount : ''
        renderCell(coord, value)
        if (!value) {
            for (var idx = 0; idx < cell.negs.length; idx++) {
                var negCoord = cell.negs[idx]
                var neg = gBoard[negCoord.i][negCoord.j]
                if (neg.type !== MINE) {
                    var elNeg = document.querySelector(getClassByCoor(negCoord))
                    if (neg.mineNegsCount) {
                        neg.isPressed = true
                        elNeg.classList.add('pressed')
                        renderCell(negCoord, neg.mineNegsCount)
                    } else {
                        //     cellClicked(elNeg) code below is temporary
                        neg.isPressed = true
                        elNeg.classList.add('pressed')
                        renderCell(negCoord, '')
                    }
                    checkIfWin()
                }
            }
        }
    }
    gBoards.push(gBoard)


}

function cellMarked(ev) {
    ev.preventDefault();
    var elCell = ev.target
    var cellClass = elCell.classList[0]
    var coord = getCoorByClass(cellClass)
    var cell = gBoard[coord.i][coord.j]
    if (cell.isPressed) return
    cell.isFlaged = true
    renderCell(cell.coord, '🏴‍☠️')
    gBoards.push(gBoard)

}

function checkIfWin() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var cell = gBoard[i][j]
            if (!cell.isPressed && cell.type !== MINE) return
        }
    }
    gemeOver(true)
}

function gameOver(win) {
    if (win) {
        //modal
        console.log('you wonnnn')
    } else {
        // modal
        console.log('you losss')
    }
    // play agin


}

function getCoorByClass(cellClass) {
    cellClass = cellClass.split('-')
    return { i: cellClass[1], j: cellClass[2] }
}

function getClassByCoor(coor) {
    if (coor) {
        var i = coor.i
        var j = coor.j
        var cellClass = '.cell-' + i + '-' + j
        return cellClass
    }
}

function renderCell(location, value) {
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

function getEmptyCell(board) {
    var emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j].type === CELL) emptyCells.push(board[i][j])
        }
    }
    i = getRandomInt(emptyCells.length)
    var cell = emptyCells.splice(i, 1)[0]
    return cell

}

function getRandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}