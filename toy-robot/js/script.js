var canvas = document.getElementById('gameCanvas');		
var ctx = canvas.getContext('2d');						

var objOrigin = {x : 0, y: canvas.height};				// origin can be declared here
var objRobotPosition = {								// Object to hold the starting position of
	sX : 0,												// the robot in terms of x and y axis, also the direction of head of the robot
	sY : 0,
	f : "east"
};

var robotWidth = 50;									
var robotHeight = 50;									
var face = "east";										
var arrFaces = ["north", "east", "south", "west"]; 		// An array containing all possible direction


/* 	drawRobot function, draws a rectangular robot with 
	starting position as passed to it by the Object that holds this information.
*/

function drawRobot(robo) {
	ctx.beginPath();									 // this indicates that the draw path will begin
	ctx.rect(robo.sX, robo.sY, robotWidth, robotHeight); // rect method is used to draw a rectangle, with starting position and width and height of the robot
	ctx.fillStyle = "#0095DD";							 // color of the robot :)
	ctx.fill();											 // fill the robot with the color	
	ctx.closePath;										 // this indicates drawing has finished				

}

/* 	drawFace function creates a line of width of 3 units in the specified direction.
	Here the head direction of the robot has been taken from the object objRobotPosition, the default value is East.
	startFaceX, to store the starting x co-ordinate of the face <=> line
	startFaceY, to store the startng y co-ordinate of the face <=> line
	moveTo method will move the drawing pointer (not visible) to the co-ordinates given to it.
	lineTo method will create a line from the above point (mentioned in the moveTo) to the co-ordinates mentioned in this method.
	the width of line will be 3 units.
*/

function drawFace() {
	var startFaceX = null;										
	var startFaceY = null;										
	ctx.beginPath();											
	if (objRobotPosition.f == "east") {							
		startFaceX = objRobotPosition.sX+robotWidth-3;			// when the robot is facing east, it's face should be a vertical line at the rught edge of the rectangular box
		startFaceY = objRobotPosition.sY;						
		ctx.moveTo(startFaceX, startFaceY);
		ctx.lineTo(startFaceX, startFaceY + robotHeight);		// vertical line, hence height of line => startFaceY + robotHeight
	}else if (objRobotPosition.f == "west") {
		startFaceX = objRobotPosition.sX;						// when the robot is facing east, it's face should be a vertical line at the left edge of the rectangular box
		startFaceY = objRobotPosition.sY;
		ctx.moveTo(startFaceX, startFaceY);
		ctx.lineTo(startFaceX, startFaceY + robotHeight);		// vertical line, hence height of line => startFaceY + robotHeight
	}else if (objRobotPosition.f == "north") {
		startFaceX = objRobotPosition.sX;						// when the robot is facing north, it's face should be a horizontal line at the top of the rectangular box
		startFaceY = objRobotPosition.sY;
		ctx.moveTo(startFaceX, startFaceY);
		ctx.lineTo(startFaceX + robotWidth, startFaceY);		// horizontal line, hence width of line => startFaceX + robotWidth
	} else if(objRobotPosition.f == "south") {
		startFaceX = objRobotPosition.sX;						// when the robot is facing north, it's face should be a horizontal line at the bottom of the rectangular box
		startFaceY = objRobotPosition.sY + robotHeight-3;
		ctx.moveTo(startFaceX, startFaceY);
		ctx.lineTo(startFaceX + robotWidth, startFaceY);		// horizontal line, hence width of line => startFaceX + robotWidth
	}
	ctx.lineWidth = 3;											// width of line
	ctx.strokeStyle = "#000000";								// color of the line
	ctx.stroke();												// stroke/fill color
	ctx.closePath();											// end of drawing
}

/*
	Function turnRight and turnLeft, turns robot's face to right and left respectively. 
	Turning face means, the robot will rotate by 90 degrees without changing it's position.
	An array has been used to find the next direction from the sequest N E S W.
	For example: if the current direction is E, turn left will turn robot's face to N and turnRight will turn to S.
	Boundary Condition: if the current direction is N, turn left will make the face towards W and 
	if the current direction is W, turnRight will make it facing N, making the array circular.
*/


