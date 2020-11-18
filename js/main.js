var gNextId = 101;
var gBoard = [];
var gLevel = {
    SIZE: 4,
    MINES: 2
}
var gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gFirstClick;
var gLivesCount = 2;
/*
Every cell is going to have class name.
Through that i can catch any cell i want in the dom.
As well, each cell shares the class cell so through that class I can effect all of them.
*/

function initGame() {
    gFirstClick = true;
    gBoard = buildBoard(gLevel.SIZE)
    getRandomMines(gLevel)
    printMat(gBoard, '.board-container')
    updateLivesHTML();
}

function buildBoard(SIZE) {
    var mat = []
    for (var i = 0; i < SIZE; i++) {
        var row = []
        for (var j = 0; j < SIZE; j++) {
            row.push({
                id: gNextId++,
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
/*
putting mines:
if cell.isShown === true,
strHTML adds class "mine"
*/
function printMat(mat, selector) {
    var strHTML = '<table class="table" border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j];
            var className = 'cell cell' + cell.id;
            cell.countMinesAround = countMinesAround(mat, i, j)
            strHTML += `<td data-id=${cell.id} onmousedown="cellMarked(this)" onclick="cellClicked(${cell.id})"class="` + className + '"></td>';
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}


function cellClicked(cellId) {
    if (gGame.isOn) {
        var cell = getCellById(gBoard, cellId);
        if (gFirstClick === true && cell.isMine) {
            cell.isMine = false;
            getRandomMine(gLevel.SIZE);
            printMat(gBoard, '.board-container')
        }
        gFirstClick = false;
        if (!cell.isShown) {
            renderCell(cellId);
            if (cell.isMine) {
                gLivesCount--
                updateLivesHTML();
            }
        }
        if (gLivesCount === 0) {
            gameOver();
        }
        cell.isShown = true;
    }
    return;
}

function renderCell(cellId) {
    // Select the elCell and set the value
    var cell = getCellById(gBoard, cellId);
    var elCell = document.querySelector(`.cell${cellId}`);
    var elCellInnerText = cell.countMinesAround;
    // elCell.innerHTML = value;
    if (cell.isMine) {
        document.querySelector(`.cell${cellId}`).innerText = '🍩';
        elCell.classList.add("mine")
    }
    else {
        document.querySelector(`.cell${cellId}`).innerText = elCellInnerText;
        elCell.classList.add("revealed")
    }
}
function cellMarked(elCell) {
    var cellId = +elCell.dataset.id;
    var cell = getCellById(gBoard, cellId);
    console.log(cell);
    if (event.button === 2 && !cell.isMarked && !cell.isShown) {
        document.addEventListener('contextmenu', event => event.preventDefault());
        elCell.innerText = '🚩';
        cell.isMarked = true;
    }
}

function chooseLevel() {

}


function gameOver() {
    gGame.isOn = false;
    var statusEmoji = document.querySelector('.lives-count span');
    statusEmoji.innerHTML = `<button onclick="initGame()" class="restart-btn">💀</btn>`

}

function expandShown(board, elCell, i, j) {

}

function updateLivesHTML() {
    var elLivesCount = document.querySelector('.lives-count h3');
    elLivesCount.innerText = 'Lives Left: '
    for (var i = 0; i < gLivesCount; i++) {
        elLivesCount.innerText += '❤️';
    }

}


