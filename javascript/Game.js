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
	
}
