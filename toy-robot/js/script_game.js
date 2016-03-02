var commands = document.getElementById('commands');
var enterButton = document.getElementById('enter');
var historyText = document.getElementById('historyText');

historyText.value = "COMMAND HISTORY\n";

/*
	robot is a boolean variable to check if robot exists or not.
	false: doesn't exist
	true: exists
*/

var robot = false;


enterButton.addEventListener("click", commandInput, false);			// adding click event to the click button
commands.addEventListener("keypress", commandInputKey, false);		// adding keypress to check if enter key has been pressed

function commandInputKey(e) {
	if (e.keyCode == 13) {											// check if the key pressed is enter
		commandInput();
	}
}

/*
	commandInput function controls the game.
	the value of commandsValue is taken from the input box, in which a user will give commands.
	Below commands and function calls are self explanatory.
*/


function commandInput() {
	var commandsValue = commands.value;
	historyText.value += "INPUT : " + commandsValue + "\n";
	commandsValue = commandsValue.replace(/\s/g,"").toLowerCase(); 	// remove all whitespaces and convert the input to lower case
	if (robot) {													// Only if robot exists these commands can be successful	
		if (commandsValue == "move") {
			moveRobot();
		} else if (commandsValue == "left") {
			turnLeft();
		} else if (commandsValue == "right") {
			turnRight();
		} else if (commandsValue == "report") {
				reportPosition();
		} else {
			historyText.value += "ERROR!!! Invalid Input.\n"
		}
	} else {															// if robot doesn't exist, check if the command has place word in it, to draw the robot
		if (commandsValue.indexOf("place") >= 0) {						// place exists in the command?
			var pos = commandsValue.substring(5, commandsValue.length);	// get the co-ordinates and face direction from the input
			pos = pos.split(",");										// direction and face value are comma separated, convert it to an array
			if (pos.length < 3) {										// if there are less than three commands, x,y axes and face, reject the input	
				historyText.value += "ERROR!!! Invalid input.\n";
				commands.value = "";
				return;
			}
			if (arrFaces.indexOf(pos[2]) >= 0) {					// check legal value of face direction
				if (drawNewRobot(pos[0], pos[1], pos[2])) {
					robot = true;
				}
			}else {
				historyText.value += "ERROR!!! Invalid face direction.\n"
			}										
			// } 
			// else {
			// 	commands.value = ""; 									// make the input empty for user
			// 	console.log("here");
			// 	return;
			// }
		} else { 
			historyText.value += "ERROR!!! Invalid input.\n"
		}
	}
	commands.value = "";
}