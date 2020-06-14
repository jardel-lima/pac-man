//Function that changes pacman's possition
function applyPacmanMoviment(pacman, newPositionX, newPositionY){
	MATRIX[pacman.positionY][pacman.positionX] = EMPTY;
	document.getElementById("tableGame").rows[pacman.positionY].cells[pacman.positionX].style.backgroundImage = 'url('+IMG_EMPTY.src+')';
	pacman.positionY = newPositionY;
	pacman.positionX = newPositionX;
	MATRIX[pacman.positionY][pacman.positionX] = PACMAN;
	document.getElementById("tableGame").rows[pacman.positionY].cells[pacman.positionX].style.backgroundImage = IMG_PACMAN;
	
	printMatrix();
}
