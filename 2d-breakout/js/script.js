var canvas = document.getElementById('myCanvas'); 	
var ctx = canvas.getContext('2d'); 					
var x = canvas.width/2;								
var y = canvas.height-10;
console.log(x + ", " + y);
var dx = 2;
var dy = -2;
var ballRadius = 10;								// radius of the ball
var paddleWidth = 75;								// widht of the paddle	
var paddleHeight = 10;								// height of the paddle
var paddleX = (canvas.width - paddleWidth) / 2;		// starting position x-axis, where paddle is being drawn
var rightPressed = false;							// to check and assign true when right key is pressed
var leftPressed = false;							// to check and assign true when right key is pressed	

// setting up the brick

var brickRowCount = 4;
var brickColumnCount = 9;
var brickWidth = 50;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var gameStarted = false;
var gamePaused = false;
var playing = false;
var gameMessageEl = document.getElementById('message');


var bricks = [];
for (c = 0; c < brickColumnCount ; c++ ) {
	bricks[c] = [];
	for ( r = 0; r < brickRowCount ; r ++ ) {
		bricks[c][r] = { x: 0, y: 0, status : 1 };
	}
}

// keeping the score
var score = 0;

function drawScore () {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score : " + score, 8, 20);
}

var lives = 3;

function drawLives () {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Lives : " + lives, canvas.width-65, 20);
}

function newGame () {
	lives = 3;
	x = canvas.width/2;								
	y = canvas.height-30;
	dx = 2;
	dy = -2;
	score = 0;
	for ( c= 0; c < brickColumnCount ; c++ ) {
		for ( r = 0; r < brickRowCount ; r++) {
			bricks[c][r].status = 1;
		}
	}
}

function drawBall () {
	
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2, false);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle () {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath
}

function drawBricks () {
	for ( c= 0; c < brickColumnCount ; c++ ) {
		for ( r = 0; r < brickRowCount ; r++) {
			if (bricks[c][r].status == 1 ) {
				var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
				var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
				bricks[c][r].x =brickX;
				bricks[c][r].y =brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

function draw() {

	if (gameStarted) {
		// debugger;
		gameMessageEl.innerHTML = "Press P to pause the game.";
	}
	// console.log(x + ", " + y);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	drawLives();
	collisionDetection();
	x += dx;
	y += dy;

	if ( x + dx < ballRadius || x + dx > canvas.width-ballRadius ) {
		dx = -dx;
	}

	if ( y + dy < ballRadius) {
		dy = -dy;
	} else if( y > canvas.height-ballRadius ) {
		if ( x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
		} else {
			// console.log("Hit");
			// alert("Game Over!");
			// newGame();
			lives--;
			if (lives < 1 ) {
				var rematch = confirm("Game Over.\nDo you want to play again?");
				if (rematch) {
					newGame();
					/* count the number of rematch to give the user no of chances.
					If the user uses all three or four chance, call the function newGame without the bricks' status = 1.
					*/
				}else {
					window.close();
				}
			}else {
				
				// xSaved = x;								
				// ySaved = y;
				dx = 2;
				dy = -2;

				pause();
				gameMessageEl.innerHTML = "You Lost a life, Press P to resume.";
				playing = false;
				// gamePaused = false;
			}
		}
	}

	if (rightPressed && paddleX < canvas.width - paddleWidth) {
		paddleX += 7;
	} else if ( leftPressed && paddleX > 0) {
		paddleX -= 7;
	}
}

document.addEventListener("keydown", keyDownHandler, false); 	// keyDownHandler function will handle the event  when key is pressed (keydown)
document.addEventListener("keyup", keyUpHandler, false);		// keyDownHandler function will handle the event when pressed key is released (keyup)
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("touchmove", touchMoveHandler, false);


function keyDownHandler(e) {
	if (playing && e.keyCode == 80) {
		pause();
		playing = false;
	}else if (e.keyCode == 39) {
		rightPressed = true;
	} else if (e.keyCode == 37) {
		leftPressed = true;
	} else if (e.keyCode == 80 ) {
		play();
		playing = true;
	}

}

function keyUpHandler(e) {
	if (e.keyCode == 39) {
		rightPressed = false;
	} else if (e.keyCode == 37) {
		leftPressed = false;
	}
}

function mouseMoveHandler(e) {
	var relativeX = e.clientX - canvas.offsetLeft;
	if (relativeX > paddleWidth && relativeX < canvas.width) {
		paddleX = relativeX - paddleWidth;
	}
}
function touchMoveHandler(e) {
	var relativeX = e.clientX - canvas.offsetLeft;
	if (relativeX > paddleWidth && relativeX < canvas.width) {
		paddleX = relativeX - paddleWidth;
	}
	e.preventDefault();
}

function collisionDetection () {
	for ( c = 0; c < brickColumnCount ; c++ ) {
		for ( r = 0 ; r < brickRowCount; r++ ) {
			var b = bricks[c][r];
			if (b.status == 1 ) {
				if ( x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
					dy = -dy;
					b.status = 0;
					score ++;
					if (score == brickRowCount * brickColumnCount) {
						alert("You Win, Congratualtions.");
						var rematch = confirm("Do you want to play again?");
						if (rematch) {
							newGame();
						}else {
							window.close();
						}
					}
				}
			}
		}
	}
}
draw();
var gameInt = null;
function play() {
	gameInt = setInterval(draw, 5);
}
function pause () {
	// debugger;
	
	// paddleXSaved = paddleX;
	clearInterval(gameInt);
	
	gameMessageEl.innerHTML = "Press P to resume the game.";
	// debugger;
}