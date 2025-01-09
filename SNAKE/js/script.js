
// game constants and const
let inputDir = { x: 0, y: 0 };

const board = document.getElementById('board');
// const Score = document.getElementById('Score');

const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');

let score = 0;
let speed = 5;
let lastPaintTime = 0;

let snakeArr = [
    { x: 13, y: 15 }
]

food = { x: 6, y: 4 };


//  game functions

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    // console.log(ctime);
    lastPaintTime = ctime;

    gameEngine();
}

function isCollide(snake) {


    // if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++){
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // if deewar se takra gaye
        if (snake[0].x > 18 || snake[0].x <= 0 || snake[0].y > 18 || snake[0].y <= 0) {
            return true;
        }
}

function gameEngine() {
    // part 1 : updating the snmake array & Food

    if (isCollide(snakeArr)) {
        musicSound.pause();
        gameOverSound.play();
        musicSound.currentTime = 0;
        inputDir = { x: 0, y: 0 };
        alert("Game Over! Press Any Key To Play Again..!");
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
        scoreBox.innerHTML = "0";
        musicSound.play();
    }

    // if food eaten increment score and regenerate food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        score += 1;
        scoreBox.innerHTML = "Score:" + score;
        foodSound.play();
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });   // unshift() adds at array begining

        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };   // generating random number between a and b
    }

    // moving the snake 
    for (let i = (snakeArr.length - 2); i >= 0; i--) {
      
        snakeArr[i + 1] = { ...snakeArr[i] };  // The [...] operator ensures immutability by creating a new array.
       // Changes to snakeArr[i + 1] will not impact snakeArr[i].
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // part 2 : display snake and Food
    // display the snake
    board.innerHTML = "";

    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}






// game logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    musicSound.play();
    inputDir = { x: 0, y: 1 };  // start the game
    moveSound.play();               // plays the sound
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});