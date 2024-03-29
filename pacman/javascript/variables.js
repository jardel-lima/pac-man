	// Variables----------------------------------------------
	var ROWS    = 30;
	var COLUMNS = 20;
	var NUMBER_OF_MAPS = 5;
	var MATRIX = [];
	var WALL = 'W';
	var FOOD = '-';
	var SPECIAL_FOOD = 'o';
	var GHOST = 'G';
	var PACMAN = 'P';
	var EMPTY = 'e';
	var EXIT = 'E';
    var NUMBER_OF_SPECIAL_FOOD = 10;
    var PACMAN_PATH_LENGTH = 8;
	var IMG_PACMAN_RIGHT = new Image();
	IMG_PACMAN_RIGHT.src = '../imgs/p_right.png';
	var IMG_PACMAN_RIGHT_IMMUNE = new Image();
	IMG_PACMAN_RIGHT_IMMUNE.src = '../imgs/p_right_immune.png';
	var IMG_PACMAN_RIGHT2 = new Image();;
    IMG_PACMAN_RIGHT2.src = '../imgs/p_right2.png';
    var IMG_PACMAN_RIGHT2_IMMUNE = new Image();
    IMG_PACMAN_RIGHT2_IMMUNE.src = '../imgs/p_right2_immune.png';
    var IMG_PACMAN_LEFT = new Image();
	IMG_PACMAN_LEFT.src = '../imgs/p_left.png';
	var IMG_PACMAN_LEFT_IMMUNE = new Image();
	IMG_PACMAN_LEFT_IMMUNE.src = '../imgs/p_left_immune.png';
    var IMG_PACMAN_LEFT2 = new Image();
    IMG_PACMAN_LEFT2.src = '../imgs/p_left2.png';
    var IMG_PACMAN_LEFT2_IMMUNE = new Image();
    IMG_PACMAN_LEFT2_IMMUNE.src = '../imgs/p_left2_immune.png';
    var IMG_PACMAN_UP = new Image();
	IMG_PACMAN_UP.src = '../imgs/p_up.png';
	var IMG_PACMAN_UP_IMMUNE = new Image();
	IMG_PACMAN_UP_IMMUNE.src = '../imgs/p_up_immune.png';
    var IMG_PACMAN_UP2 = new Image();
    IMG_PACMAN_UP2.src = '../imgs/p_up2.png';
    var IMG_PACMAN_UP2_IMMUNE = new Image();
    IMG_PACMAN_UP2_IMMUNE.src = '../imgs/p_up2_immune.png';
    var IMG_PACMAN_DOWN = new Image();
	IMG_PACMAN_DOWN.src = '../imgs/p_down.png';
	var IMG_PACMAN_DOWN_IMMUNE = new Image();
	IMG_PACMAN_DOWN_IMMUNE.src = '../imgs/p_down_immune.png';
	var IMG_PACMAN_DOWN2 = new Image();
    IMG_PACMAN_DOWN2.src = '../imgs/p_down2.png';
    var IMG_PACMAN_DOWN2_IMMUNE = new Image();
    IMG_PACMAN_DOWN2_IMMUNE.src = '../imgs/p_down2_immune.png';
	var IMG_PACMAN = 'url('+IMG_PACMAN_RIGHT.src+')';
    var IMG_EMPTY = new Image();
    IMG_EMPTY.src = '../imgs/empty.png';
    var IMG_FOOD = new Image();
    IMG_FOOD.src = '../imgs/food.png';
    var IMG_WALL = new Image();
    IMG_WALL.src ='../imgs/wall.png';
    var IMG_SPECIAL_FOOD = new Image();
    IMG_SPECIAL_FOOD.src ='../imgs/special_food.png'; 
    var IMG_GHOST_NORMAL= new Image();
    IMG_GHOST_NORMAL.src = '../imgs/ghost.png';
    var IMG_GHOST_WEEK= new Image();
    IMG_GHOST_WEEK.src = '../imgs/ghost_2.png';
    var IMG_GHOST= 'url('+IMG_GHOST_NORMAL.src+')';
    var xmlHttp = createXmlHttpRequestObject();
    
    var pacman=null;
    var ghost1=null;
    var ghost2=null;
    var ghost3=null;
    var ghost4=null;
    var tableHeight= window.innerHeight*0.8;
    var tableWidth = tableHeight*0.8;
    var divWidth = tableWidth*3;
    //var wait =true;
    var rankingTable=null;
    var updateRankingTime=0;
