const addGameBtn = document.querySelector('#addGame');
addGameBtn.addEventListener('click', addGame());


function addGame(){
    const countGames = document.querySelectorAll(`[id*='board']`).length;
    const body = document.querySelector('body');
    const newGame =document.createElement('table');
    var newGridLogicalBoard = new Array(6);

for (var i = 0; i < newGridLogicalBoard.length; i++) {
    newGridLogicalBoard[i]= new Array(7)
    for (let arr of newGridLogicalBoard[i]) {
        arr='undefined';
        
    }
}
console.log(newGridLogicalBoard);
   
    newGame.dataset.logicalBoard=newGridLogicalBoard;
    newGame.classList.add('board');
    newGame.id=`board${countGames}`;
    newGame.style.backgroundColor="blue";

    body.append(newGame);
}