const Gameboard = (function() {
    const player1 = playerFactory('Player One', 'X');
    const player2 = playerFactory('Computer', 'O')
    const playerSelections = ['', '', '', '', '', '', '', '', ''];
    const divs = document.querySelectorAll('div');
    
    const grid = document.querySelector('.gridContainer')
    const spaces = Array.from(grid.children);
    function test () {
        playerSelections.forEach((element, index) => {
            spaces[index] = element;
        })
        
        playerSelections.forEach((element, index) => {
            divs[index].innerText = element;
            divs[index].addEventListener('click', function() {
                playerSelections[index] = player2.symbol;
                divs[index].innerText = playerSelections[index];
                if(GameControl.checkForWinner()){
                    GameControl.clearBoard()
                }
            })
        })
    }
    return {
        playerSelections,
        test,
        divs
    }
})();

Gameboard.test()

function playerFactory(name, symbol) {
    return {name, symbol}
}
// const players = [
//     {
//         player1: 'Player One',
//         symbol: 'X'
//     },

//     {
//         player2: 'Player Two',
//         symbol: 'O'
//     },

//     {
//         computer: 'Computer',
//         symbol: 'O'
//     },
// ]

const GameControl = (function() {
    const playerSelections = Gameboard.playerSelections

    function checkForWinner() {
        if(playerSelections[0]){
            if ((playerSelections[0] === playerSelections[1]) && 
                (playerSelections[1] === playerSelections[2])){
                    return true
            } 
            else if ((playerSelections[0] === playerSelections[3]) && 
            (playerSelections[3] === playerSelections[6])){
                return true
            }
            else if ((playerSelections[0] === playerSelections[4]) && 
            (playerSelections[4] === playerSelections[8])){
                return true
            }
        }
        if(playerSelections[1]){
            if ((playerSelections[1] === playerSelections[4]) && 
                (playerSelections[4] === playerSelections[7])){
                    return true
            } 
        }
        if(playerSelections[2]){
            if ((playerSelections[2] === playerSelections[5]) && 
                (playerSelections[5] === playerSelections[8])){
                    return true
            } 
            else if ((playerSelections[2] === playerSelections[4]) && 
            (playerSelections[4] === playerSelections[6])){
                return true
            }
        } 
        if(playerSelections[3]){
            if ((playerSelections[3] === playerSelections[4]) && 
                (playerSelections[4] === playerSelections[5])){
                    return true
            } 
        }
        if(playerSelections[6]){
            if ((playerSelections[6] === playerSelections[7]) && 
                (playerSelections[7] === playerSelections[8])){
                    return true
            } 
        }  
    }

    function clearBoard() {
        Gameboard.playerSelections.forEach((element, index) => {
                Gameboard.playerSelections[index] = '';
                Gameboard.divs[index].innerText = playerSelections[index];
            })
        
    }
    return {
        checkForWinner,
        clearBoard,
        playerSelections
    }
})();
