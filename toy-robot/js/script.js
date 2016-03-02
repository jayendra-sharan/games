var canvas = document.getElementById('gameCanvas');		
var ctx = canvas.getContext('2d');						

// origin can be declared here
var objOrigin = {x : 0, y: canvas.height};				

/* 
*	Object to hold the starting position of the robot in terms of x and y axis,
*	also the direction of head of the robot
*/
var objRobotPosition = {								
	sX : 0,												// 
	sY : 0,
	f : "east"
};

var robotWidth = 50;									
var robotHeight = 50;									
var face = "east";										

// An array containing all possible direction
var arrFaces = ["north", "east", "south", "west"]; 		


/*
*	drawRobot function, draws a rectangular robot with starting position
*	as passed to it by the Object that holds this information.
*/

function drawRobot(robo) {
	// this indicates that the draw path will begin
	ctx.beginPath();									 

/* 
*	rect method is used to draw a rectangle, with starting position and width 
* and height of the robot	
*/
	ctx.rect(robo.sX, robo.sY, robotWidth, robotHeight); 

	// fill the robot with the color
	ctx.fillStyle = "#0095DD";
	ctx.fill();											 	

	// this indicates drawing has finished
	ctx.closePath;										 				

}

/*
*	drawFace function creates a line of width of 3 units in the specified 
*	direction. Here the head direction of the robot has been taken from the
*	object objRobotPosition, The default value is East. startFaceX, to store
*	the starting x co-ordinate of the face <=> line startFaceY, to store the
*	startng y co-ordinate of the face <=> line.
*
*	moveTo method will move the drawing pointer (not visible) to the 
*	co-ordinates given to it. 
*
*	lineTo method will create a line from the above point (mentioned in 
*	the moveTo)	to the co-ordinates mentioned in this method. The width of 
* line will be 3 units.
*/

function drawFace() {
	var startFaceX = null;										
	var startFaceY = null;										
	ctx.beginPath();											
	if (objRobotPosition.f === "east") {							
		/*
		*	when the robot is facing east, it's face should be a vertical 
		* line at the right edge of the rectangular box.
		*/
		startFaceX = objRobotPosition.sX+robotWidth-3;			
		startFaceY = objRobotPosition.sY;						
		ctx.moveTo(startFaceX, startFaceY);
		//vertical line, hence height of line => startFaceY + robotHeight
		ctx.lineTo(startFaceX, startFaceY + robotHeight);		
	}else if (objRobotPosition.f === "west") {
		/* 
		*	when the robot is facing east, it's face should be a vertical line
		* at the left edge of the rectangular box
		*/
		startFaceX = objRobotPosition.sX;						
		startFaceY = objRobotPosition.sY;
		ctx.moveTo(startFaceX, startFaceY);

		//vertical line, hence height of line => startFaceY + robotHeight
		ctx.lineTo(startFaceX, startFaceY + robotHeight);		
	}else if (objRobotPosition.f === "north") {
		/*
		*	when the robot is facing north, it's face should be a horizontal line
		* at the top of the rectangular box.
		*/
		startFaceX = objRobotPosition.sX;
		startFaceY = objRobotPosition.sY;
		ctx.moveTo(startFaceX, startFaceY);

		//horizontal line, hence width of line => startFaceX + robotWidth
		ctx.lineTo(startFaceX + robotWidth, startFaceY);		
	} else if(objRobotPosition.f === "south") {
		/*
		*	when the robot is facing north, it's face should be a horizontal line
		* at the bottom of the rectangular box.
		*/
		startFaceX = objRobotPosition.sX;						
		startFaceY = objRobotPosition.sY + robotHeight-3;
		ctx.moveTo(startFaceX, startFaceY);

		//horizontal line, hence width of line => startFaceX + robotWidth
		ctx.lineTo(startFaceX + robotWidth, startFaceY);		
	}
	ctx.lineWidth = 3;	
	ctx.strokeStyle = "#000000";
	ctx.stroke();								
	ctx.closePath();						
}

/*
*	Function turnRight and turnLeft, turns robot's face to right and left 
*	respectively. Turning face means, the robot will rotate by 90 degrees 
*	without changing it's position.
*
*	An array has been used to find the next direction from the sequence N E S W.
*	For example: if the current direction is E, turn left will turn robot's face
* to N and turnRight will turn to S.
*
*	Boundary Condition: if the current direction is N, turn left will make the
* face towards W and if the current direction is W, turnRight will make it 
* facing N, making the array circular.
*/


