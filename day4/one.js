const fs = require("fs");

const data = fs.readFileSync("./sample.txt", "utf-8").split(/\r\n/g);
const calledNums = data[0];
const boards = [];
data.splice(0, 1);

const boardData = data.filter(elem => elem.length >= 1);
for (let i = 0; i < boardData.length; i += 5) {
    const bStr = boardData.slice(i, i + 5)
    boards.push(bStr.join(" "));
}

function createArrBoard(strBoard) {
    const board = [];
    strBoard = strBoard.split(" ").filter(elem => elem.length >= 1);
    for (let i = 0; i < strBoard.length; i += 5) {
        board.push(strBoard.slice(i, i + 5));
    }
    // console.log(board);
    return board;
}

function checkWin(b) {
    const checkCols = [];
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            checkCols.push(b[i][j])
        }
        if (b[i].length === 5) {
            return true
        } else if (checkCols.length === 5) {
            return true;
        }
        checkCols.length = 0;
    }
    return false;
}

function genChecker() {
    return [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ]
}

function checkIfNumExists(b, numToCheck) {
    for (let i = 0; i < 5; i++) {
        if (b[i].includes(numToCheck)) {
            return [true, i, b[i].findIndex(e => e === numToCheck)];
        }
    }
    return [false, -1, -1]
}

function checkChecker(c) {
    for (let i = 0; i < 5; i++) {
        if (c[i].filter(elem => elem === "*").length === 5) return true
    }
    for (let i = 0; i < 5; i++) {
        if (c.filter(elem => elem[i] === "*").length === 5) {
            return true
        }
    }
    return false;
}

const checkerBoards = [];
for (let i = 0; i < boards.length; i++) {
    checkerBoards.push(genChecker())
}

const calls = calledNums.split(",");
for (let i = 0; i < calls.length; i++) {
    const currCall = calls[i];
    for (let j = 0; j < boards.length; j++) {
        const currBoard = createArrBoard(boards[j])
        const currCheck = checkerBoards[j]
        const [exists, ind, indOfNum] = checkIfNumExists(currBoard, currCall);
        if (exists) {
            currCheck[ind][indOfNum] = "*"
            if (checkChecker(currCheck)) {

                calculateScore(currBoard, currCheck, currCall)
                i = calls.length;
                break;
            }
        }
        // console.log(currCall, currCheck, exists)
    }
}

function calculateScore(b, c, currCall) {
    let sum = 0;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (c[i][j] === 0) {
                sum += parseInt(b[i][j])
            }
        }
    }
    console.log(sum * currCall)
}