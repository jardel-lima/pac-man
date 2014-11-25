
  function handleRankingServerResponse()  {
                        // move forward only if the transaction has completed
                        if (xmlHttp.readyState == 4)    {
                                // status of 200 indicates the transaction completed successfully
                                if (xmlHttp.status == 200)  {
                                	dataRanking= xmlHttp.responseText;
                                	updateHtml(dataRanking);
                                }
                                // a HTTP status different than 200 signals an error
                                else  {
                                        alert("There was a problem accessing the server: " + xmlHttp.statusText);
                                }
                        }
                }                
 
 function loadRanking() {
         
	if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0)   {  
 			
 			// execute the hi.php page from the server 
 	
 			xmlHttp.open("POST", "../php/ranking.php", false);   
 				
 			// define the method to handle server responses 
 			xmlHttp.onreadystatechange = handleRankingServerResponse;  
 				
 			// make the server request 
 			xmlHttp.send(null);   
 	} else {
 			// if the connection is busy, try again after one second   
 			setTimeout('loadRanking()', 1000); 
 		} 
 		//setInterval('checkData()', 1000);
                }
                
function updateHtml(data){
	//TODO check data and  print correctly
		document.getElementById("divRanking").innerHTML=data;//the div receive the table which has been resulted from the SQL query
	
	}              
