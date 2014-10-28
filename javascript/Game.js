function Game(){
	
	this.score = 0;
	this.quantityOfFood = 0;
	this.time = 0;
	this.phase = 1;
	this.status = "STOP";//START|PAUSE|STOP|OVER
	
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
