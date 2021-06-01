const Gameboard = (function () {
    let playingComputer = true;
    let player1Turn = true;
    let player1 = playerFactory('Player One', 'X');
    let player2 = playerFactory('Computer', 'O');
    const form = document.querySelector('form')
    const player1Name = document.querySelector('#player1Input');
    const player2Name = document.querySelector('#player2Input');
    form.addEventListener('submit', formFunction)
    function formFunction() {
        GameControl.resetBoard();
        player1 = playerFactory(player1Name.value.toUpperCase(), 'X');
        player2 = playerFactory(player2Name.value, 'O');
        playingComputer = false;
    }
    const playerSelections = ['', '', '', '', '', '', '', '', ''];
    const divs = document.querySelectorAll('.gridContainer div');
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
                if (player1Turn === true) {
                    makeMove(player1, element, index)
                    player1Turn = false;
                } else {
                    makeMove(player2, element, index)
                    player1Turn = true;
                }
            })
        })

        function makeMove(player, element, index) {
            if (playerSelections[index] === "") {
                playerSelections[index] = player.symbol;
                divs[index].innerText = playerSelections[index];
                GameControl.checkForWinner(player)
                GameControl.checkForDraw()
                if (playingComputer === true) {
                    if (!GameControl.checkForDraw() && !GameControl.checkForWinner(player1)) {
                        GameControl.opponentPlays(player2);
                    }
                }

            }
        }
    }
    return {
        playerSelections,
        test,
        divs,
        player1,
        player2,
        winningCombos,
        player1Turn
    }
})();

Gameboard.test()

function playerFactory(name, symbol) {
    return { name, symbol }
}

const GameControl = (function () {
    const playerSelections = Gameboard.playerSelections
    const grid = document.querySelector('.gridContainer');
    const resetBtn = document.querySelector('.resetBtn')
    const results = document.querySelector('.results')
    const gridOverlay = document.querySelector('.gridOverlay')

    function opponentPlays(player) {
        let ranNum = Math.floor(Math.random() * Gameboard.playerSelections.length)
        if (Gameboard.playerSelections[ranNum] === '') {
            Gameboard.playerSelections[ranNum] = player.symbol;
            Gameboard.divs[ranNum].innerText = player.symbol;
            checkForWinner(Gameboard.player2)
        } else {
            opponentPlays(player)

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
                results.innerText = `${player.name} wins!`
                mySwitch = true
                //exit loop after first winningCombo is discovered
                return true
            }
            if (mySwitch === true) {
                checkForDraw(player)
                return
            }
        }



    }

    function checkForDraw() {
        if ((Gameboard.playerSelections.every(el => el !== '')) && (!GameControl.checkForWinner(Gameboard.player))) {
            grid.classList.add('clicksDisabled', 'draw');
            gridOverlay.classList.remove('hidden');
            gridOverlay.classList.add('z-index')
            return true
        }
    }
    resetBtn.addEventListener('click', resetBoard);

    function resetBoard() {
        Gameboard.playerSelections.forEach((element, index) => {
            Gameboard.playerSelections[index] = '';
            Gameboard.divs[index].innerText = '';
            Gameboard.divs[index].classList.remove('winner')
        })
        grid.classList.remove('clicksDisabled', 'draw');
        results.innerText = '';
        gridOverlay.classList.add('hidden');
        gridOverlay.classList.remove('z-index')
        Gameboard.player1Turn = true;
        console.log(Gameboard.player1Turn)
    }


    return {
        checkForWinner,
        playerSelections,
        opponentPlays,
        checkForDraw,
        resetBoard
    }

})();


