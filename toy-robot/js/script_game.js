var commands = document.getElementById('commands');
var enterButton = document.getElementById('enter');
var historyText = document.getElementById('historyText');

historyText.value = "COMMAND HISTORY\n";

/*
*	robot is a boolean variable to check if robot exists or not.
*	false: doesn't exist
*	true: exists
*/

var robot = false;

// adding click event to the click button
enterButton.addEventListener("click", commandInput, false);			

// adding keypress to check if enter key has been pressed
commands.addEventListener("keypress", commandInputKey, false);		

function commandInputKey(e) {

	// check if the key pressed is enter
	if (e.keyCode === 13) {											

		//perform the action using the command
		commandInput();
	}
}

/*
*	commandInput function controls the game.
*	the value of commandsValue is taken from the input box,
*	in which a user will give commands.
*	Commands and function given below calls are self explanatory.
*/


function commandInput() {
	var commandsValue = commands.value;
	historyText.value += "INPUT : " + commandsValue + "\n";

	// remove all whitespaces and convert the input to lower case
	commandsValue = commandsValue.replace(/\s/g,"").toLowerCase(); 	
	if (robot) {													

		// Only if robot exists these commands can be successful	
		if (commandsValue === "move") {
			moveRobot();
		} else if (commandsValue === "left") {
			turnLeft();
		} else if (commandsValue === "right") {
			turnRight();
		} else if (commandsValue === "report") {
				reportPosition();
		} else {
			historyText.value += "ERROR!!! Invalid Input.\n"
		}
	} else {															
		/*
		*	If robot doesn't exist, check if the command has place word in it, 
		*	to draw the robot.
		*/

		// place exists in the command?
		if (commandsValue.indexOf("place") >= 0) {						

			// get the co-ordinates and face direction from the input
			var pos = commandsValue.substring(5, commandsValue.length);	

			// direction and face value are comma separated, convert it to an array
			pos = pos.split(",");										

			// if there are less than three commands, x,y axes and face, reject the input	
			if (pos.length < 3) {										
				historyText.value += "ERROR!!! Invalid input.\n";
				commands.value = "";
				return;
			}

			// check legal value of face direction
			if (arrFaces.indexOf(pos[2]) >= 0) {					
				if (drawNewRobot(pos[0], pos[1], pos[2])) {
					robot = true;
				}
			}else {
				historyText.value += "ERROR!!! Invalid face direction.\n"
			}										
		} else { 
			historyText.value += "ERROR!!! Invalid input.\n"
		}
	}
	commands.value = "";
}