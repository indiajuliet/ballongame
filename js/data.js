
var ctx = null;		// Spiel Canvas
var sctx = null;	// Statusbar Canvas

// width of the canvas
var width = 480;  

// height of the canvas  
var height = 700; 

// verschiedene Konstanten 
var STD_SKY_COLOR = '#6495ED';
var SKY_COLOR = STD_SKY_COLOR;
var SUN_START_POSITION = -120;

// Character Codes
var LEFT_ARROW = 37;
var RIGHT_ARROW = 39;
var UP_ARROW = 38;
var DOWN_ARROW = 40;
var SPACE_BAR = 32;

// Bilder
var sky, background, cloud0, cloud1, cloud2, tank_green, tank_yellow, tank_orange, tank_red, tank_empty;
var repairKit, gas, sun, balloon, balloon_fire, balloon_hole, balloonHB, balloonHB_fire, balloonHB_hole;
var balloonPicture, heightBarPicture, ground, montains, windArrow, bird0, bird1;
var countImagesLoading = 0;

// Progressbar
var maxprogress = 250;   // total to reach
var actualprogress = 0;  // current value
var itv = 0;  // id to setinterval

// verschiedene Variablen fuer das Spiel
var clouds = [];
var powerUps = [];
var enemies = [];

// Balloon Variablen
var balloonXPosition = 150;
var balloonYPosition = 250;
var balloonDirection = 0;
var balloonVertSpeed = 0;
var balloonHorSpeed = 0;
var balloonPicture = null;

var sunPosition = -120;
var timer = 0;
var gamePaused = false;
var gameHandle = 0;
var cloudHandle = 0;
var powerUpHandle = 0;
var enemyHandle = 0;

var windSpeed = 0;
var degree = 0;
var flightAttitude = 0;
var maxLvlHeight = 0;
var lvlMngr = null;
var imgMngr = null;
var maxWindStrenght = 9;

//var xml;

// Definiere ein Wolken Objekt
var Cloud = function(x, y, s, p) {
	this.x = x;
	this.y = y;
	this.speed = s;
	this.pic = p;
	this.defunct = false;
}   

// Neues powerUp
var powerUp = function(x, y, s, p, t) {
	this.x = x;
	this.y = y;
	this.speed = s;
	this.pic = p;
	this.type = t;
	this.defunct = false;
}

// Definiere ein Gegner
var Enemy = function(x, y, s, p1, p2, t) {
	this.x = x;
	this.y = y;
	this.speed = s;
	this.pic1 = p1;
	this.pic2 = p2;
	this.type = t;
	this.defunct = false;
}
