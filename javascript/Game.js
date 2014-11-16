/*Class that represents a Game*/
function Game(){
	
	this.score = 0;//The current score of the current player of the game
	this.quantityOfFood = 0;//Total amount of food present oon the current map
	this.time = 0;//Time of the game
	this.phase = 1;//Represent tha phase/map of the game
	this.status = "STOP";//It represents the status of the game. That can be 'PLAY'(When the user is playing)|'PAUSE'(When a new map is gonna start)|'STOP'(When the game has not started)|'OVER'(When the game is over)
	this.prisonTime = 0;
	//Function that initiate a game, creating the matrix, table, read the map and populate the matrix and table
	this.initiate = function(map){
			if(this.status == "STOP"){
				initiateMatrix();
				this.quantityOfFood = readMap(map);
				populateMATRIX(map);
                                document.getElementById('map').innerHTML=game.phase; 
                                
			}
			
				
		}	
			
	this.changePhase = function(){
                this.status = "STOP"; // stop game to load new map
                map = document.getElementById("divDataMap").innerHTML; // get new map
                IMG_PACMAN = IMG_PACMAN_RIGHT; // update pacman's image to initial position's image
                this.quantityOfFood= readMap(map); 
                populateMATRIX(map);
                document.getElementById('map').innerHTML=this.phase-1;    //update phase html element            
                printMatrix();
                this.prisonTime = 0;
                        
                        
			}
	
	this.restart = function(){
			location.reload();
			}
			
	this.gameOver = function(){
			
			}
	/*Function that controls ghost's actions*/		
	this.ghostController = function(ghost1, ghost2, ghost3, ghost4 ){
		if(this.status!="PAUSE"){
			/*If the pacman has his super power activated and the ghosts are not weak already all ghosts will be weak*/
			if(pacman.superPower && !ghost1.weak){
				ghost1.weak = true;
				ghost2.weak = true;
				ghost3.weak = true;
				ghost4.weak = true;
			}
			
			/*If the ghosts are alive move them*/
			if(ghost1.alive==true){
			 	ghost1.move();
			}
			if(ghost2.alive==true){
			 	ghost2.move();
			}
			if(ghost3.alive==true){
			 	ghost3.move();
			}
			if(ghost4.alive==true){
			 	ghost4.move();
			}
			/*If the game time is equal 2 exits will be created in the prison, allowing the ghost to go out*/
			if(this.time==2){
			 	MATRIX[16][8]= EMPTY;
				//MATRIX[12][9]= EXIT;
				//MATRIX[16][10]= EXIT;
				MATRIX[12][11]= EMPTY;
				document.getElementById("tableGame").rows[16].cells[8].style.backgroundImage = IMG_EMPTY;
				document.getElementById("tableGame").rows[12].cells[11].style.backgroundImage = IMG_EMPTY;
				ghost1.inPrison = false;
				ghost2.inPrison = false;
				ghost3.inPrison = false;
				ghost4.inPrison = false;
			}
		}
	}
	
	/*Functions that controls pacman' actions*/
	this.pacmanController = function(pacman){
			/*If pacman is not blocked move it*/
			if(pacman.blocked==false){
				pacman.move();
			}	
			
			/*If pacman is immune it will be no immune after 3 seconds*/
			if(pacman.immune){
				if(pacman.deathTime!=null){
					if((this.time - pacman.deathTime)>3){
						pacman.immune = false;
						pacman.deathTime = null;
					}
				}
    	 	}
	}
	
	/*Function that controls the game's actions*/
	this.gameController = function(pacman, ghost1, ghost2, ghost3, ghost4){
		
		/*If the game's status is "PLAY" */
		if(this.status=="PLAY"){
				
				/*Checks the quantity of remaing food, it it is equla to 0 the game is over*/
				if(this.quantityOfFood<=0){
				 	game.status="PAUSE";
				 	alert("The game is over");
                                        document.getElementById("nextPhase").setAttribute("style","Display:inline");
				 }
				 
				 /*If pacman has no more lives the game is over*/
				 if(pacman.lives<=0){
				 	game.status="PAUSE";
				 	alert("You do not have any live left!!");
				 }
				 
				 /*Call pacman's controller*/
				 this.pacmanController(pacman);
				 /*If pacman has his super power activated and it has beem activated for 5 seconds his super power will be disabled and the ghosts will be not weak anymore*/
				 if(pacman.superPower){
				 	
				 	if((this.time-pacman.superPowerTime)>10){
				 		pacman.superPower = false;
			 			ghost1.weak = false;
						ghost2.weak = false;
						ghost3.weak = false;
						ghost4.weak = false;
				 	}
				 }else{
				 	if(!ghost1.alive){
				 		ghost1.alive = true;
				 	}
				 	if(!ghost2.alive){
				 		ghost2.alive = true;
				 	}
				 	if(!ghost3.alive){
				 		ghost3.alive = true;
				 	}
				 	if(!ghost4.alive){
				 		ghost4.alive = true;
				 	}
				 }
				
		
				 if(pacman.ghostKilled!=null){
				 	switch(pacman.ghostKilled){
				 		case GHOST+1:
				 			ghost1.die();
				 			pacman.ghostKilled = null;
				 		break;
				 		case GHOST+2:
				 			ghost2.die();
				 			pacman.ghostKilled = null;
				 		break;
				 		case GHOST+3:
				 			ghost3.die();
				 			pacman.ghostKilled = null;
				 		break;
				 		case GHOST+4:
				 			ghost4.die();
				 			pacman.ghostKilled = null;
				 		break;
				 	}
		
				 }
				 
				  /*call ghost's controller'*/
				this.ghostController(ghost1, ghost2, ghost3, ghost4);
				 
    	 }
    	 else if(this.status=="STOP"){
    	 	/*call ghost's controller'*/
			this.ghostController(ghost1, ghost2, ghost3, ghost4);
    	 }
	}
	
}


