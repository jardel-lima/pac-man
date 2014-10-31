function Pacman(){
			
			this.positionX = 1;
			this.positionY = 1;
			this.direction = null;//UP|DOWN|RIGHT|LEFT
			this.blocked = true;
			this.superPower = false;
			this.lives = 4;
                        this.openMouth = true;
			
			//Function that based on the pacman direction validate and change the possition of the pacman
			this.move = function(){
				if(this.direction != null){
					var yAux = this.positionY;
					var xAux = this.positionX;
					switch(this.direction){
					 case "UP":
					 	yAux --;/*Changin pacman possition and image*/
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
					
					var validMoviment = validateMoviment(xAux, yAux);//Validate the moviment
					if(validMoviment!=null){
						this.blocked = false;
						
						if(validMoviment==FOOD){
							//TODO
							applyPacmanMoviment(pacman.positionX, pacman.positionY, xAux, yAux);
						}
						else if(validMoviment==SPECIAL_FOOD){
							//TODO
							applyPacmanMoviment(pacman.positionX, pacman.positionY, xAux, yAux);
						}
						else if(validMoviment==GHOST){
							if(this.superPower){
								applyPacmanMoviment(pacman.positionX, pacman.positionY, xAux, yAux);
							}
							else{
								//TODO
							}
						}
						else if(validMoviment==EMPTY){
							applyPacmanMoviment(pacman.positionX, pacman.positionY, xAux, yAux);
						}
						else if(validMoviment==WALL){
							this.blocked = true;
						}
					}
					
				}
			}
			
			
		}
		
		

