const Gameboard = (function () {
    const player1 = playerFactory('Player One', 'X');
    const player2 = playerFactory('Computer', 'O')
    const playerSelections = ['', '', '', '', '', '', '', '', ''];
    const divs = document.querySelectorAll('div');

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

                    GameControl.computerPlays()
                    // if (GameControl.checkForWinner()) {
                    //     console.log('insdie second checkforwinner')

                    // }
                }

            })
        })
    }
    return {
        playerSelections,
        test,
        divs,
        player1,
        player2
    }
})();

Gameboard.test()

function playerFactory(name, symbol) {
    return { name, symbol }
}

const GameControl = (function () {
    const playerSelections = Gameboard.playerSelections
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




    function computerPlays() {
        let ranNum = Math.floor(Math.random() * Gameboard.playerSelections.length)
        if (Gameboard.playerSelections[ranNum] === '') {
            Gameboard.playerSelections[ranNum] = Gameboard.player2.symbol;
            Gameboard.divs[ranNum].innerText = Gameboard.player2.symbol;
        } else {
            computerPlays()
            //checkForWinner(Gameboard.player2)
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
        let mySwitch = false;
        for (let combo of winningCombos) {
            console.log(combo)
            if (combo[0] !== '') {
                if (combo.every(e => e === combo[0])) {
                    mySwitch = true;
                    console.log(mySwitch)
                }
            }
            if (mySwitch === true) {
                console.log('cheese')
                return true
            }
        }





    }

    function showWinner() {

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
        playerSelections,
        computerPlays
    }
})();





    // if (playerSelections[0]) {
    //         if (
    //             ((playerSelections[0] === playerSelections[1]) &&
    //                 (playerSelections[1] === playerSelections[2]))
    //             ||
    //             ((playerSelections[0] === playerSelections[3]) &&
    //                 (playerSelections[3] === playerSelections[6]))

    //             ||
    //             ((playerSelections[0] === playerSelections[4]) &&
    //                 (playerSelections[4] === playerSelections[8]))
    //         ) {
    //             console.log('hmmm')
    //             return true
    //         }
    //     }
    //     if (playerSelections[1]) {
    //         if ((playerSelections[1] === playerSelections[4]) &&
    //             (playerSelections[4] === playerSelections[7])) {
    //             return true
    //         }
    //     }
    //     if (playerSelections[2]) {
    //         if ((playerSelections[2] === playerSelections[5]) &&
    //             (playerSelections[5] === playerSelections[8])) {
    //             return true
    //         }
    //         else if ((playerSelections[2] === playerSelections[4]) &&
    //             (playerSelections[4] === playerSelections[6])) {
    //             return true
    //         }
    //     }
    //     if (playerSelections[3]) {
    //         if ((playerSelections[3] === playerSelections[4]) &&
    //             (playerSelections[4] === playerSelections[5])) {
    //             return true
    //         }
    //     }
    //     if (playerSelections[6]) {
    //         if ((playerSelections[6] === playerSelections[7]) &&
    //             (playerSelections[7] === playerSelections[8])) {
    //             return true
    //         }
    //     }
    // }

    //     if (playerSelections[0]) {
    //         if (
    //             ((playerSelections[0] === playerSelections[1]) &&
    //                 (playerSelections[1] === playerSelections[2]))
    //             ||
    //             ((playerSelections[0] === playerSelections[3]) &&
    //                 (playerSelections[3] === playerSelections[6]))

    //             ||
    //             ((playerSelections[0] === playerSelections[4]) &&
    //                 (playerSelections[4] === playerSelections[8]))
    //         ) {
    //             console.log('hmmm')
    //             return true
    //         }
    //     }
    //     if (playerSelections[1]) {
    //         if ((playerSelections[1] === playerSelections[4]) &&
    //             (playerSelections[4] === playerSelections[7])) {
    //             return true
    //         }
    //     }
    //     if (playerSelections[2]) {
    //         if ((playerSelections[2] === playerSelections[5]) &&
    //             (playerSelections[5] === playerSelections[8])) {
    //             return true
    //         }
    //         else if ((playerSelections[2] === playerSelections[4]) &&
    //             (playerSelections[4] === playerSelections[6])) {
    //             return true
    //         }
    //     }
    //     if (playerSelections[3]) {
    //         if ((playerSelections[3] === playerSelections[4]) &&
    //             (playerSelections[4] === playerSelections[5])) {
    //             return true
    //         }
    //     }
    //     if (playerSelections[6]) {
    //         if ((playerSelections[6] === playerSelections[7]) &&
    //             (playerSelections[7] === playerSelections[8])) {
    //             return true
    //         }
    //     }
    // }
