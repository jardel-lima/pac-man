//Function that changes pacman's possition
function applyPacmanMoviment(pacman, newPositionX, newPositionY){
	MATRIX[pacman.positionY][pacman.positionX] = EMPTY;
	document.getElementById("tableGame").rows[pacman.positionY].cells[pacman.positionX].style.backgroundImage = 'url('+IMG_EMPTY.src+')';
	pacman.positionY = newPositionY;
	pacman.positionX = newPositionX;
	MATRIX[pacman.positionY][pacman.positionX] = PACMAN;
	pacman.path.unshift([pacman.positionX,pacman.positionY]);

	if(pacman.path.length > PACMAN_PATH_LENGTH){
		pacman.path.pop()
	}
	/*console.log(pacman.path)*/

	document.getElementById("tableGame").rows[pacman.positionY].cells[pacman.positionX].style.backgroundImage = IMG_PACMAN;
	
	printMatrix();
}
