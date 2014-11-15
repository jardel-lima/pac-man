 var xmlHttp = createXmlHttpRequestObject();
 var dataFile;


 function createXmlHttpRequestObject()  {
                        // will store the reference to the XMLHttpRequest object
                       // var xmlHttp;
                        // if running Internet Explorer
                        if(window.ActiveXObject)   {
                                try {
                                        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                                } catch (e)  {
                                        xmlHttp = false;
                                }
                        } else {
                                // if running Mozilla or other browsers
                                 try  {
                                        xmlHttp = new XMLHttpRequest();
                                 } catch (e)  {
                                        xmlHttp = false;

                                 }
                    }
                    // return the created object or display an error message
                    if (!xmlHttp)
                                alert("Error creating the XMLHttpRequest object.");
                        else
                                return xmlHttp;
                }
 
       function handleServerResponse()  {
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
 	
 			xmlHttp.open("GET", "readFile.php?fileName=../maps/"+file, true);   
 				
 			// define the method to handle server responses 
 			xmlHttp.onreadystatechange = handleServerResponse;  
 				
 			// make the server request 
 			xmlHttp.send(null);   
 	} else {
 			// if the connection is busy, try again after one second   
 			setTimeout('loadFile('+file+')', 1000); 
 		} 
 		//setInterval('checkData()', 1000);
                } 
                         