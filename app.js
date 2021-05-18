const Gameboard = (function() {
    const playerSelections = ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x'];
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
            console.log(`clicked ${playerSelections[index]}`)
        })
    })
}

    return {
        playerSelections,
        test,
    }

})();



const players = [
    {}
]
const gameControl = {};
