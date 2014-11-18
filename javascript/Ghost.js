/*Class that represents a Ghost, it recieves the ghost's initial positions and number*/
function Ghost( initialX, initialY, number ){
			
	this.initialX = initialX;/*Initial ghost's X position*/
	this.initialY = initialY;/*Initial ghost's Y position*/
	this.positionX = initialX;/*Current ghost's X position*/
	this.positionY = initialY;/*Current ghost's Y position*/
	this.savedObject = EMPTY;/*Saves the Object that will be in the ghost's future possition, whem the ghost leaves that possition it will be replaced again*/
	this.weak = false;/*Indicates that pacman has super power*/
	this.inPrison = true;/*Indicates that the ghost still in prison*/
	this.direction = "UP";/*Indicates the current ghost direction. Possible values: "UP"|"DOWN"|"LEFT"|"RIGHT"*/
	this.oppositeDirection = "DOWN";/*Saves the opposite ghost's direction. To avoid the ghost going back on his path, this position will be considered just in the last case.*/
	this.availableDirections =[1,1,1,1]/*represents the available directions that the ghost can have. Value 1 represents available and value 0 unavailable. The order of the directions are ["UP","DOWN","RIGHT","LEFT"]*/
	this.alive = true;/*Idicates that the ghost is alive*/
	this.number = number;/*Represents the ghost number. It identifies the ghost*/
	
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
					/*Else apply moviment*/
					else{
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
						applyGhostMoviment( this, this.positionX, this.positionY+1);
					}
			}

		}/*If the ghost is not in prison and it is alive it will move using a random direction.*/
		else if(this.inPrison==false && this.alive){
			var valid;/*Indicates that the moviment is valid or not*/
			var trying = 4;/*It keeps track of the number of direction that the random function has called but they are invalid. If all 4 dirctions were invalid the pacman will move back on his path*/
			var directions = ["UP","DOWN","RIGHT","LEFT"];/*Arry that indicates the name of directions*/
			var food=null;/*If one of the possibles directions has a food this variable will recieve the number that corresponds that direction */
			/*Check if the direction 'UP' is available*/
			valid = validateMoviment( this.positionX , this.positionY-1 );
			/*if this direction has a wall or is a invalid direction this direction will recive 0 on the availableDirections arry*/
			if(food==null&&(valid==false || valid==WALL || valid.search(GHOST)!=-1)){
				this.availableDirections[0] = 0;
			}
			/*If there is food on this direction the ghost will move to this direction*/
			else if(food==null&&valid==FOOD){
				food = 0;
			}
			/*Else, this direction will be marked as valid on the availableDirections arry*/
			else{	
				this.availableDirections[0] = 1;
			}
			/*Check if the direction 'DOWN' is available*/
			valid = validateMoviment( this.positionX , this.positionY+1 );
			if(food==null&&(valid==false || valid==WALL || valid.search(GHOST)!=-1)){
				this.availableDirections[1] = 0;
			}
			else if(food==null&&valid==FOOD){
				food = 1;
			}
			else{
				this.availableDirections[1] = 1;
			}
			/*Check if the direction 'RIGHT' is available*/
			valid = validateMoviment( this.positionX+1 , this.positionY );
			if(food==null&&(valid==false || valid==WALL || valid.search(GHOST)!=-1)){
				this.availableDirections[2] = 0;
			}
			else if(food==null && valid==FOOD){
				food = 2;
			}
			else{
				this.availableDirections[2] = 1;
			}
			/*Check if the direction 'LEFT' is available*/
			valid = validateMoviment( this.positionX-1 , this.positionY );
			if(food==null&&(valid==false || valid==WALL || valid.search(GHOST)!=-1)){
				this.availableDirections[3] = 0;
			}
			else if(food==null && valid==FOOD){
				food = 3;
			}
			else{
				this.availableDirections[3] = 1;
			}
			
			/* If any food was found on any direction the ghost will move to this direction*/
			if(food!= null){
				moveAccordingDirection(directions[food], this);
			}
			/*Using the availableDirections arry a random function will choose one of the valid directions*/
			else{
				/*Set the opposite direction, it makes the opposit direction invalid(avoid the ghost go back on his path)*/
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
						if(this.availableDirections[direction]==1){
							moveAccordingDirection(directions[direction], this);
							break;	
						}/*Else if this direction has not been called by the random funcion the position that represents that direction will recieve value 2, and the number of tryings will be decreased*/
						else{
							if(this.availableDirections[direction]!=2){
								this.availableDirections[direction]=2;
								trying--;
							}
						}	
					/*In the worst case all directions (4) will be invalid*/					
					}while(trying>0);
				}
				/*If the function numberOfValidDirections has retruned null it means that none directions is valid, so the ghost will go back on his path */
				else if(numberOfValid==null){
					//If go backwords is the only direction available do it.
					moveAccordingDirection(this.oppositeDirection, this);
				}
				/*Else there is just one possible direction and it was retruned by the function numberOfValidDirections*/
				else{
					moveAccordingDirection(directions[numberOfValid], this)
				}
				
				
			}
		}
	}
	/*Function that "kills" the ghost*/
	this.die = function(){
		/*If the ghost died because the pacman was in the ghost's next position, put an empty space on the ghost position*/
		if(MATRIX[this.positionY][this.positionX]!=PACMAN){
			document.getElementById("tableGame").rows[this.positionY].cells[this.positionX].style.backgroundImage = IMG_EMPTY;
			MATRIX[this.positionY][this.positionX] = EMPTY;
		}
		this.alive = false;
		this.savedObject = EMPTY;
		/*The ghost will appear on his initial position*/
		this.positionX = this.initialX;
		this.positionY = this.initialY;
		
	}
	
}
	
			
			
		
