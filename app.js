const Gameboard = (function () {
    const player1 = playerFactory('Player One', 'X');
    const player2 = playerFactory('Computer', 'O')
    const playerSelections = ['', '', '', '', '', '', '', '', ''];
    const divs = document.querySelectorAll('div');
    let winningCombos =
        [
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [3, 4, 5],
            [6, 7, 8]
        ]
    const grid = document.querySelector('.gridContainer')
    const spaces = Array.from(grid.children);
    function test() {
        playerSelections.forEach((element, index) => {
            spaces[index] = element;
        })

        playerSelections.forEach((element, index) => {
            divs[index].innerText = element;
            divs[index].addEventListener('click', function () {
                if (playerSelections[index] === "") {
                    playerSelections[index] = player1.symbol;
                    divs[index].innerText = playerSelections[index];
                    GameControl.checkForWinner(player1)
                    if (!GameControl.checkForWinner(player1)) {
                        GameControl.computerPlays()
                    }
                }

            })
        })
    }
    return {
        playerSelections,
        test,
        divs,
        player1,
        player2,
        winningCombos
    }
})();

Gameboard.test()

function playerFactory(name, symbol) {
    return { name, symbol }
}

const GameControl = (function () {
    const playerSelections = Gameboard.playerSelections
    const grid = document.querySelector('main');
    const resetBtn = document.querySelector('.resetBtn')

    function computerPlays() {
        let ranNum = Math.floor(Math.random() * Gameboard.playerSelections.length)
        if (Gameboard.playerSelections[ranNum] === '') {
            Gameboard.playerSelections[ranNum] = Gameboard.player2.symbol;
            Gameboard.divs[ranNum].innerText = Gameboard.player2.symbol;
            checkForWinner(Gameboard.player2)
        } else {
            computerPlays()

        }
    }

    function checkForWinner(player) {
        let winningCombos = [
            [
                playerSelections[0],
                playerSelections[1],
                playerSelections[2]
            ],
            [
                playerSelections[0],
                playerSelections[3],
                playerSelections[6]
            ],
            [
                playerSelections[0],
                playerSelections[4],
                playerSelections[8]
            ],
            [
                playerSelections[1],
                playerSelections[4],
                playerSelections[7]
            ],
            [
                playerSelections[2],
                playerSelections[5],
                playerSelections[8]
            ],
            [
                playerSelections[2],
                playerSelections[4],
                playerSelections[6]
            ],
            [
                playerSelections[3],
                playerSelections[4],
                playerSelections[5]
            ],
            [
                playerSelections[6],
                playerSelections[7],
                playerSelections[8]
            ],

        ]
        let mySwitch
        for (const [index, combo] of winningCombos.entries()) {
            //check if three match
            //pull the index from the three matching's array
            if ((combo[0] !== '') && (combo.every(el => el === combo[0]))) {
                grid.classList.add('clicksDisabled')
                //loop over the other winningCombo at the returned index
                //style the winning playerSelections through the looped array
                for (let innerCombo of Gameboard.winningCombos[index]) {

                    Gameboard.divs[innerCombo].classList.add('winner')
                }
                mySwitch = true
            }
        }
        if (mySwitch === true) {
            return true
        }
    }
    resetBtn.addEventListener('click', resetBoard);

    function resetBoard() {
        grid.classList.remove('clicksDisabled')
        Gameboard.playerSelections.forEach((element, index) => {
            Gameboard.playerSelections[index] = '';
            Gameboard.divs[index].innerText = '';
            Gameboard.divs[index].classList.remove('winner')
        })
    }


    return {
        checkForWinner,
        playerSelections,
        computerPlays
    }

})();


