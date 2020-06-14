/*Function that create a xmlHttp request object*/
function createXmlHttpRequestObject(){

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
	if (!xmlHttp){
		alert("Error creating the XMLHttpRequest object.");
 	}else{
		return xmlHttp;
	}
}
