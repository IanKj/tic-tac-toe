const Gameboard = (function () {
    const player1 = playerFactory('Player One', 'X');
    const player2 = playerFactory('Computer', 'O')
    const playerSelections = ['', '', '', '', '', '', '', '', ''];
    const divs = document.querySelectorAll('div');
    let winningCombos = [
        [0, 1, 2],
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
                    if (GameControl.checkForWinner(player1)) {
                        console.log('player 1 wins!')
                    }
                    GameControl.computerPlays()
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
        let mySwitch = false
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

        function compareArrs(arr, arrToCompare) {
            if (arr.every((el, index) => {
                el == arrToCompare[`${arr[index]}`]
            })
            ) {
                console.log('the every worked')
            }
        }

        for (let combo of winningCombos) {
            //check first value of combo make sure it's not a string, but through playerSelections
            if (playerSelections[`${combo[0]}`] !== '') {
                //compare each combo val to playerSelections val
                //winningCombos, Gameboard.playerSelections
                compareArrs(combo, Gameboard.playerSelections)
            }



            // if ((combo[0] !== '') && (combo.every(e => e === combo[0]))) {
            //     console.log(Gameboard.winningCombos)
            //     return true
            // }

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
