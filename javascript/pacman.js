/*Class that represents a Pacman*/
function Pacman(){
			
	this.positionX = 1;//Pacman X position in the matrix and table
	this.positionY = 1;//Pacman Y position in the matrix and table
	this.direction = null;//Pacman's direction, it can be "UP"|"DOWN"|"RIGHT"|"LEFT"
	this.blocked = true;//Variable that represents if pacman is blocked because a wall
	this.superPower = false;//Indcates that pacman "ate" a especial food, that gives him super power to eat ghosts
	this.lives = 4;//Number of remainings pacman's lives
    this.openMouth = true;//Indicates if pacman should appear with his mouth opened or closed
    this.immune = false;/*Indicates if pacman is immune to the ghosts. It will happen when pacman dies, it will be immune for 3 seconds  */
    this.deathTime = null;/*Helps to control the immune time*/
    this.superPowerTime = null;/*Helps to contro the super power time*/
    this.ghostKilled = null;/*Indicates which ghost was killed by the pacman*/
	
	//Function that based on the pacman direction validate and change the possition of the pacman
	this.move = function(){
		//If pacman has any direction it will verify if pacman can change position and if he does it will change his possition
		if(this.direction != null){
			var yAux = this.positionY;
			var xAux = this.positionX;
			//Switch the pacman' direction
			switch(this.direction){
			 case "UP":
			 	yAux --;/*Changin pacman possition and image*/
			 	//Check if the pacman's mouth is opened or closed, it will change the pacman's image
                if(this.openMouth){
                	if(this.immune){
                		 IMG_PACMAN = IMG_PACMAN_UP_IMMUNE;
                	}
                	else{
                		 IMG_PACMAN = IMG_PACMAN_UP;
                	}
                    this.openMouth = false;
                }
                else{
                	/*If pacman is immune it will change color*/
                	if(this.immune){
                		 IMG_PACMAN = IMG_PACMAN_UP2_IMMUNE;
                	}
                	else{
                		 IMG_PACMAN = IMG_PACMAN_UP2;
                	}
                   
                    this.openMouth = true;
                }
			 	break;
			 case "DOWN":
			 	yAux ++;
			 	if(this.openMouth){
                    if(this.immune){
                		  IMG_PACMAN = IMG_PACMAN_DOWN_IMMUNE;
                	}
                	else{
                		  IMG_PACMAN = IMG_PACMAN_DOWN;
                	}
                    this.openMouth = false;
                }
                else{
                	if(this.immune){
                		  IMG_PACMAN = IMG_PACMAN_DOWN2_IMMUNE;
                	}
                	else{
                		  IMG_PACMAN = IMG_PACMAN_DOWN2;
                	}
                   
                    this.openMouth = true;
                }
			 	break;
			 case "RIGHT":
			 	xAux ++;
			 	if(this.openMouth){
                    if(this.immune){
                		  IMG_PACMAN = IMG_PACMAN_RIGHT_IMMUNE;
                	}
                	else{
                		 IMG_PACMAN = IMG_PACMAN_RIGHT;
                	}
                    this.openMouth = false;
                }
                else{
                	if(this.immune){
                		  IMG_PACMAN = IMG_PACMAN_RIGHT2_IMMUNE;
                	}
                	else{
                		 IMG_PACMAN = IMG_PACMAN_RIGHT2;
                	}
                    
                    this.openMouth = true;
                }
			 	break;
			 case "LEFT":
			 	xAux --;
			 	if(this.openMouth){
                    if(this.immune){
                		  IMG_PACMAN = IMG_PACMAN_LEFT_IMMUNE;
                	}
                	else{
                		  IMG_PACMAN = IMG_PACMAN_LEFT;
                	}
                    this.openMouth = false;
                }
                else{
                	if(this.immune){
                		  IMG_PACMAN = IMG_PACMAN_LEFT2_IMMUNE;
                	}
                	else{
                		  IMG_PACMAN = IMG_PACMAN_LEFT2;
                	}
                    
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
					game.quantityOfFood--;
					game.score+=10;
				}
				else if(validMoviment==SPECIAL_FOOD){
					/*If pacman finds a specil food his super power will be activated*/
					this.superPower = true;
					this.superPowerTime = game.time;
					game.score+=20;
					applyPacmanMoviment(this, xAux, yAux);
				}
				else if(validMoviment.search(GHOST)!=-1){
					/*If pacman finds a ghost and his super power has beem activated or he is immune it will move normally as there is no ghost*/
					if(this.superPower||this.immune){
						/*If he has super power he will kill the ghost*/
						if(this.superPower){
							this.ghostKilled = validMoviment;
							game.score+=100;
						}
						
					} 
					/*If pacman has not super power or he is not immune he will die*/
					else{
						this.lives--;
						this.immune = true;
						this.deathTime = game.time;
					}
					applyPacmanMoviment(this, xAux, yAux);	
				}
				/*If he finds a empty space or an exit it will move normally*/
				else if(validMoviment==EMPTY||validMoviment==EXIT){
					applyPacmanMoviment(this, xAux, yAux);
				}
				/*If he finds a wall he will be blocked*/
				else if(validMoviment==WALL){
					this.blocked = true;
				}
			}
			
		}
	}
	
}
		
		
		
		

