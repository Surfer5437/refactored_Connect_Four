const addGameBtn = document.querySelector('#btn1');
addGameBtn.addEventListener('click', addGame);



function addGame() {
    const countGames = document.querySelectorAll(`[id*='board']`).length + 1;
    const body = document.querySelector('body');
    const newGame = document.createElement('section');
    const newHeader = document.createElement('h2');
    const newWinner = document.createElement('h3');
    let newBoard = Array(6);
    for (var i = 0; i < 6; ++i) {
        newBoard[i] = Array(7);
        for (var j = 0; j < 7; ++j)
            newBoard[i][j] = "undefined"
    }
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            const newSlot = document.createElement('div');
            newSlot.id = `${i}${j}`;
            newSlot.classList.add('slot');
            newSlot.addEventListener('click', slotClicked);
            newGame.appendChild(newSlot);
        }
    }

    gameList.add(new ConnectFour(`board${countGames}`, newBoard, newWinner));
    localStorage.setItem(`board${countGames}`, newBoard);
    newGame.classList.add('board');
    newGame.id = `board${countGames}`;
    newHeader.innerText = `Board${countGames}`;
    newHeader.classList.add('centered');
    newWinner.innerText = `Player 1 Go!`;
    newWinner.classList.add('winner');
    body.append(newHeader);
    body.append(newWinner);
    body.append(newGame);
}

function slotClicked(e) {
    const parentDiv = this.parentNode.getAttribute("id");
    const boardNum = parentDiv.charAt(parentDiv.length - 1) - 1;
    let firstChar = Number(e.target.id.charAt(0) - 1);
    const lastChar = Number(e.target.id.charAt(1));
    const i = ++firstChar;
    if (gameList.games[boardNum].gameWon == 'false' && !e.target.classList.contains('played')) {

        switch(e.target.id.charAt(1)){
            case '0':
                if(e.target.id.charAt(0) == gameList.games[boardNum].a){
                    gameList.games[boardNum].a--;
                    play(e,boardNum,firstChar,lastChar);
                }
                break;
                case '1':
                if(e.target.id.charAt(0) == gameList.games[boardNum].b){
                    gameList.games[boardNum].b--;
                    play(e,boardNum,firstChar,lastChar);
                }
                break;
                case '2':
                if(e.target.id.charAt(0) == gameList.games[boardNum].c){
                    gameList.games[boardNum].c--;
                    play(e,boardNum,firstChar,lastChar);
                }
                break;
                case '3':
                if(e.target.id.charAt(0) == gameList.games[boardNum].d){
                    gameList.games[boardNum].d--;
                    play(e,boardNum,firstChar,lastChar);
                }
                break;
                case '4':
                if(e.target.id.charAt(0) == gameList.games[boardNum].e){
                    gameList.games[boardNum].e--;
                    play(e,boardNum,firstChar,lastChar);
                }
                break;
                case '5':
                if(e.target.id.charAt(0) == gameList.games[boardNum].f){
                    gameList.games[boardNum].f--;
                    play(e,boardNum,firstChar,lastChar);
                }
                break;
                case '6':
                if(e.target.id.charAt(0) == gameList.games[boardNum].g){
                    gameList.games[boardNum].g--;
                    play(e,boardNum,firstChar,lastChar);
                }
                break;

        }
                    
}}
function play(e,boardNum,firstChar,lastChar){
    e.target.classList.remove('slot');
    e.target.classList.add('played');
    e.target.style.backgroundColor = gameList.games[boardNum][gameList.games[boardNum].curPlayer];
    gameList.games[boardNum].logicalBoard[firstChar][lastChar] = gameList.games[boardNum][gameList.games[boardNum].curPlayer];
    if (gameList.games[boardNum].gameWon == 'false') {
        if (gameList.games[boardNum].curPlayer === 'player1') {
            gameList.games[boardNum].curPlayer = 'player2';
            gameList.games[boardNum].winningHeader.innerText = `PLAYER 2 GO`;
            gameList.games[boardNum].winningHeader.style.color = 'blue';
        } else if (gameList.games[boardNum].curPlayer === 'player2') {
            gameList.games[boardNum].curPlayer = 'player1';
            gameList.games[boardNum].winningHeader.innerText = `PLAYER 1 GO`;
            gameList.games[boardNum].winningHeader.style.color = 'red';
        };
    } else if (gameList.games[boardNum].gameWon == 'true') {
        gameList.games[boardNum].curPlayer = 'playernone';
    }
    checkWinner(gameList.games[boardNum].logicalBoard, gameList.games[boardNum].winningHeader, boardNum);
}
class ConnectFour {
    constructor(id, board, winningHeader) {
        this.boardNum = id;
        this.logicalBoard = board;
        this.winningHeader = winningHeader;
        this.gameWon = 'false';
        this.curPlayer = 'player1';
        this.player1 = 'red';
        this.player2 = 'blue';
        this.playernone = 'black';
        this.a='5';
        this.b='5';
        this.c='5';
        this.d='5';
        this.e='5';
        this.f='5';
        this.g='5';
    }
}

class Boards {
    constructor() {
        this.games = [];
    }
    add(c) {
        if (!(c instanceof ConnectFour)) {
            return "Connect Four games only!";
        }
        this.games.push(c);

    }
}
let gameList = new Boards();

