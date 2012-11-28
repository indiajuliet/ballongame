
var ctx = null;		// Spiel Canvas
var sctx = null;	// Statusbar Canvas

// width of the canvas
var width = 480; 
var HBWidth = null;
var SBWidth = null; 

// height of the canvas  
var height = 700; 
var HBHeight = null;
var SBHeight = null;

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
var balloonPicture, heightBarPicture, ground, montains, windArrow, bird0, bird1, birdSprite;

var backgroundPic; 
 
var countImagesLoading = 0;

// Progressbar
var maxprogress = 250;   // total to reach
var actualprogress = 0;  // current value
var itv = 0;  // id to setinterval

// verschiedene Variablen fuer das Spiel
var clouds = [];
var powerUps = [];
var enemies = [];

var objects = [];

var tankStatus = 420;

// Balloon Variablen
var balloon = null;
var balloonXPosition = 200;
var balloonYPosition = 250;
var balloonDirection = 0;
var balloonVertSpeed = 0;
var balloonHorSpeed = 0;
var balloonFrame = 0;
var heightBarFrame = 3;

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
var level = null;
var imgMngr = null;
var maxWindStrenght = 0;
var cloudSprite = null;
var balloonSprite = null;
var enemySprite = null;
var tanksprite = null;
var spriteSheet = null;
var bgFrame = 0;
var hasFocus = true;
var isStarted = false;