function turnRight() {
	//get the current facing direction from the RobotPosition object
	var nowFacing = objRobotPosition.f;							

	//get the index of the face direction in arrFaces
	var nowFacingIndex = arrFaces.indexOf(nowFacing);			

	//Checking boundary condition
	if (nowFacingIndex == arrFaces.length -1) {					

		//changing direction
		trunFaceTo = 0;											
	} else {

		//changing direction, normally
		trunFaceTo = nowFacingIndex + 1;						
	}
	objRobotPosition.f = arrFaces[trunFaceTo];
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	/*
	* draw the Robot with the RobotPosition. IMPORTANT: Only value of face has changed
	*/
	drawRobot(objRobotPosition);				

	//draw the new face					
	drawFace();													
}

function turnLeft() {

	//get the current facing direction from the RobotPosition object
	var nowFacing = objRobotPosition.f;							

	//get the index of the face direction in arrFaces
	var nowFacingIndex = arrFaces.indexOf(nowFacing);			

	//Checking boundary condition
	if (nowFacingIndex == 0) {	

		//changing direction
		trunFaceTo = arrFaces.length - 1;						 
	} else {

		//changing direction, normally
		trunFaceTo = nowFacingIndex - 1;						
	}
	objRobotPosition.f = arrFaces[trunFaceTo];
	ctx.clearRect(0, 0, canvas.width, canvas.height);			

	/*
	* draw the Robot with the RobotPosition. IMPORTANT: Only value of face has changed
	*/
	drawRobot(objRobotPosition);				

	//draw the new face				
	drawFace();														
}

/*
*	function moveRobot will move the robot to 1 unit.
*	A robot can move only in the direction it is facing.
*	To move the robot change of starting position is needed,
*	which is achieved by modifying the RobotObject's sX and sY values.
*
*	IMPORTANT:
*		Check East Edge: A robot cannot move further to east, 
*			if it has reached the point where the next move may send the robot off 
*			the canvas width.
*	
*		Check West Edge: A robot cannot move further to west,
*			if it has reached the point where the next move may send the robot off 
*			the canvas width.
*
*		Check North Edge: A robot cannot move further to north, 
*			if it has reached the point where the next move may send the robot off
*			the canvas width.
*		
*		Check South Edge: A robot cannot move further to south,
*			if it has reached the point where the next move may send the robot off 
*			the canvas width.
*/


function moveRobot() {
	if (objRobotPosition.f == "east") {												

		//Check East Edge
		if (objRobotPosition.sX + robotWidth + robotWidth > canvas.width) {			
			historyText.value += "ATTENTION!!! Cannot Move East any further.\n";	
			return;
		} else {

			//Move the robot to east
			objRobotPosition.sX += robotWidth;												
		}
	}else if (objRobotPosition.f === "west") {

		// Check West Edge
		if(objRobotPosition.sX - robotWidth < 0) {									
			historyText.value += "ATTENTION!!! Cannot Move West any further\n";
			return;
		} else {

			// Move the robot to West
			objRobotPosition.sX -= robotWidth;										
		}
	}else if (objRobotPosition.f === "north") {										

		// Check Norht Edge
		if (objRobotPosition.sY  - robotHeight < 0) {								
			historyText.value += "ATTENTION!!! Cannot Move North any further\n";	
			return;
		} else {

			// Move the robot to North
			objRobotPosition.sY -= robotHeight;										
		}
	} else if(objRobotPosition.f === "south") {

		// Check South Edge
		if (objRobotPosition.sY + robotHeight + robotHeight > canvas.height) {		
			historyText.value += "ATTENTION!!! Cannot Move South any further\n";
			return;
		} else {

			// Move the robot to South
			objRobotPosition.sY += robotHeight;										
		}
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawRobot(objRobotPosition);
	drawFace();
}

/*
*	drawNewRobot function accepts, x and y-co-ordinates
* and face direction to draw the robot.
*
*	It additionally checks, if the x and y co-ordinates are legal input or not.
* A robot cannot be drawn if it appears to be off the table.
*/


function drawNewRobot(x,y,f) {
	x = +x;
	y = +y;

	// check if the co-ordinates are legal, if legal, draw the robot
	if ( (x >= 0 && x + robotWidth <= canvas.width) && 
			( y >= 0 && y + robotHeight <= canvas.height)) { 
		
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
*	reportPosition function will print the current location of the robot.
*/

function reportPosition() {
	historyText.value +=  "OUTPUT : " + objRobotPosition.sX + "," + 
	objRobotPosition.sY + "," + objRobotPosition.f.toUpperCase() + "\n";
}