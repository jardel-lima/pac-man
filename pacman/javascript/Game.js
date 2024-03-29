/*Class that represents a Game*/
function Game(){
	
	this.score = 0;//The current score of the current player of the game
	this.quantityOfFood = 0;//Total amount of food present on the current map
	this.time = 0;//Time of the game
	this.phase = 0;//Represent tha phase/map of the game
	this.status = "STOP";//It represents the status of the game. That can be 'PLAY'(When the user is playing)|'PAUSE'(When a new map is gonna start)|'STOP'(When the game has not started)|'OVER'(When the game is over)
	this.prisonTime = 0;//It Will control the time that the ghost will be released from the prison
	this.alert = "SUBMIT";/*SUBMIT|REGISTER|ERROR*/
	
	//Function that initiate a game, creating the matrix, table, read the map and populate the matrix and table
	this.initiate = function(map){
			if(this.status == "STOP"){
				initiateMatrix();
				this.loadMap(map, this);                      
			}
			
				
		}

	this.loadMap = function(map, game_instance){
		game_instance.quantityOfFood= readMap(map); 
        populateMATRIX(map);
		document.getElementById('map').innerHTML=this.phase+"/"+NUMBER_OF_MAPS;
	}

	/*Function that changes the game's map*/		
	this.changePhase = function(){
                this.phase++; 
                this.prisonTime = 0;
                this.status = "STOP";
                var mapFile = "map"+this.phase+".txt";
                /*Function that cleans the MATRIX*/
                cleanMATRIX();                 
                /*Function that load the mapFile from the server*/
                loadFile(mapFile, this.loadMap, this);
                /*The read map from the server will be saved in a div called "divDataMap"*/
               // var map = document.getElementById("divDataMap").innerHTML; // get new map
               
                /*If the messenge "File not found" was returned from the server the sought file was not found*/
                /*
				if(map.search("File not found")!=-1){
                    
                    this.alert="ERROR";
                    alertBox("Server Error!");
                    
                }*/

				//loadMap(map);
               
                IMG_PACMAN = 'url('+IMG_PACMAN_RIGHT.src+')'; // update pacman's image to initial direction
               
        		//update phase html element            
                document.getElementById('fade').style.display='none';      
                        
			}
	
	/*Function that restarts the game*/
	this.restart = function(){
			location.reload();
			}
			
	this.gameOver = function(){
		document.getElementById('endPhase').style.display='none'; // hide the div endPhase
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
			/*If the game time is equal 2 empty spaces will be created in the prison, allowing the ghost to go out*/
			if(this.prisonTime==2){
			 	MATRIX[16][8]= EMPTY;
				MATRIX[12][11]= EMPTY;
				document.getElementById("tableGame").rows[16].cells[8].style.backgroundImage = 'url('+IMG_EMPTY.src+')';
				document.getElementById("tableGame").rows[12].cells[11].style.backgroundImage = 'url('+IMG_EMPTY.src+')';
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
				if((this.time - pacman.deathTime)>3){
					pacman.immune = false;
					pacman.deathTime = null;
					switch(pacman.direction){
			 			case "UP":
			 				IMG_PACMAN = 'url('+IMG_PACMAN_UP2.src+')';
			 			break;
			 			case "DOWN":
			 				IMG_PACMAN = 'url('+IMG_PACMAN_DOWN2.src+')';
			 			break;
			 			case "RIGHT":
			 				IMG_PACMAN = 'url('+IMG_PACMAN_RIGHT2.src+')';
			 			break;
			 			case "LEFT":
			 				IMG_PACMAN = 'url('+IMG_PACMAN_LEFT2.src+')';
			 			break;
			 		}
			 
					document.getElementById("tableGame").rows[pacman.positionY].cells[pacman.positionX].style.backgroundImage = IMG_PACMAN;
				}
    	 	}
	}
	
	/*Function that controls the game's actions based on the game's status*/
	this.gameController = function(pacman, ghost1, ghost2, ghost3, ghost4){
		
		/*If the game's status is "PLAY" */
		if(this.status=="PLAY"){
				
				/*Checks the quantity of remaing food, it it is equla to 0 the game will be paused*/
				if(this.quantityOfFood<=0){
				 	this.status="PAUSE";
                                       
				 }
				 
				 /*If pacman has no more lives the game is over*/
				 if(pacman.lives<=0){
				 	
                    //alert("You do not have any live left!!");
                    this.alert = "SUBMIT"
                    alertBox("You do not have any live left!!");
                    //this.status="OVER";
				 	
				 }
				 
				 /*Call pacman's controller*/
				 this.pacmanController(pacman);
				 /*If pacman has his super power activated and it has beem activated for 5 seconds his super power will be disabled and the ghosts will be not weak anymore*/
				 if(pacman.superPower){
				 	
				 	if((this.time-pacman.superPowerTime)>5){
				 		pacman.superPower = false;
			 			ghost1.weak = false;
						ghost2.weak = false;
						ghost3.weak = false;
						ghost4.weak = false;
				 	}
				 }
				 /*If pacman' super power is over and any ghost is not alive it will survive again*/
				 else{
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
				
		         /*If during the time that pacman has his super power he killed any ghost the ghost will die and will appear again when pacman's super power is over*/
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
				 
    	 }/*If the game status is equal to STOP just the ghosts will move*/
    	 else if(this.status=="STOP"){
            document.getElementById("endPhase").setAttribute("style","Display:none");
    	 	/*call ghost's controller'*/
			this.ghostController(ghost1, ghost2, ghost3, ghost4);
    	 }
    	 /*When the game is over ask the plyer to enter a user name and save his score and time on the DB*/
    	 else if(this.status=="OVER"){
    	 	/*Load the number of Players that have been registered*/
    	 	loadNumberOfPlayers();
    	 	/*Update the player score and time on the register div*/
    	 	document.getElementById("player_score").innerHTML=this.score;
    	 	document.getElementById("player_time").innerHTML=this.time;
    	 	/*The register form will be displayed*/
    	 	//document.getElementById('register').style.display='block';
    	 	//document.getElementById('fade').style.display='block';
			this.status="STOP";
			window.location.href='../index.html'
    	 /*When a map is completed it will ask he user if he wants to play another map*/	
    	 }else if(this.status=="PAUSE"){
		     if(this.phase<NUMBER_OF_MAPS){
	 			// Show div endPhase with the options to end the game or to go to next phase        
		     	document.getElementById('fade').style.display='block';
			 	document.getElementById("endPhase").setAttribute("style","Display:block");
		    }
		    /*If the player has played all available maps the game will be over*/
		    else{
		    	this.alert = "SUBMIT";
		    	alertBox("Congratulations! You completed all available maps.")
		   }	
       }
       else if(this.status = "ALERT"){
       	/*In this case nothing will happen, just the alert messenge will be displayed*/
       }
	}
	
}


