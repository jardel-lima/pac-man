function Pacman(){
			
			this.positionX = 1;
			this.positionY = 1;
			this.direction = null;//UP|DOWN|RIGHT|LEFT
			this.blocked = true;
			this.superPower = false;
			this.lives = 4;
			
			this.move = function(){
				if(this.direction != null){
					var yAux = this.positionY;
					var xAux = this.positionX;
					switch(this.direction){
					 case "UP":
					 	yAux --;
					 	break;
					 case "DOWN":
					 	yAux ++;
					 	break;
					 case "RIGHT":
					 	xAux ++;
					 	break;
					 case "LEFT":
					 	xAux --;
					 	break;			
					}
					
					var validMoviment = validateMoviment(xAux, yAux);
					if(validMoviment!=null){
						this.blocked = false;
						if(validMoviment==FOOD){
							MATRIX[this.positionY][this.positionX] = EMPTY;
							this.positionY = yAux;
							this.positionX = xAux;
							MATRIX[this.positionY][this.positionX] = PACMAN;
							//TODO
							printMatrix();
							
						}
						else if(validMoviment==SPECIAL_FOOD){
							MATRIX[this.positionY][this.positionX] = EMPTY;
							this.positionY = yAux;
							this.positionX = xAux;
							MATRIX[this.positionY][this.positionX] = PACMAN;
							//TODO
							printMatrix();
						}
						else if(validMoviment==GHOST){
							if(this.superPower){
								MATRIX[this.positionY][this.positionX] = EMPTY;
								this.positionY = yAux;
								this.positionX = xAux;
								MATRIX[this.positionY][this.positionX] = PACMAN;
								//TODO
								printMatrix();
								
							}
							else{
								//TODO
							}
						}
						else if(validMoviment==EMPTY){
							MATRIX[this.positionY][this.positionX] = EMPTY;
							this.positionY = yAux;
							this.positionX = xAux;
							MATRIX[this.positionY][this.positionX] = PACMAN;
							//TODO
							printMatrix();
						}
						else if(validMoviment==WALL){
							this.blocked = true;
						}
					}
					
				}
			}
			
		}

