/*Class that represents a Ghost, it recieves the ghost's initial positions*/
function Ghost( initialX, initialY ){
			
			this.initialX = initialX;/*Initial ghost's X position*/
			this.initialY = initialY;/*Initial ghost's Y position*/
			this.positionX = initialX;/*Current ghost's X position*/
			this.positionY = initialY;/*Current ghost's Y position*/
			this.savedObject = EMPTY;/*Saves the Object that will be in the ghost's future possition, whem the ghost leave that possition it will be replaced again*/
			this.weak = false;/*Indicates that pacman has super power*/
			this.inPrison = true;/*Indicates that the ghost still in prison*/
			this.direction = "UP";/*Indicates the current ghost direction. Possible values: "UP"|"DOWN"|"LEFT"|"RIGHT"*/
			this.oppositeDirection = "DOWN";/*Saves the opposite ghost's direction. To avoid the ghost going back in his path, this position will be considered just in last case.*/
			this.availabeDirections =[1,1,1,1]/*represents the available directions that the ghost can have. Value 1 represents available and value 0 unavailable. The order of the directions are ["UP","DOWN","RIGHT","LEFT"]*/
			this.alive = true;/*Idicates that the ghost is alive*/
			
			/*Function that moves the ghost based on his satatus: inPrison or no inPrison*/
			this.move = function(){
				/*If the ghost still in "prison" it will move just UP and DOWN*/
				if(this.inPrison==true){
					
					if(this.direction=="UP"){
						var valid = validateMoviment( this.positionX , this.positionY-1 );
							/*If the next position is a Wall change direction*/
							if(valid==WALL){
								this.direction = "DOWN";
							}
							else{/* if the next position is a EXIT the ghost will go out of the "prison"*/
								if(valid==EXIT){
									this.inPrison = false;
								}
								/*Function that applies the ghost's moviment*/
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
	
				}/*If the ghost is not in prison it will move using a random direction.*/
				else if(this.inPrison==false){
					var valid;/*Indicates that the moviment is valid or not*/
					var trying = 4;/*It keeps track of the number of direction that the random function has called but they are invalid. If all 4 dirctions were invalid the pacman will move back on his path*/
					var directions = ["UP","DOWN","RIGHT","LEFT"];/*Arry that indicates the name of directions*/
					var food=null;/*If one of the possibles directions has a food this variable will recieve the number that corresponds that direction */
					/*Check if the direction 'UP' is available*/
					valid = validateMoviment( this.positionX , this.positionY-1 );
					/*if this direction has a wall or is a invalid direction this direction will recive 0 on the availabeDirections arry*/
					if(food==null&&(valid==false || valid==WALL)){
						this.availabeDirections[0] = 0;
					}
					/*If there is food on this direction the ghost will move to this direction*/
					else if(food==null&&valid==FOOD){
						food = 0;
					}
					/*Else this direction will be marked as valid on the availabeDirections arry*/
					else{	
						this.availabeDirections[0] = 1;
					}
					/*Check if the direction 'DOWN' is available*/
					valid = validateMoviment( this.positionX , this.positionY+1 );
					if(food==null&&(valid==false || valid==WALL)){
						this.availabeDirections[1] = 0;
					}
					else if(food==null&&valid==FOOD){
						food = 1;
					}
					else{
						this.availabeDirections[1] = 1;
					}
					/*Check if the direction 'RIGHT' is available*/
					valid = validateMoviment( this.positionX+1 , this.positionY );
					if(food==null&&(valid==false || valid==WALL)){
						this.availabeDirections[2] = 0;
					}
					else if(food==null && valid==FOOD){
						food = 2;
					}
					else{
						this.availabeDirections[2] = 1;
					}
					/*Check if the direction 'LEFT' is available*/
					valid = validateMoviment( this.positionX-1 , this.positionY );
					if(food==null&&(valid==false || valid==WALL)){
						this.availabeDirections[3] = 0;
					}
					else if(food==null && valid==FOOD){
						food = 3;
					}
					else{
						this.availabeDirections[3] = 1;
					}
					/* If any food was found on any direction the ghost will move to this direction*/
					if(food!= null){
						moveAccordingDirection(directions[food], this);
					}
					/*Using the availabeDirections arry a random fonction will choose one of the valid directions*/
					else{
					/*Set the opposite direction, it invalids the opposit direction(avoid the ghost go back on his path)*/
						setOppositeDirection(this)
						/*Check the number of valid directions*/
						var numberOfValid  =  numberOfValidDirections(this);
						/*If the function has retruned 4, it means that there are 2 or more valid directions, so the random function will be used*/
						if(numberOfValid==4){
							do{
								/*Generates a random number between 0 and 1000*/
								var direction = Math.round(Math.random()*1000);
								/*If the number is multiple of 5 the ghost will move right*/
								if(direction%5==0)
									direction = 2;
								/*If the number is multiple of 3 the ghost will move down*/
								else if(direction%3==0)
									direction = 1;
								/*If the number is multiple of 5 the ghost will move up*/
								else if(direction%2==0)
									direction = 0;
								/*Else the ghost will move to left*/
								else
									direction = 3;
							
								/*If that direction is a valid direction the ghost will move towards to this direction*/
								if(this.availabeDirections[direction]==1){
									moveAccordingDirection(directions[direction], this);
									break;	
								}/*Else if this direction has not been called by the random funcion the position that represents that direction will revieve value 2, and the number of tryings will be decreased*/
								else{
									if(this.availabeDirections[direction]!=2){
										this.availabeDirections[direction]=2;
										trying--;
									}
								}	
							/*In the worst case all directions (4) will be invalid*/					
							}while(trying>0);
						}
						/*If the function numberOfValidDirections has retruned null it means that none directions is valid, so the ghost will go back on his path */
						if(numberOfValid==null){
							//If go backwords is the only direction availabe do it.
							//if(goBack===true){
								moveAccordingDirection(this.oppositeDirection, this);
							//}
						}
						/*Else there is just one possible direction and it was retruned by the function numberOfValidDirections*/
						else{
							moveAccordingDirection(directions[numberOfValid], this)
						}
						
						
					}
				}
			}
			
	}
	
			
			/*Function that set the ghost's oposit direction*/
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
			
			/*Move the ghost according to the direction*/
			function moveAccordingDirection(direction, ghost){
				switch(direction){
					case "UP":
						ghost.direction="UP";
						/*If there is food in the future ghost position the quantityOfFood will be decreased by 1*/
						if(MATRIX[ghost.positionY-1][ghost.positionX]==FOOD){
						 	game.quantityOfFood--;
						}
						/*If the pacman is in the future ghost position his quantity of lives will be decreased*/
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
		
		/*Change the ghost position*/
	function applyGhostMoviment(ghost, newPositionX, newPositionY){
				
				/*Put the last element that was on the current ghost position*/
				/*Update table*/
				if(ghost.savedObject==SPECIAL_FOOD) {
					document.getElementById("tableGame").rows[ghost.positionY].cells[ghost.positionX].style.backgroundImage = IMG_SPECIAL_FOOD;
				}else if(ghost.savedObject==PACMAN) {
					document.getElementById("tableGame").rows[ghost.positionY].cells[ghost.positionX].style.backgroundImage = IMG_PACMAN;
				}
				else{
					document.getElementById("tableGame").rows[ghost.positionY].cells[ghost.positionX].style.backgroundImage = IMG_EMPTY;
				}
				/*Update Matrix*/
				MATRIX[ghost.positionY][ghost.positionX] = ghost.savedObject;
				
				/*Save the element that is present on the future ghost's position*/
				if(MATRIX[newPositionY][newPositionX] == SPECIAL_FOOD){
					ghost.savedObject = SPECIAL_FOOD
				}else if(MATRIX[newPositionY][newPositionX] == PACMAN){
					ghost.savedObject = EMPTY;//Has to change
				}else{
					ghost.savedObject = EMPTY;
				}
				
				/*The ghost recieve his new postion*/	
				ghost.positionY = newPositionY;
				ghost.positionX = newPositionX;
				
				/*Matrix and Table are updated*/
				MATRIX[ghost.positionY][ghost.positionX]=GHOST;
				document.getElementById("tableGame").rows[ghost.positionY].cells[ghost.positionX].style.backgroundImage = IMG_GHOST;
				
			}
			
			/*Analyzes the number of valid directions*/
			function numberOfValidDirections(ghost){
				var number = 0;
				var aux;
				for(var i = 0; i < 4; i++){
					if(ghost.availabeDirections[i]==1){
						number++;
						aux = i;
					}
				}
				
				if(number==0){
					return null;
				}else if(number==1){
					return aux;
				}
				else
					return 4;
			}
		
