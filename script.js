// Game Constants & Variables
let direction = { x: 0, y: 0 };
let speed = 4;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
let score = 0;

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function gameEngine() {
    const board = document.getElementById('board');
    // Clear the board
    board.innerHTML = "";

    // Check if the snake has eaten the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        // Increase score
        score += 1;
        // Update score display
        document.getElementById('score').textContent = "Score: " + score;
        // Generate new food location
        food = generateFoodPosition();
        // Add new head to the snake
        const newHead = { ...snakeArr[0] };
        // Update the position of the new head based on the direction
        newHead.x += direction.x;
        newHead.y += direction.y;
        // Add new head to the beginning of the snake array
        snakeArr.unshift(newHead);
    } else {
        // Update snake position normally
        updateSnakePosition();
    }

    // Display snake
    snakeArr.forEach((e, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add("head");
        } else {
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    });

    // Display food
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

function updateSnakePosition() {
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;

    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
            // Game over logic
            alert("Game Over! Your score: " + score);
            snakeArr = [{ x: 13, y: 15 }];
            direction = { x: 0, y: 0 };
            score = 0;
            document.getElementById('score').textContent = "Score: " + score;
        }
    }
}

function generateFoodPosition() {
    // Generate random food position that is not on the snake
    let newFoodPosition;
    do {
        newFoodPosition = {
            x: Math.floor(Math.random() * 20) + 1,
            y: Math.floor(Math.random() * 20) + 1
        };
    } while (isSnakeCell(newFoodPosition));

    return newFoodPosition;
}

function isSnakeCell(cell) {
    // Check if the given cell is occupied by the snake
    return snakeArr.some(segment => segment.x === cell.x && segment.y === cell.y);
}

// Main logic starts here
window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    switch (e.key) {
        case "ArrowUp":
            if (direction.y !== 1) { // Prevent moving directly opposite
                direction.x = 0;
                direction.y = -1;
            }
            break;

        case "ArrowDown":
            if (direction.y !== -1) {
                direction.x = 0;
                direction.y = 1;
            }
            break;

        case "ArrowLeft":
            if (direction.x !== 1) {
                direction.x = -1;
                direction.y = 0;
            }
            break;

        case "ArrowRight":
            if (direction.x !== -1) {
                direction.x = 1;
                direction.y = 0;
            }
            break;

        default:
            break;
        
    }
});

// Event listener for increasing speed
document.getElementById('increaseSpeedButton').addEventListener('click', () => {
    speed += 1; // Increase the speed value as desired
});

// Event listener for decreasing speed
document.getElementById('decreaseSpeedButton').addEventListener('click', () => {
    if (speed > 1) {
        speed -= 1; // Decrease the speed value as desired
    }
});
