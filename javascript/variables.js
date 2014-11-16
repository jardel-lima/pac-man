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
		var EXIT = 'E';
		var NUMBER_OF_SPECIAL_FOOD = 5;
		var IMG_PACMAN_RIGHT = 'url(../imgs/p_right.png)';
        var IMG_PACMAN_RIGHT2 = 'url(../imgs/p_right2.png)';
        var IMG_PACMAN_RIGHT2_IMMUNE = 'url(../imgs/p_right2_immune.png)';
		var IMG_PACMAN_LEFT = 'url(../imgs/p_left.png)';
        var IMG_PACMAN_LEFT2 = 'url(../imgs/p_left2.png)';
        var IMG_PACMAN_LEFT2_IMMUNE = 'url(../imgs/p_left2_immune.png)';
		var IMG_PACMAN_UP = 'url(../imgs/p_up.png)';
        var IMG_PACMAN_UP2 = 'url(../imgs/p_up2.png)';
        var IMG_PACMAN_UP2_IMMUNE = 'url(../imgs/p_up2_immune.png)';
		var IMG_PACMAN_DOWN = 'url(../imgs/p_down.png)';
        var IMG_PACMAN_DOWN2 = 'url(../imgs/p_down2.png)';
        var IMG_PACMAN_DOWN2_IMMUNE = 'url(../imgs/p_down2_immune.png)';
		var IMG_PACMAN = IMG_PACMAN_RIGHT;
        var IMG_EMPTY = 'url(../imgs/empty.png)';
        var IMG_FOOD = 'url(../imgs/food.png)';
        var IMG_WALL ='url(../imgs/wall.png)';
        var IMG_SPECIAL_FOOD ='url(../imgs/special_food.png)'; 
        var IMG_GHOST_NORMAL= 'url(../imgs/ghost.png)';
        var IMG_GHOST_WEEK= 'url(../imgs/ghost_2.png)';
        var IMG_GHOST= IMG_GHOST_NORMAL;
        
        var pacman;
        var ghost1;
        var ghost2;
        var ghost3;
        var ghost4;
        var tableHeight= window.innerHeight*0.8;
        var tableWidth = tableHeight*0.625;
        var divWidth = tableWidth*1.3;
        var wait =true;
