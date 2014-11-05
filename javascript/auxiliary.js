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
            
			
		}
		
		//Print Matrix on browser's console---------------------------------------------
		function printMatrix(){
			var rows = MATRIX.length;
			console.log("\n Matrix  \n");
			for( var i = 0; i < rows; i++){
				console.log("Row "+i+" "+MATRIX[i]);
			}
			//updateTable();
		}
		
		//Polulate table in the html file to be equal the matrix
        function populateTable(){
            for( var i = 0; i < ROWS; i++){
                for( var j = 0; j < COLUMNS; j++){
                	var newImg;
                	if(MATRIX[i][j]==WALL){
                		newImg = IMG_WALL;
                	}
                	else if(MATRIX[i][j]==FOOD){
                		newImg = IMG_FOOD;
                	}
                	else if(MATRIX[i][j]==PACMAN){
                		newImg = IMG_PACMAN;
                	}
                	else if(MATRIX[i][j]==GHOST){
                		newImg = IMG_GHOST;
                	}
                	else if(MATRIX[i][j]==SPECIAL_FOOD){
                		newImg = IMG_SPECIAL_FOOD;
                	}
                	else{
                		newImg = IMG_EMPTY;
                	}
                    /*var newImg = MATRIX[i][j]==WALL?IMG_WALL:MATRIX[i][j]==FOOD?IMG_FOOD:MATRIX[i][j]==EMPTY?IMG_EMPTY:MATRIX[i][j]==PACMAN?IMG_PACMAN:MATRIX[i][j]==GHOST?IMG_GHOST:IMG_SPECIAL_FOOD;*/

                    document.getElementById("tableGame").rows[i].cells[j].style.backgroundImage = newImg; 
                }
            }
            
        }
        
        //Read a map form a string and return the quantity of food on that map
        function readMap(map){
			var quantityOfFood = 0
			for(var i = 0; i <  ROWS; i++){
			    var aux = map.substr(i*(COLUMNS),COLUMNS)
			    //console.log("sub "+aux);
			    for(var j = 0; j < COLUMNS; j++){
			    	if(aux.charAt(j)=='0'){
			    		
			    		MATRIX[i][j]= WALL;
			    	}else if(aux.charAt(j)==' '){
			    		MATRIX[i][j]= FOOD;
			    		quantityOfFood++; // Counts the quantity of food on the map
			    	}
			    }
			}
			
			pacman = new Pacman();//create a pacman
			MATRIX[pacman.positionY][pacman.positionX] = PACMAN;// The pacman will start in the same possition
			quantityOfFood = quantityOfFood - 1;/*pacman*/
			return quantityOfFood;
		}
		
		//Create 4 ghosts that will start always in the same position
		function generateGhosts(){
			MATRIX[14][8]= GHOST;  ghost1 = new Ghost(8,14);
			MATRIX[14][9]= GHOST;  ghost2 = new Ghost(9,14);
			MATRIX[14][10]= GHOST; ghost3 = new Ghost(10,14);
			MATRIX[14][11]= GHOST; ghost4 = new Ghost(11,14);
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
			readMap(map);
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
		
		
		
