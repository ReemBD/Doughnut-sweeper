var gNextId = 101;
var gBoard = [];
var gLevels = [{
    SIZE: 4,
    MINES: 2
}, {
    SIZE: 8,
    MINES: 6
}, {
    SIZE: 12,
    MINES: 30
}
]
var gCurrLevel = gLevels[0]
var gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gFirstClick;
var gLivesCount = 2;
var gStartingTime;
var gTimeCountInterval;
var gHintsCount = 0;
var gIsHint;
var gElHintPressed;



function initGame() {
    gBoard = buildBoard(gCurrLevel.SIZE)
    getRandomMines(gCurrLevel)
    printMat(gBoard, '.board-container')
    gGame.isOn = true;
    clearInterval(gTimeCountInterval)
    var elTimer = document.querySelector('.timer');
    elTimer.innerText = 'Timer';
    gLivesCount = 2;
    updateLivesHTML();
    updateHintsHTML();
    gIsHint = false;
    gHintsCount = 0;
    gFirstClick = true;
    var statusEmoji = document.querySelector('.lives-count span');
    statusEmoji.innerText = `😊`
}


function printMat(mat, selector) {
    var strHTML = '<table class="table" border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j];
            var className = 'cell cell' + cell.id;
            cell.minesAroundCount = countMinesAround(mat, i, j)
            strHTML += `<td data-id=${cell.id} onmousedown="cellMarked(this)" onclick="cellClicked(${cell.id})"class="` + className + '"></td>';
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}

function chooseLevel(lvl) {
    updateLivesHTML();
    if (gElHintPressed) gElHintPressed.classList.remove('hint-toggle');
    gCurrLevel = gLevels[lvl];
    initGame();
}


function gameOver() {
    gGame.isOn = false;
    clearInterval(gTimeCountInterval);
    revealMines(gBoard);
    updateLoseEmoji();

}

function checkVictory() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j]
            if (!cell.isShown) {
                if (!gGame.isOn) return false;
                if (!cell.isMine) return false;
                if (cell.isMine && !cell.isMarked) return false;
            }
        }
    }
    return true;
}

function updateLivesHTML() {
    var elLivesCount = document.querySelector('.lives-count h3');
    elLivesCount.innerText = 'Lives Left: '
    for (var i = 0; i < gLivesCount; i++) {
        elLivesCount.innerText += '❤️';
    }
}

function updateLoseEmoji() {
    var statusEmoji = document.querySelector('.lives-count span');
    statusEmoji.innerText = '💀 You Lose'
}

function updateVictoryEmoji() {
    var statusEmoji = document.querySelector('.lives-count span');
    statusEmoji.innerText = '😎 Well Done!'
}

function toggleHint(elHint) {
    if (!gIsHint) {
        gIsHint = true;
        elHint.classList.add('hint-toggle')
        gElHintPressed = elHint
    } else {
        var elToggledHint = document.querySelector('.hint-toggle')
        elToggledHint.classList.remove('hint-toggle')
        gIsHint = false;
    }
}

function updateHintsHTML() {
    var elHints = document.querySelectorAll('.hint');
    for (var i = 0; i < elHints.length; i++) {
        elHints[i].innerText = '💡'
    }
}
function playSound(cell) {
    if (!cell.isMine && gGame.isOn) {
        var correctSound = new Audio('sounds/correct.mp4')
        correctSound.play();
    }
    if (!gLivesCount) {
        var loseSound = new Audio('sounds/lose.mp4');
        loseSound.play();
    } else if (!gGame.isOn) {
        var victorySound = new Audio('sounds/victory.mp4')
        victorySound.play();    
    }
}


/*
When cell is clicked,
elHiint innerText becomes empty.
gElHintPressed= elHint.
cell is clicked, if gIsHint is true (which can happen only if)
*/




