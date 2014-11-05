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
			this.availabeDirections =[1,1,1,1]//represents the available directions that the ghost can have. Value 1 represents available and value 0 unavailable. The order of the directions are ["UP","DOWN","RIGHT","LEFT"]
			this.alive = true;//Idicates that the ghost is alive
			
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
								if(valid==EXIT){
									this.inPrison = false;
								}
								//Function that applies the ghost's moviment
								applyGhostMoviment(this, this.positionX, this.positionY-1);
							
							}
					}
					else if(this.direction=="DOWN"){
						var valid = validateMoviment( this.positionX , this.positionY+1 );
							if(valid==WALL){
								this.direction = "UP";
							}
							else{
								if(valid==EXIT){
									this.inPrison = false;
								}
								applyGhostMoviment(this, this.positionX, this.positionY+1);
							}
					}
	
				}
				else if(this.inPrison==false){
					var valid;
					var goBack = true;
					var trying = 4;
					var directions = ["UP","DOWN","RIGHT","LEFT"];
					var direction=null;
					//Check if the direction 'UP' is available
					valid = validateMoviment( this.positionX , this.positionY-1 );
					if(direction==null&&(valid==false || valid==WALL)){
						this.availabeDirections[0] = 0;
					}
					else if(direction==null&&valid==FOOD){
						direction = 0;
					}
					else{	
						this.availabeDirections[0] = 1;
					}
					//Check if the direction 'DOWN' is available
					valid = validateMoviment( this.positionX , this.positionY+1 );
					if(direction==null&&(valid==false || valid==WALL)){
						this.availabeDirections[1] = 0;
					}
					else if(direction==null&&valid==FOOD){
						direction = 1;
					}
					else{
						this.availabeDirections[1] = 1;
					}
					//Check if the direction 'RIGHT' is available
					valid = validateMoviment( this.positionX+1 , this.positionY );
					if(direction==null&&(valid==false || valid==WALL)){
						this.availabeDirections[2] = 0;
					}
					else if(direction==null && valid==FOOD){
						direction = 2;
					}
					else{
						this.availabeDirections[2] = 1;
					}
					//Check if the direction 'LEFT' is available
					valid = validateMoviment( this.positionX-1 , this.positionY );
					if(direction==null&&(valid==false || valid==WALL)){
						this.availabeDirections[3] = 0;
					}
					else if(direction==null && valid==FOOD){
						direction = 3;
					}
					else{
						this.availabeDirections[3] = 1;
					}
					
					if(direction!= null){
						moveAccordingDirection(directions[direction], this);
					}
					else{
					//Set the opposite direction, it tries to make the ghost does not go backward
						setOppositeDirection(this);
						do{
						
							direction = Math.round(Math.random()*1000);
							if(direction%5==0)
								direction = 2;
							else if(direction%3==0)
								direction = 1;
							else if(direction%2==0)
								direction = 0;
							else
								direction = 3;
							
							if(this.availabeDirections[direction]==1){
								moveAccordingDirection(directions[direction], this);
								goBack = false;	
								break;	
							}
							else{
								if(this.availabeDirections[direction]!=2){
									this.availabeDirections[direction]=2;
									trying--;
								}
							}					
						}while(trying>0);
					
						//If go backwords is the only direction availabe do it.
						if(goBack===true){
							moveAccordingDirection(this.oppositeDirection, this);
						}
					}
				}
			}
			
	}
	//Change the ghost position
	function applyGhostMoviment(ghost, newPositionX, newPositionY){
				
				if(ghost.savedObject==EMPTY){
					document.getElementById("tableGame").rows[ghost.positionY].cells[ghost.positionX].style.backgroundImage = IMG_EMPTY;
				}else{
					document.getElementById("tableGame").rows[ghost.positionY].cells[ghost.positionX].style.backgroundImage = IMG_SPECIAL_FOOD;
				}
				
				if(MATRIX[newPositionY][newPositionX] == SPECIAL_FOOD){
					ghost.savedObject = SPECIAL_FOOD
				}else{
					ghost.savedObject = EMPTY;
				}
				
				MATRIX[ghost.positionY][ghost.positionX] = ghost.savedObject;
				
				ghost.savedObjectObject = MATRIX[newPositionY][newPositionX];
				ghost.positionY = newPositionY;
				ghost.positionX = newPositionX;

				MATRIX[ghost.positionY][ghost.positionX]=GHOST;
				
				document.getElementById("tableGame").rows[ghost.positionY].cells[ghost.positionX].style.backgroundImage = IMG_GHOST;
				
			}
			
			function setOppositeDirection(ghost){
				if(ghost.direction=="UP"){
					ghost.oppositeDirection = "DOWN"
					ghost.availabeDirections[1] = 0;
				}
				else if(ghost.direction=="DOWN"){
					ghost.oppositeDirection = "UP"
					ghost.availabeDirections[0] = 0;
				}
				else if(ghost.direction=="RIGHT"){
					ghost.oppositeDirection = "LEFT";
					ghost.availabeDirections[3] = 0;
				}
				else if(ghost.direction=="LEFT"){
					ghost.oppositeDirection = "RIGHT";
					ghost.availabeDirections[2] = 0;
				}
			}
			
			function moveAccordingDirection(direction, ghost){
				switch(direction){
					case "UP":
						ghost.direction="UP";
						if(MATRIX[ghost.positionY-1][ghost.positionX]==FOOD){
						 	game.quantityOfFood--;
						}
						else if(MATRIX[ghost.positionY-1][ghost.positionX]==PACMAN){
							pacman.lives--;
							alert("You Died!!");
						}
						applyGhostMoviment(ghost, ghost.positionX, ghost.positionY-1);
						break;
					case "DOWN":
						ghost.direction="DOWN";
						if(MATRIX[ghost.positionY+1][ghost.positionX]==FOOD){
						 	game.quantityOfFood--;
						}
						else if(MATRIX[ghost.positionY+1][ghost.positionX]==PACMAN){
							pacman.lives--;
							alert("You Died!!");
						}
						applyGhostMoviment(ghost, ghost.positionX, ghost.positionY+1);
						break;
					case "RIGHT":
						ghost.direction="RIGHT";
						if(MATRIX[ghost.positionY][ghost.positionX+1]==FOOD){
						 	game.quantityOfFood--;
						}
						else if(MATRIX[ghost.positionY][ghost.positionX+1]==PACMAN){
							pacman.lives--;
							alert("You Died!!");
						}
						applyGhostMoviment(ghost, ghost.positionX+1, ghost.positionY);
						break;
					case "LEFT":
						ghost.direction="LEFT";
						if(MATRIX[ghost.positionY][ghost.positionX-1]==FOOD){
						 	game.quantityOfFood--;
						}
						else if(MATRIX[ghost.positionY][ghost.positionX-1]==PACMAN){
							pacman.lives--;
							alert("You Died!!");
						}
						applyGhostMoviment(ghost, ghost.positionX-1, ghost.positionY);
						break;		
				}
			
		}
