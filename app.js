const addGameBtn = document.querySelector('#addGame').addEventListener('click', addGame());


function addGame(){
    const countGames = document.querySelectorAll(`[id*='board']`).length;
    const body = document.querySelector('body');
    const newGame = document.createElement('table');
    const newBoard = Array(6).fill(Array(7));

    localStorage.setItem(`board${countGames}`, newBoard);
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            
    const newSlot = document.createElement('div');
           newSlot.id=`board${countGames}${i}${j}`;
                newSlot.classList.add('slot');
                newGame.append(newSlot);
    }
    }
    newGame.classList.add('board');
    newGame.id=`board${countGames}`;
    newGame.style.backgroundColor="blue";
    body.append(newGame);
}

