
 
	function handleRegisterServerResponse(){
		// move forward only if the transaction has completed
        if (xmlHttp.readyState == 4){
        	// status of 200 indicates the transaction completed successfully
            if (xmlHttp.status == 200){
            	var response = xmlHttp.responseText; 
            	if(parseInt(response)!== NaN){
            		document.getElementById("player_name").value="user_"+(parseInt(response)+1);
            		//alert(xmlHttp.responseText);
            	}
            	else{
            		game.status = "ERROR";
            	}
             }
             // a HTTP status different than 200 signals an error
             else{
             	alert("There was a problem accessing the server: " + xmlHttp.statusText);
             }
		}
	}                
 
	function loadNumberOfPlayers() {

		if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0){  
 			// execute the hi.php page from the server 
 			xmlHttp.open("GET", "../php/register.php?func=1&t=" + Math.random(), false);   
 			// define the method to handle server responses 
 			xmlHttp.onreadystatechange = handleRegisterServerResponse;  
 			// make the server request 
 			xmlHttp.send(null);   
 		}else{
 			// if the connection is busy, try again after one second   
 			//setTimeout('loadNumberOfPlayers()', 1000); 
 		} 
	}
                
	function submitPlayer() {

		if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0){  
 			// execute the hi.php page from the server 
 			xmlHttp.open("GET", "../php/register.php?func=2&t=" + Math.random(), false);   
 			// define the method to handle server responses 
 			xmlHttp.onreadystatechange = handleRegisterServerResponse;  
 			// make the server request 
 			xmlHttp.send(null);   
 		}else{
 			// if the connection is busy, try again after one second   
 			//setTimeout('loadNumberOfPlayers()', 1000); 
 		} 
	}
