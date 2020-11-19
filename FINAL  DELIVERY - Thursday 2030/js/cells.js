
function cellClicked(cellId) {
    if (gGame.isOn || !cell.isShown) {
        var cell = getCellById(gBoard, cellId);
        if (gFirstClick === true) {
            startTimer()
            if (cell.isMine) {
                getRandomMine(gCurrLevel.SIZE);
                cell.isMine = false;
                printMat(gBoard, '.board-container')
            }
        }
        gFirstClick = false;
        if (gIsHint) {
            if (cell.isMine) gLivesCount++;
            expandShown(gBoard, cell.location.i, cell.location.j);
            setTimeout(function () {

                for (var i = cell.location.i - 1; i <= cell.location.i + 1; i++) {
                    if (i < 0 || i >= gBoard.length) continue
                    for (var j = cell.location.j - 1; j <= cell.location.j + 1; j++) {
                        if (j < 0 || j >= gBoard[0].length) continue
                        var currCell = gBoard[i][j];
                        var elCell = document.querySelector(`.cell${currCell.id}`)
                        currCell.isMine ? elCell.classList.remove(`mine`) : elCell.classList.remove(`revealed${currCell.minesAroundCount}`);
                        elCell.innerText = '';
                        currCell.isShown = false;

                    }
                }

            }, 1000);
            gElHintPressed.innerText = '';
            gElHintPressed.classList.remove('hint-toggle');
            gIsHint = false;

        }

        if (cell.isMine && !cell.isShown) {
            gLivesCount--
            updateLivesHTML();
        }
        if (gLivesCount === 0) {
            gameOver();
        }
        cell.isShown = true;
        if (cell.minesAroundCount === '' && !cell.isMine) {
            expandShown(gBoard, cell.location.i, cell.location.j);
        }
        renderCell(cell.id)

        var isVictory = checkVictory();
        if (isVictory) {
            gGame.isOn = false;
            updateVictoryEmoji();
            // playVictorySound();
            clearInterval(gTimeCountInterval);
        }
        playSound(cell);
    }
    return;
}


function renderCell(cellId) {
    // Select the elCell and set the value
    var cell = getCellById(gBoard, cellId);
    var elCell = document.querySelector(`.cell${cellId}`);
    var elCellInnerText = cell.minesAroundCount;
    // elCell.innerHTML = value;
    if (cell.isMine) {
        document.querySelector(`.cell${cellId}`).innerText = '🍩';
        elCell.classList.add("mine")
    }
    else {
        document.querySelector(`.cell${cellId}`).innerText = elCellInnerText;
        elCell.classList.add(`revealed${cell.minesAroundCount}`)
    }
}

function expandShown(board, rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board.length) continue
            if (rowIdx === i && colIdx === j) continue
            var currCell = board[i][j]
            currCell.isShown = true;
            renderCell(currCell.id);
            // if (currCell.minesAroundCount === "") cellClicked(currCell.id);
        }
    }
}

function expandUnshown(board, rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board.length) continue
            var cell = board[i][j]
            cell.isShown = false;
            var elCell = document.querySelector(`cell${cell.id}`)
            console.log('elCell', elCell);
            elCell.classList.remove(`revealed${cell.minesAroundCount}`);
        }
    }

}
function cellMarked(elCell) {
    var cellId = +elCell.dataset.id;
    var cell = getCellById(gBoard, cellId);
    if (event.button === 2 && !cell.isShown) {
        document.addEventListener('contextmenu', event => event.preventDefault());
        cell.isMarked = !cell.isMarked;
        cell.isMarked ? elCell.innerText = '🚩' : elCell.innerText = '';
        var isVictory = checkVictory();
        if (isVictory) {
            gGame.isOn = false;
            updateVictoryEmoji();
            // playVictorySound();
            playSound(cell);
            clearInterval(gTimeCountInterval);

        }
    }
}

