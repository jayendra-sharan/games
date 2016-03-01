var canvas = document.getElementById('gameCanvas');		// getting the canvas into the script
var ctx = canvas.getContext('2d');						//context of the canvas

var objOrigin = {x : 0, y: canvas.height};				// origin can be defined here
var objRobotPosition = {								// Object to hold the starting position of
	sX : 0,												// the robot in terms of x and y axis, also the direction of head of the robot
	sY : 0,
	f : "east"
};

var robotWidth = 50;									// width of rectangular shaped robot
var robotHeight = 50;									// height of rectangular shaped robot
var face = "east";										// direction of face of robot
var arrFaces = ["north", "east", "south", "west"]; 		// An array containing all possible direction


// drawRobot function, draws a rectangular robot with starting position as passed to it by the Object that holds this information
function drawRobot(robo) {
	ctx.beginPath();									 // this indicates that the draw path will begin
	ctx.rect(robo.sX, robo.sY, robotWidth, robotHeight); // rect method is used to draw a rectangle, with starting position and width and height of the robot
	ctx.fillStyle = "#0095DD";							 // color of the robot :)
	ctx.fill();											 // fill the robot with the color	
	ctx.closePath;										 // this indicates drawing has finished				

}

/* drawFace function creates a line of width of 3 units in the specified direction.
	Here the head direction of the robot has been taken from the object objRobotPosition, the default value is East.
	startFaceX, to store the starting x co-ordinate of the face <=> line

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
		if (objRobotPosition.sX + robotWidth + robotWidth > canvas.width) {
			historyText.value += "ATTNETION!!! Cannot Move East any further.\n";
			return;
		} else {
			objRobotPosition.sX += robotWidth;
		}
	}else if (objRobotPosition.f == "west") {
		if(objRobotPosition.sX - robotWidth < 0) {
			historyText.value += "ATTNETION!!! Cannot Move West any further\n";
			return;
		} else {
			objRobotPosition.sX -= robotWidth;
		}
	}else if (objRobotPosition.f == "north") {
		if (objRobotPosition.sY  - robotHeight < 0) {
			historyText.value += "ATTNETION!!! Cannot Move North any further\n";
			return;
		} else {
			objRobotPosition.sY -= robotHeight;
		}
	} else if(objRobotPosition.f == "south") {
		if (objRobotPosition.sY + robotHeight + robotHeight > canvas.height) {
			historyText.value += "ATTNETION!!! Cannot Move South any further\n";
			return;
		} else {
			objRobotPosition.sY += robotHeight;
		}
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawRobot(objRobotPosition);
	drawFace();
}

function drawNewRobot(x,y,f) {
	x = +x;
	y = +y;

	if ( (x >= 0 && x + robotWidth <= canvas.width) && ( y >= 0 && y + robotHeight <= canvas.height)) {
		objRobotPosition.sX = x;
		objRobotPosition.sY = y;
		objRobotPosition.f = f;
		// console.log(objRobotPosition);
		drawRobot(objRobotPosition);
		drawFace();
		return true;
	} else {
		historyText.value += "Robot cannot stay on the table.\n";
		return false;
	}
}

function reportPosition() {
	historyText.value +=  "OUTPUT : " + objRobotPosition.sX + "," + objRobotPosition.sY + "," + objRobotPosition.f.toUpperCase() + "\n";
	//return objRobotPosition.sX + "," + objRobotPosition.sY + "," + objRobotPosition.f.toUpperCase();
}
// drawRobot(objRobotPosition);
// drawFace();
// setTimeout(moveRobot, 2000);
// setTimeout(moveRobot, 3000);
// setTimeout(moveRobot, 4000);
// setTimeout(moveRobot, 5000);
// setTimeout(moveRobot, 6000);
// setTimeout(moveRobot, 7000);

// setTimeout(turnRight, 4000);
// setTimeout(moveRobot, 6000);