function turnRight() {
	var nowFacing = objRobotPosition.f;							// get the current facing direction from the RobotPosition object
	var nowFacingIndex = arrFaces.indexOf(nowFacing);			// get the index of the face direction in arrFaces
	if (nowFacingIndex == arrFaces.length -1) {					// Checking boundary condition
		trunFaceTo = 0;											// changing direction
	} else {
		trunFaceTo = nowFacingIndex + 1;						// changing direction, normally
	}
	objRobotPosition.f = arrFaces[trunFaceTo];
	ctx.clearRect(0, 0, canvas.width, canvas.height);			// clear the canvas
	drawRobot(objRobotPosition);								// draw the Robot with the RobotPosition. IMPORTANT: Only value of face has changed
	drawFace();													// draw the new face	
}
function turnLeft() {
	var nowFacing = objRobotPosition.f;							// get the current facing direction from the RobotPosition object
	var nowFacingIndex = arrFaces.indexOf(nowFacing);			// get the index of the face direction in arrFaces
	if (nowFacingIndex == 0) {									// Checking boundary condition
		trunFaceTo = arrFaces.length - 1;						// changing direction
	} else {
		trunFaceTo = nowFacingIndex - 1;						// changing direction, normally
	}
	objRobotPosition.f = arrFaces[trunFaceTo];
	ctx.clearRect(0, 0, canvas.width, canvas.height);			// clear the canvas
	drawRobot(objRobotPosition);								// draw the Robot with the RobotPosition. IMPORTANT: Only value of face has changed
	drawFace();													// draw the new face	
}

/*
	function moveRobot will move the robot to 1 unit.
	A robot can move only in the direction it is facing.
	To move the robot change of starting position is needed,
	which is achieved by modifying the RobotObject's sX and sY values.

	IMPORTANT:
		Check East Edge: A robot cannot move further to east, if it has reached the point where the next move may send the robot off the canvas width.
		Check West Edge: A robot cannot move further to east, if it has reached the point where the next move may send the robot off the canvas width.
		Check North Edge: A robot cannot move further to east, if it has reached the point where the next move may send the robot off the canvas width.
		Check South Edge: A robot cannot move further to east, if it has reached the point where the next move may send the robot off the canvas width.
*/


function moveRobot() {
	if (objRobotPosition.f == "east") {												
		if (objRobotPosition.sX + robotWidth + robotWidth > canvas.width) {			// Check East Edge
			historyText.value += "ATTNETION!!! Cannot Move East any further.\n";	
			return;
		} else {
			objRobotPosition.sX += robotWidth;										// Move the robot to east		
		}
	}else if (objRobotPosition.f == "west") {
		if(objRobotPosition.sX - robotWidth < 0) {									// Check West Edge
			historyText.value += "ATTNETION!!! Cannot Move West any further\n";
			return;
		} else {
			objRobotPosition.sX -= robotWidth;										// Move the robot to West
		}
	}else if (objRobotPosition.f == "north") {										
		if (objRobotPosition.sY  - robotHeight < 0) {								// Check Norht Edge
			historyText.value += "ATTNETION!!! Cannot Move North any further\n";	
			return;
		} else {
			objRobotPosition.sY -= robotHeight;										// Move the robot to North
		}
	} else if(objRobotPosition.f == "south") {
		if (objRobotPosition.sY + robotHeight + robotHeight > canvas.height) {		// Check South Edge
			historyText.value += "ATTNETION!!! Cannot Move South any further\n";
			return;
		} else {
			objRobotPosition.sY += robotHeight;										// Move the robot to South
		}
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawRobot(objRobotPosition);
	drawFace();
}

/*
	drawNewRobot function accepts, x and y-co-ordinates and face direction to draw the robot.
	It additionally checks, if the x and y co-ordinates are legal input or not.
	A robot cannot be drawn if it appears to be off the table.
*/


function drawNewRobot(x,y,f) {
	x = +x;
	y = +y;

	if ( (x >= 0 && x + robotWidth <= canvas.width) && ( y >= 0 && y + robotHeight <= canvas.height)) { // check if the co-ordinates are legal, if legal, draw the robot
		objRobotPosition.sX = x;					
		objRobotPosition.sY = y;
		objRobotPosition.f = f;
		drawRobot(objRobotPosition);
		drawFace();
		return true;
	} else {
		historyText.value += "Robot cannot stay on the table.\n";			
		return false;
	}
}

/*
	reportPosition function will print the current location of the robot.
*/

function reportPosition() {
	historyText.value +=  "OUTPUT : " + objRobotPosition.sX + "," + objRobotPosition.sY + "," + objRobotPosition.f.toUpperCase() + "\n";
}