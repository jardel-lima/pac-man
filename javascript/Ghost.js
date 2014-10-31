/*Class that represents a Ghost, it recieves the ghost's initial positions*/
function Ghost( initialX, initialY ){
			
			this.initialX = initialX;//Initial ghost's X position
			this.initialY = initialY;//Initial ghost's Y position
			this.positionX = initialX;//Current ghost's X position
			this.positionY = initialY;//Current ghost's Y position
			this.savedObject = EMPTY;//Saves the Object that will be in the ghost's future possition, whem the ghost leave that possition it will be replaced again
			this.weak = false;//Indicates that pacman has super power
			this.inPrison = true;//Indicates that the ghost still in prison
			this.direction = "UP";//Indicates the current ghost direction. Possible values: "UP"|"DOWN"|"LEFT"|"RIGHT"
			this.oppositeDirection = "DOWN";//Saves the opposite ghost's direction. To avoid the ghost going back in his path, this position will be considered just in last case.
			
			//Function that moves the ghost based on his satatus: inPrison or no inPrison
			this.move = function(){
				//If the ghost still in "prison" it will move just UP and DOWN
				if(this.inPrison==true){
					
					if(this.direction=="UP"){
						var valid = validateMoviment( this.positionX , this.positionY-1 );
						//If the next position is a Wall change direction
						if(valid==WALL){
							this.direction = "DOWN";
						}
						else{
						    //Function that applies the ghost's moviment
							applyGhostMoviment(this, this.positionX, this.positionY-1);
							//printMatrix();
							
						}
					}
					else if(this.direction=="DOWN"){
						var valid = validateMoviment( this.positionX , this.positionY+1 );
						if(valid==WALL){
							this.direction = "UP";
						}
						else{
						
							applyGhostMoviment(this, this.positionX, this.positionY+1);
							
						}
					}
				
				}
			
			}
			//Change the ghost position
			function applyGhostMoviment(ghost, newPositionX, newPositionY){
				MATRIX[ghost.positionY][ghost.positionX] = ghost.savedObject;
				document.getElementById("tableGame").rows[ghost.positionY].cells[ghost.positionX].style.backgroundImage = IMG_EMPTY;
				ghost.savedObjectObject = MATRIX[newPositionY][newPositionX];
				ghost.positionY = newPositionY;
				ghost.positionX = newPositionX;
				MATRIX[ghost.positionY][ghost.positionX]=GHOST;
				document.getElementById("tableGame").rows[ghost.positionY].cells[ghost.positionX].style.backgroundImage = IMG_GHOST;
			}
			
		}
