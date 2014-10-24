/* 
    Here should be our names etc...
 */

		document.onkeydown = checkKey;
		// Variables----------------------------------------------
		var rows = 10;
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
		var victim = 5;
		
		//Print Matrix---------------------------------------------
		function printMatrix( matrix ){
			var rows = matrix.length;
			console.log("\n Matrix  \n");
			console.log("Score: "+score+" Bombs: "+bombs+" Time: "+time+"\n");
			for( var i = 0; i < rows; i++){
				console.log("Row "+i+" "+matrix[i]);
			}
		}
		//Create Matrix-----------------------------------------------
		function createMatrix(rows, columns, walls , prizes, obj){
			var matrix = new Array(rows);
			
			for(var i=0; i<rows; i++) {
				matrix[i] = new Array(columns);
			}
			
			for(var i = 0; i < rows; i++){
				for(var j = 0; j < columns; j++){
					matrix[i][j] = "-";
				}
			}
			
			createVictim(victim,matrix);
			creatWalls(walls, matrix);
			createPrizes(prizes, matrix);
			
			
			//matrix[y][x] = "P";
			matrix[0][0] = "P";
			
			obj.matrix = matrix;
			printMatrix(obj.matrix);
		}
		
		function creatWalls(walls, matrix){
			
			var x_aux;
			var y_aux;
			
			do{
				x_aux = Math.floor(Math.random()*columns);
				y_aux = Math.floor(Math.random()*rows);
				if( matrix[y_aux][x_aux]== "-"){
					matrix[y_aux][x_aux] = "W";
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
				if( matrix[y_aux][x_aux]== "-" ){
					matrix[y_aux][x_aux] = "O";
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
				if( matrix[y_aux][x_aux]== "-"){
					matrix[y_aux][x_aux] = "L";
					victim--;
				}
				//console.log("Prize: "+prizes);
			}while(victim>0);
			
		}
	//-----------------------------------------------------------------
		
		function validateXLimits(  x , matrix ){
			var xLimit = matrix[0].length;
			if( x < 0 || x >= xLimit || matrix[y][x]=="W")
				return false;
			else{
				if(matrix[y][x]=="O"){
					score+=10;
				}
				else if(matrix[y][x]=="L"){
					if(time!=0){
						saved = true;
						alert("You save the laid!!!");
					}
				}
					
				return true;	
			}	
		}
		
		function validateYLimits(  y , matrix  ){
			var yLimit = matrix.length;
			
			if( y < 0 || y >= yLimit || matrix[y][x]=="W" )
				return false;
			else{
				if(matrix[y][x]=="O"){
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
							matrix[y_aux][x_aux] = "-";
						}
						x_aux++;
					}
				}
				y_aux++;
			}
			matrix[y][x] = "P";
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
				obj.matrix[y_aux+1][x] = "-";
				obj.matrix[y][x] = "P";
				
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
				obj.matrix[y_aux-1][x] = "-";
				obj.matrix[y][x] = "P";
				
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
				obj.matrix[y][x_aux-1] = "-";
				obj.matrix[y][x] = "P";
				
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
				obj.matrix[y][x_aux+1] = "-";
				obj.matrix[y][x] = "P";
				
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
