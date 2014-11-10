/*Class that represents a Game*/
function Game(){
	
	this.score = 0;//The current score of the current player of the game
	this.quantityOfFood = 0;//Total amount of food present oon the current map
	this.time = 0;//Time of the game
	this.phase = 1;//Represent tha phase/map of the game
	this.status = "STOP";//It represents the status of the game. That can be 'PLAY'(When the user is playing)|'PAUSE'(When a new map is gonna start)|'STOP'(When the game has not started)|'OVER'(When the game is over)
	
	//Function that initiate a game, creating the matrix, table, read the map and populate the matrix and table
	this.initiate = function(map){
			if(this.status == "STOP"){
				initiateMatrix();
				this.quantityOfFood = readMap(map);
				populateMATRIX(map)
			}
			
				
		}	
			
	this.changePhase = function(phaseNumber){
			
			}
	
	this.resart = function(){
			
			}
			
	this.gameOver = function(){
			
			}
			
	this.ghostController = function(ghost1, ghost2, ghost3, ghost4 ){
		if(this.status!="PAUSE"){
			if(pacman.superPower && !ghost1.weak){
				ghost1.weak = true;
				ghost2.weak = true;
				ghost3.weak = true;
				ghost4.weak = true;
			}
			
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
			
			if(this.time==2){
			 	MATRIX[16][8]= EXIT;
				MATRIX[12][9]= EXIT;
				MATRIX[16][10]= EXIT;
				MATRIX[12][11]= EXIT;
			}
		}
	}
	
	this.pacmanController = function(pacman){
			if(pacman.blocked==false){
				pacman.move();
			}	
			
			if(pacman.immune){
				if(pacman.deathTime!=null){
					if((this.time - pacman.deathTime)>3){
						pacman.immune = false;
						pacman.deathTime = null;
					}
				}
    	 	}
	}
	
	this.gameController = function(pacman, ghost1, ghost2, ghost3, ghost4){
		this.ghostController(ghost1, ghost2, ghost3, ghost4);
		if(this.status=="PLAY"){
				this.pacmanController(pacman);
				
				if(this.quantityOfFood<=0){
				 	game.status="PAUSE";
				 	alert("The game is over");
				 }
				 
				 if(pacman.lives<=0){
				 	game.status="PAUSE";
				 	alert("You do not have any live!!");
				 }
				 
				 if(pacman.superPower){
				 	
				 	if((this.time-pacman.superPowerTime)>5){
				 		pacman.superPower = false;
			 			ghost1.weak = false;
						ghost2.weak = false;
						ghost3.weak = false;
						ghost4.weak = false;
				 	}
				 }
				 
				
				
    	 }
	}
	
}
