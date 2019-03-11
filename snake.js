const cvs = document.getElementById("snake"); //snake?
const ctx = cvs.getContext("2d");
let box = 32; //unit for box size

//images
let imgFood = new Image();
imgFood.src = "images/food.png";

let imgGround = new Image();
imgGround.src = "images/ground.png";

//audio  //audioName.play();
let audioUp = new Audio(); //up
audioUp.src = "audio/up.mp3";

let audioDown = new Audio(); //down
audioDown.src = "audio/down.mp3";

let audioLeft = new Audio(); //left
audioLeft.src = "audio/left.mp3";

let audioRight = new Audio(); //right
audioRight.src = "audio/right.mp3";

let audioEat = new Audio(); //eating sound
audioEat.src = "audio/eat.mp3";

let audioDead = new Audio(); //death sound
audioDead.src = "audio/dead.mp3";


//create snake
let snake = [0]; 

snake[0] = {
    x: 9 * box, 
    y: 10 * box
};

//create food
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box, //generating food in random locations
    y: Math.floor(Math.random() * 15 + 3) * box
}

let score = 0; //setting intial score

//control snake
let d;
document.addEventListener("keydown", direction);

function direction(event) { //double conditions to make sure the snake can't turn into itself
    if (event.keyCode == 37 && d != "RIGHT") {
        audioLeft.play();
        d = "LEFT";
    } else if (event.keyCode == 38 && d != "DOWN") {
        audioUp.play();
        d = "UP";
    } else if (event.keyCode == 39 && d != "LEFT") {
        audioRight.play();
        d = "RIGHT";
    } else if (event.keyCode == 40 && d != "UP") {
        audioDown.play();
        d = "DOWN";
    }
}

//handle collision
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if(head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}



//drawing the canvas
function draw() {
    //drawing the ground 
    ctx.drawImage(imgGround, 0, 0); //       <--TODO we're having difficulty rendering here, getting a broken error for the html canvas element

    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(imgFood, food.x, food.y);

    //old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //direction movement handling
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    //snake eating
    if (snX == food.x && snakeY == food.y) {
        score++;
        audioEat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box,
        }
    } else {
        snake.pop();
    }

    //add new Head
    let newHead = {
        x : snakeX,
        y : snakeY
    }

    //game over 
    // left of bounds  right of bounds     top of bounds        bottom of bounds    collision
    if (snake < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead,snake)) {
        clearInterval(game);
        audioDead.play();
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa One";
    ctx.fillText(score, 2*box, 1.6*box);
}

//redraw the board every100 miliseconds
let game = setInterval(draw, 100);