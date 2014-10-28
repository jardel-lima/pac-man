	
	function initiateMatrix() {
			var table="<table border='"+1+"' width='"+80+"%' align='center' id=\"tableGame\">";
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
		
		//Print Matrix---------------------------------------------
		function printMatrix(){
			var rows = MATRIX.length;
			console.log("\n Matrix  \n");
			for( var i = 0; i < rows; i++){
				console.log("Row "+i+" "+MATRIX[i]);
			}
			updateTable();
		}
		
		//Update table in the html file to be equal the matrix
        function updateTable(){
            for( var i = 0; i < ROWS; i++){
                for( var j = 0; j < COLUMNS; j++){
                    var newImg = MATRIX[i][j]==WALL?IMG_WALL:MATRIX[i][j]==FOOD?IMG_FOOD:MATRIX[i][j]==EMPTY?IMG_EMPTY:MATRIX[i][j]==PACMAN?IMG_PACMAN:MATRIX[i][j]==GHOST?IMG_GHOST:IMG_SPECIAL_FOOD;

                    document.getElementById("tableGame").rows[i].cells[j].style.backgroundImage = newImg; 
                }
            }
            
        }
        
        function readMap(map){
			var quantityOfFood = 0
			for(var i = 0; i <  ROWS; i++){
			    var aux = map.substr(i*(COLUMNS),COLUMNS)
			    //console.log("sub "+aux);
			    for(var j = 0; j < COLUMNS; j++){
			    	if(aux.charAt(j)=='0'){
			    		
			    		MATRIX[i][j]= WALL;
			    	}else{
			    	
			    		MATRIX[i][j]= FOOD;
			    		quantityOfFood++; // Counts the quantity of food on the map
			    	}
			    }
			}
			
			pacman = new Pacman();
			MATRIX[pacman.positionY][pacman.positionX] = PACMAN;// The pacman will start in the same possition
			quantityOfFood = quantityOfFood - 1/*pacman*/ - 4/*ghosts*/ - NUMBER_OF_SPECIAL_FOOD;
			return quantityOfFood;
		}
		
		//The Ghosts will be always in the same place
		function generateGhosts(){
			MATRIX[14][8]= GHOST;  ghost1 = new Ghost(8,14);
			MATRIX[14][9]= GHOST;  ghost2 = new Ghost(9,14);
			MATRIX[14][10]= GHOST; ghost3 = new Ghost(10,14);
			MATRIX[14][11]= GHOST; ghost4 = new Ghost(11,14);
		}
		
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
		
		function populateMATRIX(map){
			readMap(map);
			generateGhosts();
			generateSpecialFood();
			
		}
		
		function validateMoviment( x , y ){
			var xLimit = COLUMNS;
			var yLimit = ROWS;
			if( x < 0 || x >= xLimit || y < 0 || y >= yLimit )
				return false;
			else  
				return MATRIX[y][x];
				
		}
		
