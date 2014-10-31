/*Class that represents a Pacman*/
function Pacman(){
			
			this.positionX = 1;//Pacman X position in the matrix and table
			this.positionY = 1;//Pacman Y position in the matrix and table
			this.direction = null;//Pacman's direction, it can be "UP"|"DOWN"|"RIGHT"|"LEFT"
			this.blocked = true;//Variable that represents if pacman is blocked because a wall
			this.superPower = false;//Indcates that pacman "ate" a especial food, that gives him super power to eat ghosts
			this.lives = 4;//Number of remainings pacman' lives
            this.openMouth = true;//Indicates if pacman shoul appear with his mouth opened or closed
			
			//Function that based on the pacman direction validate and change the possition of the pacman
			this.move = function(){
				//If pacman has any direction it will verify if pacman cam change position and if so on it will change his possition
				if(this.direction != null){
					var yAux = this.positionY;
					var xAux = this.positionX;
					//Switch the pacman' direction
					switch(this.direction){
					 case "UP":
					 	yAux --;/*Changin pacman possition and image*/
					 	//Check if the pacman's mouth is opened or closed, it will change the pacman' image
                        if(this.openMouth){
                            IMG_PACMAN = IMG_PACMAN_UP;
                            this.openMouth = false;
                        }
                        else{
                            IMG_PACMAN = IMG_PACMAN_UP2;
                            this.openMouth = true;
                        }
					 	break;
					 case "DOWN":
					 	yAux ++;
					 	if(this.openMouth){
                            IMG_PACMAN = IMG_PACMAN_DOWN;
                            this.openMouth = false;
                        }
                        else{
                            IMG_PACMAN = IMG_PACMAN_DOWN2;
                            this.openMouth = true;
                        }
					 	break;
					 case "RIGHT":
					 	xAux ++;
					 	if(this.openMouth){
                            IMG_PACMAN = IMG_PACMAN_RIGHT;
                            this.openMouth = false;
                        }
                        else{
                            IMG_PACMAN = IMG_PACMAN_RIGHT2;
                            this.openMouth = true;
                        }
					 	break;
					 case "LEFT":
					 	xAux --;
					 	if(this.openMouth){
	                        IMG_PACMAN = IMG_PACMAN_LEFT;
	                        this.openMouth = false;
	                    }
	                    else{
	                        IMG_PACMAN = IMG_PACMAN_LEFT2;
	                        this.openMouth = true;
	                    }
					 	break;			
					}
					//It checks if the moviment is valid. The function returns what there is in the pacman's future possition
					var validMoviment = validateMoviment(xAux, yAux);
					if(validMoviment!=null){
						this.blocked = false;
						//Based on what there is in the pacman's future position do something different
						if(validMoviment==FOOD){
							//This function will apply the new pacman's position
							applyPacmanMoviment(this, xAux, yAux);
							game.score+=10;
						}
						else if(validMoviment==SPECIAL_FOOD){
							//TODO
							applyPacmanMoviment(this, xAux, yAux);
							game.score+=20;
						}
						else if(validMoviment==GHOST){
							if(this.superPower){
								applyPacmanMoviment(this, xAux, yAux);
							}
							else{
								//TODO
							}
						}
						else if(validMoviment==EMPTY){
							applyPacmanMoviment(this, xAux, yAux);
						}
						else if(validMoviment==WALL){
							this.blocked = true;
						}
					}
					
				}
			}
			//Function that changes pacman's possition
			function applyPacmanMoviment(pacman, newPositionX, newPositionY){
				MATRIX[pacman.positionY][pacman.positionX] = EMPTY;
				document.getElementById("tableGame").rows[pacman.positionY].cells[pacman.positionX].style.backgroundImage = IMG_EMPTY;
				pacman.positionY = newPositionY;
				pacman.positionX = newPositionX;
				MATRIX[pacman.positionY][pacman.positionX] = PACMAN;
				document.getElementById("tableGame").rows[pacman.positionY].cells[pacman.positionX].style.backgroundImage = IMG_PACMAN;
				//printMatrix();
			}
			
			
		}
		
		

