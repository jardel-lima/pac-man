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
