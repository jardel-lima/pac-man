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
	
}
