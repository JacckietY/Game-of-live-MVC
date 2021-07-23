

// Initialize
function initialize() {
    initializeGrids();
    createTable();
    resetGrids();
    setupControlButtons();
}

// Create table view of game

// handle click cell
function cellClickHandler() {
    const { i, j } = this.dataset;
    
    const lifeStatus = (grid[i][j] + 1) % 2;
    grid[i][j] = lifeStatus;

    this.setAttribute("class", lifeStatus ? 'live' : 'dead');

}

//update View

//add listeners to buttons
function setupControlButtons() {
    // button to start
    controls.startButton.addEventListener('click', startButtonHandler);
    
    // button to clear
    document.querySelector('#clear').addEventListener('click', clearButtonHandler);

    // button to set random initial state
    document.querySelector('#random').addEventListener('click', randomButtonHandler);
}

// clear the grid
function clearButtonHandler() {
    
    isPlaying = false;
    controls.startButton.textContent = "Start";    
    clearTimeout(timer);
    
    [...document.querySelectorAll(".live")]
        .forEach(el => el.setAttribute("class", "dead"));

    resetGrids();
}

//generate random life cells
function randomButtonHandler() {
    if (isPlaying) return;

    clearButtonHandler();

    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            const isLive = Math.round(Math.random());
            grid[i][j] = isLive;
            isLive ? gridDOM[i][j].setAttribute("class", "live") : null;
        }
    }
}

// start/pause/continue the game
function startButtonHandler() {
    isPlaying = !isPlaying;

    if (!isPlaying) {
        this.textContent = "Continue";
        clearTimeout(timer);
    } else {
        this.textContent = "Pause";
        play();
    }
}

// run the life game
function play() {
    computeNextGen();
    
    if (isPlaying) {
        timer = setTimeout(play, REPRODUCTION_TIME);
    }
}

//check rules, reset, update view
// function computeNextGen() {
//     for (let i = 0; i < ROWS; i++) {
//         for (let j = 0; j < COLS; j++) {
//             applyRules(i, j);
//         }
//     }
    
//     // copy NextGrid to grid, and reset nextGrid
//     copyAndResetGrid();
//     // copy all 1 values to "live" in the table
//     updateView();
// }

// RULES
// Any live cell with fewer than two live neighbours dies, as if caused by under-population.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overcrowding.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

//if neighbour exist, return 1, else 0


// Start everything
initialize();