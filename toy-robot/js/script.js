var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');						//context of the canvas



var objOrigin = {x : 0, y: canvas.height};				// origin can be defined here
var objRobotPosition = {								// Object to hold the starting position of
	sX : 10,											// the robot in terms of x and y axis, also the direction of head of the robot
	sY : 10,
	f : "east"
};

var robotWidth = 50;									// width of rectangular shaped robot
var robotHeight = 50;									// height of rectangular shaped robot
var face = "east";										// direction of face of robot
var arrFaces = ["north", "east", "south", "west"]; 		// An array containing all possible direction

// drawRobot function, draws a rectangular robot with starting position as passed to it by the Object that holds this information

function drawRobot(robo) {
	ctx.beginPath();									// this indicates that the draw path will begin
	console.log(robo.sX);
	ctx.rect(robo.sX, robo.sY, robotWidth, robotHeight); // rect method is used to draw a rectangle, with starting position and width and height of the robot
	ctx.fillStyle = "#0095DD";							 // color of the robot :)
	ctx.fill();											 // fill the robot with the color	
	ctx.closePath;										 // this indicates drawing has finished				

}

/* drawFace function creates a line of width of 3 units in the specified direction.
	Here the head direction of the robot has been taken from the object objRobotPosition, the default value is East

*/
function drawFace() {
	var startFaceX = null;										// variable to store the starting x co-ordinate of the face <=> line
	var startFaceY = null;										// variable to store the starting y co-ordinate of the face <=> line
	ctx.beginPath();											// this indicates that the draw path will begin
	if (objRobotPosition.f == "east") {							// checks if the robot is currently facing towards east, if yes, following
		startFaceX = objRobotPosition.sX+robotWidth-3;			// Face <=> line should start at east-most edge and should ->>
		startFaceY = objRobotPosition.sY;						// be drawn upto the bottom position of robot (height)
		ctx.moveTo(startFaceX, startFaceY);
		ctx.lineTo(startFaceX, startFaceY + robotHeight);
	}else if (objRobotPosition.f == "west") {
		startFaceX = objRobotPosition.sX;
		startFaceY = objRobotPosition.sY;
		ctx.moveTo(startFaceX, startFaceY);
		ctx.lineTo(startFaceX, startFaceY + robotHeight);
	}else if (objRobotPosition.f == "north") {
		startFaceX = objRobotPosition.sX;
		startFaceY = objRobotPosition.sY;
		ctx.moveTo(startFaceX, startFaceY);
		ctx.lineTo(startFaceX + robotWidth, startFaceY);
	} else if(objRobotPosition.f == "south") {
		startFaceX = objRobotPosition.sX;
		startFaceY = objRobotPosition.sY + robotHeight-3;
		ctx.moveTo(startFaceX, startFaceY);
		ctx.lineTo(startFaceX + robotWidth, startFaceY);
	}
	ctx.lineWidth = 3;
	ctx.strokeStyle = "#000000";
	ctx.stroke();
	ctx.closePath();
}

function turnRight() {
	var nowFacing = objRobotPosition.f;
	var nowFacingIndex = arrFaces.indexOf(nowFacing);
	if (nowFacingIndex == arrFaces.length -1) {
		trunFaceTo = 0;
	} else {
		trunFaceTo = nowFacingIndex + 1;
	}
	objRobotPosition.f = arrFaces[trunFaceTo];
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawRobot(objRobotPosition);
	drawFace();
}
function turnLeft() {
	var nowFacing = objRobotPosition.f;
	var nowFacingIndex = arrFaces.indexOf(nowFacing);
	console.log(nowFacingIndex);
	if (nowFacingIndex == 0) {
		trunFaceTo = arrFaces.length - 1;
	} else {
		trunFaceTo = nowFacingIndex - 1;
	}
	objRobotPosition.f = arrFaces[trunFaceTo];
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawRobot(objRobotPosition);
	drawFace();
}


function moveRobot() {
	if (objRobotPosition.f == "east") {							
		objRobotPosition.sX += robotWidth;
	}else if (objRobotPosition.f == "west") {
		objRobotPosition.sX -= robotWidth;
	}else if (objRobotPosition.f == "north") {
		objRobotPosition.sY -= robotHeight;
	} else if(objRobotPosition.f == "south") {
		objRobotPosition.sY += robotHeight;
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawRobot(objRobotPosition);
	drawFace();
}
drawRobot(objRobotPosition);
drawFace();
setTimeout(moveRobot, 2000);
setTimeout(turnRight, 4000);
setTimeout(moveRobot, 6000);
