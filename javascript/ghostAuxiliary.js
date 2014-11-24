/*Function that set the ghost's oposit direction*/
function setOppositeDirection(ghost){
	if(ghost.direction=="UP"){
		ghost.oppositeDirection = "DOWN"
		ghost.availableDirections[1] = 0;
	}
	else if(ghost.direction=="DOWN"){
		ghost.oppositeDirection = "UP"
		ghost.availableDirections[0] = 0;
	}
	else if(ghost.direction=="RIGHT"){
		ghost.oppositeDirection = "LEFT";
		ghost.availableDirections[3] = 0;
	}
	else if(ghost.direction=="LEFT"){
		ghost.oppositeDirection = "RIGHT";
		ghost.availableDirections[2] = 0;
	}
}
		
/*Move the ghost according to the direction*/
function moveAccordingDirection(direction, ghost){
		/*If the ghost is weak it will change color*/
		if(ghost.weak){
			IMG_GHOST = IMG_GHOST_WEEK;
		}else{
			IMG_GHOST = IMG_GHOST_NORMAL;
		}
		switch(direction){
			case "UP":
				ghost.direction="UP";
				/*If there is food in the future ghost position the quantityOfFood will be decreased by 1*/
				if(MATRIX[ghost.positionY-1][ghost.positionX]==FOOD){
				 	game.quantityOfFood--;
				 	applyGhostMoviment(ghost, ghost.positionX, ghost.positionY-1);
				}
				/*If the pacman is in the ghost's future position his quantity of lives will be decreased*/
				else if(MATRIX[ghost.positionY-1][ghost.positionX]==PACMAN){
					/*Just if pacman is not immune and the ghost is not weak*/
					if(!pacman.immune  && !pacman.superPower){
						pacman.die();
						applyGhostMoviment(ghost, ghost.positionX, ghost.positionY-1);
					}
					/*If pacman has super power the ghost will die*/
					else if(pacman.superPower){
						game.score += 100;
						ghost.die();
					}
				}
				/*If there is somethingelse just move*/
				else{
					applyGhostMoviment(ghost, ghost.positionX, ghost.positionY-1);
				}
				break;
			case "DOWN":
				ghost.direction="DOWN";
				if(MATRIX[ghost.positionY+1][ghost.positionX]==FOOD){
				 	game.quantityOfFood--;
				 	applyGhostMoviment(ghost, ghost.positionX, ghost.positionY+1);
				}
				else if(MATRIX[ghost.positionY+1][ghost.positionX]==PACMAN){
					if(!pacman.immune   && !pacman.superPower){
						pacman.die();
						applyGhostMoviment(ghost, ghost.positionX, ghost.positionY+1);
					}
					else if(pacman.superPower){
						game.score += 100;
						ghost.die();
					}
				}else
				{
					applyGhostMoviment(ghost, ghost.positionX, ghost.positionY+1);
				}
				break;
			case "RIGHT":
				ghost.direction="RIGHT";
				if(MATRIX[ghost.positionY][ghost.positionX+1]==FOOD){
				 	game.quantityOfFood--;
				 	applyGhostMoviment(ghost, ghost.positionX+1, ghost.positionY);
				}
				else if(MATRIX[ghost.positionY][ghost.positionX+1]==PACMAN){
					if(!pacman.immune  && !pacman.superPower){
						pacman.die();
						applyGhostMoviment(ghost, ghost.positionX+1, ghost.positionY);
					}
					else if(pacman.superPower){
						game.score += 100;
						ghost.die();
					}
				}
				else{
					applyGhostMoviment(ghost, ghost.positionX+1, ghost.positionY);
				}
				break;
			case "LEFT":
				ghost.direction="LEFT";
				if(MATRIX[ghost.positionY][ghost.positionX-1]==FOOD){
				 	game.quantityOfFood--;
				 	applyGhostMoviment(ghost, ghost.positionX-1, ghost.positionY);
				}
				else if(MATRIX[ghost.positionY][ghost.positionX-1]==PACMAN){
					if(!pacman.immune  && !pacman.superPower){
						pacman.die();
						applyGhostMoviment(ghost, ghost.positionX-1, ghost.positionY);
					}
					else if(pacman.superPower){
						game.score += 100;
						ghost.die();
					}
				}
				else{
					applyGhostMoviment(ghost, ghost.positionX-1, ghost.positionY);
				}
				break;		
		}
}
	
/*Change the ghost position*/
function applyGhostMoviment(ghost, newPositionX, newPositionY){
		
	/*Put the last element that was on the current ghost position*/
	/*Update table*/
	if(ghost.savedObject==SPECIAL_FOOD) {
		document.getElementById("tableGame").rows[ghost.positionY].cells[ghost.positionX].style.backgroundImage = IMG_SPECIAL_FOOD;
	}
	else if(ghost.savedObject==PACMAN) {
		document.getElementById("tableGame").rows[ghost.positionY].cells[ghost.positionX].style.backgroundImage = IMG_PACMAN;
	}
	else{
		document.getElementById("tableGame").rows[ghost.positionY].cells[ghost.positionX].style.backgroundImage = IMG_EMPTY;
	}
	/*Update Matrix*/
	MATRIX[ghost.positionY][ghost.positionX] = ghost.savedObject;
	
	/*Save the element that is present on the future ghost position*/
	if(MATRIX[newPositionY][newPositionX] == SPECIAL_FOOD){
		ghost.savedObject = SPECIAL_FOOD
	}
	else if(MATRIX[newPositionY][newPositionX] == PACMAN && pacman.blocked){
		ghost.savedObject = PACMAN;
	}else{
		ghost.savedObject = EMPTY;
	}
	
	/*The ghost recieve his new postion*/	
	ghost.positionY = newPositionY;
	ghost.positionX = newPositionX;
	
	/*Matrix and Table are updated*/
	MATRIX[ghost.positionY][ghost.positionX]=GHOST+ghost.number;
	document.getElementById("tableGame").rows[ghost.positionY].cells[ghost.positionX].style.backgroundImage = IMG_GHOST;
	
	//printMatrix();
	
}
		
/*Analyzes the number of valid directions*/
function numberOfValidDirections(ghost){
	var number = 0;
	var aux;
	for(var i = 0; i < 4; i++){
		if(ghost.availableDirections[i]==1){
			number++;/*Counts the number of valid directions*/
			aux = i;/*Save it to be returned*/
		}
	}
	/*If none direction is available return null*/
	if(number==0){
		return null;
	/*If just one direction is available returns the number that represents this direction*/	
	}else if(number==1){
		return aux;
	}
	/*If two or more directions are available return 4*/
	else
		return 4;
}