function checkWinner(board, winningHeader, boardNum) {
    // checking for vertical winner
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 7; i++) {
            if (board[j][i] != 'undefined' && board[j][i] === board[j + 1][i] && board[j + 1][i] === board[j + 2][i] && board[j + 2][i] === board[j + 3][i]) {
               const winningPiece1=document.getElementById(`${j}${i}`);
               const winningPiece2=document.getElementById(`${j+1}${i}`);
               const winningPiece3=document.getElementById(`${j+2}${i}`);
               const winningPiece4=document.getElementById(`${j+3}${i}`);
               winningPiece1.style.boxShadow='0px 0px 40px 20px #0ff';
               winningPiece2.style.boxShadow='0px 0px 40px 20px #0ff';
               winningPiece3.style.boxShadow='0px 0px 40px 20px #0ff';
               winningPiece4.style.boxShadow='0px 0px 40px 20px #0ff';
                // board[j][i]
                // board[j+1][i]
                // board[j][i]
                // board[j][i]
                const capWinner = board[j][i].toUpperCase();
                winningHeader.style.color = board[j][i];
                winningHeader.innerText = `${capWinner} IS THE WINNER!!!!`
                winnerFunc(boardNum)
            }
        }
    }
    // checking for horizontal winner
    for (let colu = 0; colu < board.length; colu++) {
        const grid = board[colu];
        for (let i = 0; i < 4; i++) {
            if (grid[i] !== 'undefined' && grid[i] === grid[i + 1] && grid[i + 1] === grid[i + 2] && grid[i + 2] === grid[i + 3]) {
                const winningPiece1=document.getElementById(`${colu}${i}`);
                const winningPiece2=document.getElementById(`${colu}${i+1}`);
                const winningPiece3=document.getElementById(`${colu}${i+2}`);
                const winningPiece4=document.getElementById(`${colu}${i+3}`);
                winningPiece1.style.boxShadow='0px 0px 40px 20px #0ff';
                winningPiece2.style.boxShadow='0px 0px 40px 20px #0ff';
                winningPiece3.style.boxShadow='0px 0px 40px 20px #0ff';
                winningPiece4.style.boxShadow='0px 0px 40px 20px #0ff';
                const capWinner = grid[i].toUpperCase();
                winningHeader.style.color = grid[i];
                winningHeader.innerText = `${capWinner} IS THE WINNER!!!!`
                winnerFunc(boardNum)
            }
        }
    }
    // checking diagonals
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 4; i++) {
            if (board[j][i] !== 'undefined' && board[j][i] === board[j + 1][i + 1] && board[j + 1][i + 1] === board[j + 2][i + 2] && board[j + 2][i + 2] === board[j + 3][i + 3]) {
                const winningPiece1=document.getElementById(`${j}${i}`);
                const winningPiece2=document.getElementById(`${j+1}${i+1}`);
                const winningPiece3=document.getElementById(`${j+2}${i+2}`);
                const winningPiece4=document.getElementById(`${j+3}${i+3}`);
                winningPiece1.style.boxShadow='0px 0px 40px 20px #0ff';
                winningPiece2.style.boxShadow='0px 0px 40px 20px #0ff';
                winningPiece3.style.boxShadow='0px 0px 40px 20px #0ff';
                winningPiece4.style.boxShadow='0px 0px 40px 20px #0ff';
                const capWinner = board[j][i].toUpperCase();
                winningHeader.style.color = board[j][i];
                winningHeader.innerText = `${capWinner} IS THE WINNER!!!!`
                winnerFunc(boardNum)
            }
        }
    }
    // checking diagonal opposite way
    for (let j = 5; j > 2; j--) {
        for (let i = 0; i < 4; i++) {
            if (board[j][i] !== 'undefined' &&
                board[j][i] === board[j - 1][i + 1] &&
                board[j - 1][i + 1] === board[j - 2][i + 2] &&
                board[j - 2][i + 2] === board[j - 3][i + 3]) {
                const winningPiece1=document.getElementById(`${j}${i}`);
                const winningPiece2=document.getElementById(`${j-1}${i+1}`);
                const winningPiece3=document.getElementById(`${j-2}${i+2}`);
                const winningPiece4=document.getElementById(`${j-3}${i+3}`);
                winningPiece1.style.boxShadow='0px 0px 40px 20px #0ff';
                winningPiece2.style.boxShadow='0px 0px 40px 20px #0ff';
                winningPiece3.style.boxShadow='0px 0px 40px 20px #0ff';
                winningPiece4.style.boxShadow='0px 0px 40px 20px #0ff';
                const capWinner = board[j][i].toUpperCase();
                winningHeader.style.color = board[j][i];
                winningHeader.innerText = `${capWinner} IS THE WINNER!!!!`
                winnerFunc(boardNum)
            }
        }
    }

}
function winnerFunc(boardNum){
    gameList.games[boardNum].g='9';
    gameList.games[boardNum].f='9';
    gameList.games[boardNum].e='9';
    gameList.games[boardNum].d='9';
    gameList.games[boardNum].c='9';
    gameList.games[boardNum].b='9';
    gameList.games[boardNum].a='9';
}