//Function that Create the matrix and the table
function initiateMatrix() {
		var table="<table border='"+1+"' width='"+tableWidth+"px'  height='"+tableHeight+"px' align='center' id=\"tableGame\">";
		for(var i = 0; i < ROWS; i++){
			var matrix = [];
			table+="<tr height='"+5+"'>"
			for(var j = 0; j < COLUMNS; j++){
				matrix.push(0);
				table+="<td></td>"; 
			}
			MATRIX.push(matrix);
			table+="</tr>"; 
		}
		
		 table+="</table>";
         document.getElementById("divGame").innerHTML= table;
         document.getElementById("divInfo").setAttribute("style","width:"+divWidth+"px");
		
	}
		
//Print Matrix on browser's console
function printMatrix(){
	var rows = MATRIX.length;
	console.log("\n Matrix  \n");
	for( var i = 0; i < rows; i++){
		console.log("Row "+i+" "+MATRIX[i]);
	}
}
		
//Polulate table in the html file to be equal to the matrix
function populateTable(){
    for( var i = 0; i < ROWS; i++){
        for( var j = 0; j < COLUMNS; j++){
        	var newImg;
        	var object = (MATRIX[i][j]).toString();
        	if(object==WALL){
        		newImg = IMG_WALL;
        	}
        	else if(object==FOOD){
        		newImg = IMG_FOOD;
        	}
        	else if(object==PACMAN){
        		newImg = IMG_PACMAN;
        	}
        	else if(object.search(GHOST)!=-1){
        		newImg = IMG_GHOST;
        	}
        	else if(object==SPECIAL_FOOD){
        		newImg = IMG_SPECIAL_FOOD;
        	}
        	else{
        		newImg = IMG_EMPTY;
        	}

            document.getElementById("tableGame").rows[i].cells[j].style.backgroundImage = newImg; 
        }
    }
    
}
        
//Read a map form a string and return the quantity of food on that map
function readMap(map){
	var quantityOfFood = 0
	for(var i = 0; i <  ROWS; i++){
	    var aux = map.substr(i*(COLUMNS),COLUMNS)
	    aux = aux.replace("\n","");
	    console.log("sub "+aux);
	    for(var j = 0; j < COLUMNS; j++){
	    	if(aux.charAt(j)=='0'){
	    		MATRIX[i][j]= WALL;
	    	}else if(aux.charAt(j)==' '){
	    		MATRIX[i][j]= FOOD;
	    		quantityOfFood++; // Counts the quantity of food on the map
	    	}
	    }
	}
	/*If the pacman has not been created it will create him*/
	if(pacman==null)
                pacman = new Pacman();
    /*If the pacman has been created just change his positions*/
    else{
    	pacman.positionX = 1;
	    pacman.positionY = 1;
    }
    
	MATRIX[pacman.positionY][pacman.positionX] = PACMAN;// The pacman will start in the same possition
	quantityOfFood = quantityOfFood - 1/*pacman*/- NUMBER_OF_SPECIAL_FOOD;/*Just normal(yellow) food will be considered to finish the map*/
	return quantityOfFood;
}
		
//Create 4 ghosts that will start always in the same position
function generateGhosts(){
	MATRIX[14][8]= GHOST+1;  ghost1 = new Ghost(8,14,1);
	MATRIX[14][9]= GHOST+2;  ghost2 = new Ghost(9,14,2);
	MATRIX[14][10]= GHOST+3; ghost3 = new Ghost(10,14,3);
	MATRIX[14][11]= GHOST+4; ghost4 = new Ghost(11,14,4);
	ghost2.direction="DOWN";
	ghost4.direction="DOWN";
	
}
		
//Generate special food in random positions
function generateSpecialFood(){
	var x_aux;
	var y_aux;
	var specialFood = NUMBER_OF_SPECIAL_FOOD;
	do{
		x_aux = Math.floor(Math.random()*COLUMNS);
		y_aux = Math.floor(Math.random()*ROWS);
		if( MATRIX[y_aux][x_aux] == FOOD ){
			MATRIX[y_aux][x_aux] = SPECIAL_FOOD;
			specialFood--;
		}
		
	}while(specialFood>0);
}
		
//Populate the matrix
function populateMATRIX(map){
	generateGhosts();
	generateSpecialFood();
	populateTable();
	
}
	
//Validade moviment, check if the x and y values are valids. It returns tha element in that position
function validateMoviment( x , y ){
	var xLimit = COLUMNS;
	var yLimit = ROWS;
	if( x < 0 || x >= xLimit || y < 0 || y >= yLimit )
		return false;
	else  
		return MATRIX[y][x];
		
}
	
/*Function that cleans MATRIX*/
function cleanMATRIX(){
	for(var i = 0; i < ROWS; i++){
		for(var j = 0; j < COLUMNS; j++){
			MATRIX[i][j] = 0;
		}
	}

}

function alertMessenge(messenge){
	game.status = "ALERT";
	document.getElementById("alert").innerHTML =  messenge;
	document.getElementById("alertBox").style.display = 'block';
	document.getElementById('fade').style.display='block';

}

function afterAlert(){
	if(game.registering==true){
		document.getElementById('alertBox').style.display = 'none';
		document.getElementById('fade').style.display='none';
		document.getElementById('register').style.display='none';
		document.getElementById('fade').style.display='none';   
		window.location="../html/ranking.html"
	}
	else{
		document.getElementById('alertBox').style.display = 'none';
		document.getElementById('fade').style.display='none';
		game.status = "OVER";  
	}

}
		
		
		
