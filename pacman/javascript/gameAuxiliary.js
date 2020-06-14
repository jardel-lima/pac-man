//Function that Create the matrix and the table
function initiateMatrix() {
		var table="<table border='"+1+"' width='"+tableWidth+"px'  height='"+tableHeight+"px' align='center' id=\"tableGame\">";
		for(var i = 0; i < ROWS; i++){
			var matrix = [];
			table+="<tr height='"+20+"'>"
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
	MATRIX_COPY = JSON.parse(JSON.stringify(MATRIX));
	for(i=0; i < pacman.path.length; i++){
		if(MATRIX_COPY[pacman.path[i][1]][pacman.path[i][0]]==EMPTY)
			MATRIX_COPY[pacman.path[i][1]][pacman.path[i][0]] = i
	}
	console.log("\n Matrix  \n");
	for( var i = 0; i < rows; i++){
		console.log("Row "+i+" "+MATRIX_COPY[i]);
	}
}
		
//Polulate table in the html file to be equal to the matrix
function populateTable(){
    for( var i = 0; i < ROWS; i++){
        for( var j = 0; j < COLUMNS; j++){
        	var newImg;
        	var object = (MATRIX[i][j]).toString();
        	if(object==WALL){
        		newImg = 'url('+IMG_WALL.src+')';
        	}
        	else if(object==FOOD){
        		newImg = 'url('+IMG_FOOD.src+')';
        	}
        	else if(object==PACMAN){
        		newImg = IMG_PACMAN;
        	}
        	else if(object.search(GHOST)!=-1){
        		newImg = IMG_GHOST;
        	}
        	else if(object==SPECIAL_FOOD){
        		newImg = 'url('+IMG_SPECIAL_FOOD.src+')';
        	}
        	else{
        		newImg = 'url('+IMG_EMPTY.src+')';
        	}

            document.getElementById("tableGame").rows[i].cells[j].style.backgroundImage = newImg; 
        }
    }
    
}
        
//Read a map form a string and return the quantity of food on that map
function readMap(map){
	var quantityOfFood = 0
	map = map.replace(/\n/g,"")
	for(var i = 0; i <  ROWS; i++){
	    var aux = map.substr(i*(COLUMNS),COLUMNS)
	    //aux = aux.replace("\n","");
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
    //reset pacman's properties
    	pacman.positionX = 1;
	    pacman.positionY = 1;
	    pacman.superPower = false;
	    pacman.superPowerTime = null;
	    pacman.immune = false;
    }
	MATRIX[pacman.positionY][pacman.positionX] = PACMAN;// The pacman will start in the same possition
	//quantityOfFood = quantityOfFood - NUMBER_OF_SPECIAL_FOOD;/*Just normal(yellow) food will be considered to finish the map*/
	return quantityOfFood - 1;
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

function checkRanking(score,time){
        //gets tablescore,time
    var table = document.getElementById('rankingTable');

    //gets rows of table
    var rowLength = table.rows.length;
    if(rowLength<2) // if no one has been played before the actual player is the first
        return "1st";
    else
        var position = table.rows.item(rowLength-1).cells.item(0).innerHTML; // else he or she starts in the last position
    //loops through rows    
    for (i = rowLength-1; i > 0; i--){ // starting from the last position to compare

      
       var cells = table.rows.item(i).cells; //gets cells of current
       
       if(score>cells.item(2).innerHTML || (score==cells.item(2).innerHTML && time<cells.item(3).innerHTML)) // if the player's score is bigger or the score is the same but the his time is lower then he get this position
           position=cells.item(0).innerHTML;
       else
           return position; // found his position
           
    }
    return position;
    
}

function updatePosition(score,time){
    newPosition = checkRanking(score,time);
    document.getElementById('dynamicRanking').innerHTML = newPosition;
    
}

/*Actives the alert Box*/
function alertBox(messenge){
	
	game.status = "ALERT";
	
	document.getElementById('messenge').innerHTML = messenge;
	document.getElementById('alertBox').style.display = 'block';
	document.getElementById('fade').style.display = 'block';
	
	if(game.alert=="REGISTER"){
		document.getElementById('register').style.display='none';
	}
}

/*Actions that happen after the alert Box*/
function afterAlert(){
	
	document.getElementById('alertBox').style.display = 'none';
	document.getElementById('fade').style.display = 'none';
	
	if(game.alert=="SUBMIT"){
		game.status = "OVER"
	}
	else if(game.alert=="ERROR"){
		game.status = "STOP"
		window.location="../index.html"
	}
	else if(game.alert=="REGISTER"){
		document.getElementById('register').style.display='none';
        window.location="../html/ranking.html"
	}
	
}
		
		
