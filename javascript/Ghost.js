function Ghost( initialX, initialY ){
			
			this.initialX = initialX;
			this.initialY = initialY;
			this.positionX = initialX;
			this.positionY = initialY;
			this.lastPositionX = initialX;
			this.lastPositionY = initialY;
			this.saveObject = EMPTY;
			this.weak = false;
			this.inPrison = true;
			this.direction = "UP";//UP|DOWN|LEFT|RIGHT
			
			this.move = function(){
			
				if(this.inPrison==true){
					
					if(this.direction=="UP"){
						var valid = validateMoviment( this.positionX , this.positionY-1 );
						if(valid==WALL){
							this.direction = "DOWN";
							//this.move();
						}
						else{
						
							MATRIX[this.positionY][this.positionX] = this.saveObject;
							document.getElementById("tableGame").rows[this.positionY].cells[this.positionX].style.backgroundImage = IMG_EMPTY;
							this.saveObject = MATRIX[this.positionY-1][this.positionX];
							this.lastPositionX = this.positionX;
							this.lastPositionY = this.positionY;
							this.positionY--;
							MATRIX[this.positionY][this.positionX]=GHOST;
							document.getElementById("tableGame").rows[this.positionY].cells[this.positionX].style.backgroundImage = IMG_GHOST;
							printMatrix();
							
						}
					}
					else if(this.direction=="DOWN"){
						var valid = validateMoviment( this.positionX , this.positionY+1 );
						if(valid==WALL){
							this.direction = "UP";
							//this.move();
						}
						else{
						
							MATRIX[this.positionY][this.positionX] = this.saveObject;
							document.getElementById("tableGame").rows[this.positionY].cells[this.positionX].style.backgroundImage = IMG_EMPTY;
							this.saveObject = MATRIX[this.positionY+1][this.positionX];
							this.lastPositionX = this.positionX;
							this.lastPositionY = this.positionY;
							this.positionY++;
							MATRIX[this.positionY][this.positionX]=GHOST;
							document.getElementById("tableGame").rows[this.positionY].cells[this.positionX].style.backgroundImage = IMG_GHOST;
							printMatrix();
							
						}
					}
				
				}
			
			}
			
		}
