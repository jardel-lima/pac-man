		// Variables----------------------------------------------
		var ROWS    = 30;
		var COLUMNS = 20;
		var MATRIX = [];
		var WALL = 'W';
		var FOOD = '-';
		var SPECIAL_FOOD = 'o';
		var GHOST = 'G';
		var PACMAN = 'P';
		var EMPTY = 'e';
		var NUMBER_OF_SPECIAL_FOOD = 5;
		var IMG_PACMAN_RIGHT = 'url(../imgs/p_right.png)';
		var IMG_PACMAN_LEFT = 'url(../imgs/p_left.png)';
		var IMG_PACMAN_UP = 'url(../imgs/p_up.png)';
		var IMG_PACMAN_DOWN = 'url(../imgs/p_down.png)';
		var IMG_PACMAN = IMG_PACMAN_RIGHT;
        var IMG_EMPTY = 'url(../imgs/empty.png)';
        var IMG_FOOD = 'url(../imgs/food.png)';
        var IMG_WALL ='url(../imgs/wall.png)';
        var IMG_SPECIAL_FOOD ='url(../imgs/special_food.png)'; 
        var IMG_GHOST= 'url(../imgs/ghost.png)';
        
        var pacman;
        var ghost1;
        var ghost2;
        var ghost3;
        var ghost4;
