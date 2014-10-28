/* 
    Here should be our names etc...
 */

window.onload = function() { // to avoid the code running before the JS is costructed and cause errors

		document.onkeydown = checkKey;
		// Variables----------------------------------------------
		var rows = 15;
		var columns = 10;
		var walls = 50;
		var prizes = 25;
		var score = prizes*10;
		var bombs = 5;
		//var matrix = new Array();
		var obj = {matrix:""};
		//var matrix;
		var x = 0;
		var y = 0;
		var started = false;
		var time = 150;
		var saved = false;
                
                //variables which are the symbols in the console matrix
		var victim = 6; 
                var wall=0;
                var food = 1;
                var empty = 2;
                var pacman=3;
                var specialFood =5;
                var ghost = 4;
               // var laid ='L';
                // Some variables for the interface table
                var img_pacman = 'url(../imgs/p_right.png)';
                var img_empty = 'url(../imgs/empty.png)';
                var img_food = 'url(../imgs/food.png)';
                var img_wall ='url(../imgs/wall.png)';
                var img_special_food ='url(../imgs/special_food.png)'; 
                var img_ghost= 'url(../imgs/ghost.png)';
		//Print Matrix---------------------------------------------
		function printMatrix( matrix ){
			var rows = matrix.length;
			console.log("\n Matrix  \n");
			console.log("Score: "+score+" Bombs: "+bombs+" Time: "+time+"\n");
			for( var i = 0; i < rows; i++){
				console.log("Row "+i+" "+matrix[i]);                                
            
			}
                        updateTable();
		}
                //Update table in the html file to be equal the matrix
                function updateTable(){
                    for( var i = 0; i < rows; i++){
                        for( var j = 0; j < columns; j++){
                            var newImg = obj.matrix[i][j]==wall?img_wall:obj.matrix[i][j]==food?img_food:obj.matrix[i][j]==empty?img_empty:obj.matrix[i][j]==pacman?img_pacman:obj.matrix[i][j]==ghost?img_ghost:img_special_food;

                            document.getElementById("tableGame").rows[i].cells[j].style.backgroundImage = newImg; 
                        }
                    }
                    
                }
		//Create Matrix-----------------------------------------------
		function createMatrix(rows, columns, walls , prizes, obj){
			var matrix = new Array(rows);
			var table="<table id=\"tableGame\">";
                       
                        
			for(var i=0; i<rows; i++) {
				matrix[i] = new Array(columns);                                                              
			}
                                              
                        
			for(var i = 0; i < rows; i++){
                            table+="<tr>";  
				for(var j = 0; j < columns; j++){
					matrix[i][j] = empty;
                                        table+="<td></td>";        
				}
                            table+="</tr>";     
			}
                        
                        table+="</table>";
                        document.getElementById("divGame").innerHTML= table;
			
			//createVictim(victim,matrix);
			creatWalls(walls, matrix);
			createPrizes(prizes, matrix);
			
			
			//matrix[y][x] = pacman;
			matrix[0][0] = pacman;
			
			obj.matrix = matrix;
			printMatrix(obj.matrix);
		}
		
		function creatWalls(walls, matrix){
			
			var x_aux;
			var y_aux;
			
			do{
				x_aux = Math.floor(Math.random()*columns);
				y_aux = Math.floor(Math.random()*rows);
				if( matrix[y_aux][x_aux]== empty){
					matrix[y_aux][x_aux] = wall;
					walls--;
				}
				//console.log("Wall: "+walls);
			}while(walls>0);
		}
		
		function createPrizes( prizes, matrix){
			var rows = matrix.length;
			var columns =  matrix[0].length;
			var x_aux;
			var y_aux;
			
			do{
				x_aux = Math.floor(Math.random()*columns);
				y_aux = Math.floor(Math.random()*rows);
				if( matrix[y_aux][x_aux]== empty ){
					matrix[y_aux][x_aux] = food;
					prizes--;
				}
				//console.log("Prize: "+prizes);
			}while(prizes>0);
		}
		
		function createVictim( victim ,matrix ){
			
			var rows = matrix.length;
			var columns =  matrix[0].length;
			var x_aux;
			var y_aux;
			
			do{
				x_aux = Math.floor(Math.random()*columns);
				y_aux = Math.floor(Math.random()*rows);
				if( matrix[y_aux][x_aux]== empty){
					matrix[y_aux][x_aux] = specialFood;
					victim--;
				}
				//console.log("Prize: "+prizes);
			}while(victim>0);
			
		}
	//-----------------------------------------------------------------
		
		function validateXLimits(  x , matrix ){
			var xLimit = matrix[0].length;
			if( x < 0 || x >= xLimit || matrix[y][x]==wall)
				return false;
			else{
				if(matrix[y][x]==food){
					score+=10;
				}
				else if(matrix[y][x]==specialFood){
					if(time!=0){
						saved = true;
						alert("You have super powers now!!!");
					}
				}
					
				return true;	
			}	
		}
		
		function validateYLimits(  y , matrix  ){
			var yLimit = matrix.length;
			
			if( y < 0 || y >= yLimit || matrix[y][x]==wall )
				return false;
			else{
				if(matrix[y][x]==food){
					score+=10;
				}
				return true;	
			}	
		}
		
		function explode( x, y, matrix ){
			var rows = matrix.length;
			var columns =  matrix[0].length;
			var y_aux = y-1;
			if(score==0){
				window.alert("You cannot explode anymore.");
				return;
			}
			
			score-=10;
			for(var i = 0; i < 3; i++){
				if( y_aux >= 0 && y_aux < rows){
					var x_aux = x-1;
					for(var j = 0; j < 3; j++){
						if( x_aux >= 0 && x_aux < columns){
							matrix[y_aux][x_aux] = empty;
						}
						x_aux++;
					}
				}
				y_aux++;
			}
			matrix[y][x] = pacman;
		}
		
		
		//keyboard events----------------------------------------------------
		function checkKey(e) {

			e = e || window.event;

			if (e.keyCode == '38') {
				// up arrow
				console.log("Up");
				if(!started)
					started = true;
				var y_aux = y;
				y_aux--;
				var valid = validateYLimits( y_aux, obj.matrix);
				console.log("Valid Moviment: "+valid);
				valid ? y = y_aux : y = y ;
				obj.matrix[y_aux+1][x] = empty;
				obj.matrix[y][x] = pacman;
				
				printMatrix(obj.matrix);
				
			}
			else if (e.keyCode == '40') {
				// down arrow
				console.log("Down");
				if(!started)
					started = true;
				var y_aux = y;
				y_aux++;
				var valid = validateYLimits( y_aux, obj.matrix);
				console.log("Valid Moviment: "+valid);
				valid ? y = y_aux : y = y ;
				obj.matrix[y_aux-1][x] = empty;
				obj.matrix[y][x] = pacman;
				
				printMatrix(obj.matrix);
			}
			else if (e.keyCode == '39') {
				// right arrow
				console.log("Right");
				if(!started)
					started = true;
				var x_aux = x;
				x_aux++;
				var  valid = validateXLimits( x_aux, obj.matrix);
				console.log("Valid Moviment: "+valid);
				valid ? x = x_aux : x = x ;
				obj.matrix[y][x_aux-1] = empty;
				obj.matrix[y][x] = pacman;
				
				printMatrix(obj.matrix);
			}
			else if (e.keyCode == '37') {
				// left arrow
				console.log("Left");
				if(!started)
					started = true;
				var x_aux = x;
				x_aux--;
				var valid = validateXLimits( x_aux, obj.matrix);
				console.log("Valid Moviment: "+valid);
				valid ? x = x_aux : x = x ;
				obj.matrix[y][x_aux+1] = empty;
				obj.matrix[y][x] = pacman;
				
				printMatrix(obj.matrix);
			}
			else if (e.keyCode == '66') {
				// B key
				console.log("B");
				if(!started)
					started = true;
				var x_aux = x;
				var y_aux = y;
				setTimeout(explode( x_aux, y_aux, obj.matrix ), 3000);
				
				printMatrix(obj.matrix);
			}
		}
                
                createMatrix(rows, columns, walls, prizes, obj);
		setInterval(function(){
			if(started && time!=0 && !saved)
			 	time--;
			else if (started && !saved){
			 started = false;
			 alert("You failed!!!");}
			  
			printMatrix(obj.matrix) ;
		},1000);
		printMatrix(obj.matrix);
 };
