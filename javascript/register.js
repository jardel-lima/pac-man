
 	/*function that handles the server's response*/
	function handleRegisterServerResponse(){
		// move forward only if the transaction has completed
        if (xmlHttp.readyState == 4){
        	// status of 200 indicates the transaction completed successfully
            if (xmlHttp.status == 200){
            	var response = xmlHttp.responseText;
            	if(parseInt(response)!== NaN){
            		 var playerName = "player_"+(parseInt(response)+1);
            		document.getElementById("player_name").value = playerName;
            	}
            	
             }
             // a HTTP status different than 200 signals an error
             else{
             	game.alert = "ERROR";
             	alertBox("There was a problem accessing the server: " + xmlHttp.statusText);
             }
		}
	}   
	/*function that handles the server's response*/
	function handleSubmitServerResponse(){
		// move forward only if the transaction has completed
        if (xmlHttp.readyState == 4){
        	// status of 200 indicates the transaction completed successfully
            if (xmlHttp.status == 200){
            	var response = xmlHttp.responseText; 
            	game.alert = "REGISTER";
            	alertBox(response);
            	
             }
             // a HTTP status different than 200 signals an error
             else{
             	game.alert = "ERROR";
             	alertBox("There was a problem accessing the server: " + xmlHttp.statusText);
             }
		}
	}                             
 	
 	/*Function that asks the number of players that have beem registered, it will set a sugestion to the player name */
	function loadNumberOfPlayers() {

		if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0){  
 			// execute the hi.php page from the server 
 			xmlHttp.open("GET", "../php/register.php?func=1&t=" + Math.random(), true);   
 			// define the method to handle server responses 
 			xmlHttp.onreadystatechange = handleRegisterServerResponse;  
 			// make the server request 
 			xmlHttp.send(null);   
 		}
	}
     
    /*Function that sends the needed data to the player registration*/            
	function submitPlayer() {
		var playerName = document.getElementById("player_name").value;
		
		playerName = playerName.trim();
		
		if(playerName.length==0){
			game.alert = "SUBMIT";
			alertBox("Please informe your name.");
			return;
		}

		if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0){  
 			// execute the hi.php page from the server 
 			xmlHttp.open("GET", "../php/register.php?func=2&name="+playerName+"&score="+game.score+"&time="+game.time+"&t=" + Math.random(), true);   
 			// define the method to handle server responses 
 			xmlHttp.onreadystatechange = handleSubmitServerResponse;  
 			// make the server request 
 			xmlHttp.send(null);   
 		}else{
 			// if the connection is busy, try again after one second   
 			setTimeout('submitPlayer()', 1000); 
 		} 
	}
