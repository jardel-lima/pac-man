 var dataFile;

	function handleFileServerResponse()  {
		            // move forward only if the transaction has completed
		            if (xmlHttp.readyState == 4)    {
		                    // status of 200 indicates the transaction completed successfully
		                    if (xmlHttp.status == 200)  {
		                        
		                    	dataFile= xmlHttp.responseText; // the server response 
		                        document.getElementById("divDataMap").innerHTML=dataFile; // put the new map in a div to get it in game.js
		                    }
		                    // a HTTP status different than 200 signals an error
		                    else  {
		                            alert("There was a problem accessing the server: " + xmlHttp.statusText);
		                    }
		            }
		    }                
 
 function loadFile(file) {
         
	if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0)   {  
 			
 			// execute the hi.php page from the server 
 	
 			xmlHttp.open("GET", "../php/readFile.php?fileName=../maps/"+file, false);   
 				
 			// define the method to handle server responses 
 			xmlHttp.onreadystatechange = handleFileServerResponse;  
 				
 			// make the server request 
 			xmlHttp.send(null);   
 	} else {
 			// if the connection is busy, try again after one second   
 			setTimeout('loadFile('+file+')', 1000); 
 		} 
 		//setInterval('checkData()', 1000);

} 

function loadLocalFile(file){
	
dataFile= `00000000000000000000
0                  0
0 0000000  0000000 0
0       0        0 0
0 0000000  0000000 0
0 0        0       0
0 0000000  0000000 0
0       0        0 0
0 0000000  0000000 0
0 0        0       0
0 0000000  0000000 0
0                  0
0 0000000000000000 0
0      0eeee000000 0
0 000000GGGG0      0
0      0eeee000000 0
0 0000000000000000 0
0                  0
0 0000000  0000000 0
0       0        0 0
0 0000000  0000000 0
0 0        0       0
0 0000000  0000000 0
0       0        0 0
0 0000000  0000000 0
0 0        0       0
0 0000000  0000000 0
0 00  000    000   0
0                  0
00000000000000000000`; // the server response 
	document.getElementById("divDataMap").innerHTML=dataFile; // put the new map in a div to get it in game.js

	console.log(dataFile);
	
                } 
                         
