var commands = document.getElementById('commands');
var enterButton = document.getElementById('enter');
var historyText = document.getElementById('historyText');

historyText.value = "COMMAND HISTORY\n"

var robot = false;


enterButton.addEventListener("click", commandInput, false);
commands.addEventListener("keypress", commandInputKey, false);

function commandInputKey(e) {
	if (e.keyCode == 13) {
		commandInput();
	}
}
function commandInput() {
	var commandsValue = commands.value;
	historyText.value += "INPUT : " + commandsValue + "\n";
	commandsValue = commandsValue.replace(/\s/g,"").toLowerCase();
	// console.log(commandsValue);
	if (robot) {
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
	} else {
		if (commandsValue.indexOf("place") >= 0) {
			var pos = commandsValue.substring(5, commandsValue.length);
			pos = pos.split(",");
			if (pos.length < 3) {
				historyText.value += "ERROR!!! Invalid input";
				commands.value = "";
				return;
			}
			if (robot) {
				commands.value = "";
				return;
			} else {
				// draw the robot
				if (arrFaces.indexOf(pos[2]) >= 0) {
					if (drawNewRobot(pos[0], pos[1], pos[2])) {
						robot = true;
					}
				}else {
					historyText.value += "ERROR!!! Invalid face direction.\n"
				}
			}
		} else { 
			historyText.value += "ERROR!!! Invalid input.\n"
		}
	}
	commands.value = "";

}