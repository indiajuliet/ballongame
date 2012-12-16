// Initialisation beim Start
window.addEventListener("load", function() {
	// Hole das Canvas Element
	var myCanvas = document.getElementById('gameCanvas');
	var myStatusBar = document.getElementById('statusbar');
	var myHeightBar = document.getElementById('heightBar');
	
	if (!myCanvas || !myCanvas.getContext || !myStatusBar || !myStatusBar.getContext || !myHeightBar || !myHeightBar.getContext) {
		return;
	}

	// Hole das Canvas 2d Context
	ctx = myCanvas.getContext('2d');
	sctx = myStatusBar.getContext('2d');
	hctx = myHeightBar.getContext('2d');
	
	// Initialisiere das Spiel
	//playBackgroundMusic();
	
	myCanvas.style.opacity = 1;
	myStatusBar.style.opacity = 1;
	myHeightBar.style.opacity = 1;
	
	width = myCanvas.width;
	height = myCanvas.height;
	HBWidth = myHeightBar.width;
	HBHeight = myHeightBar.height;
	SBWidth = myStatusBar.width;
	SBHeight = myStatusBar.height;	
	
	// Level Manager
	lvlMngr = new LevelManager();
	lvlMngr.init("js/levels.xml");
	
	// Image Manager
	imgMngr =  new ImageManager();
	imgMngr.load({
		"spriteSheet"			: "./pics/spriteSheets/spriteSheet.png",		
		"windArrow"		 		: "./pics/up_arrow_small.png"
	}, onDone);
	
	balloon = new Balloon(balloonXPosition, balloonYPosition, balloonHorSpeed, balloonVertSpeed, balloonFrame);
	sound= new Sound();
	
	// Mouse Events
	document.addEventListener("mousemove", moveBalloon, false);
	document.addEventListener("mousedown", fireBullet, false);
	document.addEventListener("keydown", keyDown, false);
}, false);

function onDone() {
	spriteSheet 	= imgMngr.get("spriteSheet");
	windArrow 		= imgMngr.get("windArrow");
	
	var bgFrames = [
				[0, 0, 480, 1300, 0, 0],
				[481, 0, 480, 1300, 0, 0],
				[962, 0, 480, 1300, 0, 0]
			];
	
	backgroundSprite = new SpriteSheet(spriteSheet, bgFrames);
	
	/*var cloudFrames = [
				[0, 1518, 145, 100, 0, 0],
				[146, 1518, 172, 100, 0, 0],
				[319, 1518, 181, 100, 0, 0]
			];
	
	cloudSprite = new SpriteSheet(spriteSheet, cloudFrames);*/
	
	var balloonFrames = [
				[0, 1301, 124, 216, 0, 0],
				[125, 1301, 124, 216, 0, 0],
				[250, 1301, 124, 216, 0, 0],
				[375, 1301, 34, 59, 0, 0],
				[410, 1301, 34, 59, 0, 0],
				[445, 1301, 34, 59, 0, 0]
			];
	
	balloonSprite = new SpriteSheet(spriteSheet, balloonFrames);
	
	balloon.setFrame(0);
	balloon.setHeightBarFrame(3);
	
	/*var enemyFrames = [
				[255, 1790, 63, 50, 0, 0], // Vogel
				[63, 1790, 63, 50, 0, 0],
				[318, 1790, 63, 50, 0, 0],
				[191, 1790, 63, 50, 0, 0],
				[0, 1982, 197, 125, 0, 0], // Flugzeug
				[198, 1982, 198, 125, 0, 0],
				[397, 1982, 197, 125, 0, 0],
				[595, 1982, 198, 125, 0, 0]
			];
	
	enemySprite = new SpriteSheet(spriteSheet, enemyFrames);*/
	
	var tankFrames = [
				[0, 1670, 42, 39, 0, 0],
				[43, 1670, 42, 39, 0, 0],
				[86, 1670, 42, 39, 0, 0],
				[129, 1670, 42, 39, 0, 0],
				[172, 1670, 42, 39, 0, 0]
			];
	
	tankSprite = new SpriteSheet(spriteSheet, tankFrames);
	
	/*var powerupFrames = [
				[0, 1710, 42, 60, 0, 0]
			];
	
	powerupSprite = new SpriteSheet(spriteSheet, powerupFrames);*/
	
}

// Event zum starten des Spieles
$(document).ready(function(){
	$("#level1").click(function() {
		startNewGame(1);
	});
	$("#level2").click(function() {
		startNewGame(2);
	});
	$("#level3").click(function() {
		startNewGame(3);
	});
	$("#backBtn").click(function() {
		if(isStarted == true)
			pauseGame();
	});
	$("#playBtn").click(function() {
		//startGame();
	});
	$("#pauseBtn").click(function() {
		pauseGame();
	});
	
});


// Spiele Hintergrundmusik ab
function playBackgroundMusic() {
	var audio = document.createElement('audio');
	audio.addEventListener("canplay", function () { audio.play(); }, false);
	audio.loop = true;
	audio.volume = 0.5;
	audio.src = "audio/backgroundMusic.mp3";
}

// starte ein neues Spiel
function startNewGame(lvl) {
	clearLevel();
	
	level = lvlMngr.loadLevel(lvl-1);
	updateLevel(level);
	startGame();
}

function clearLevel() {
	stopGame();

	balloon.setFlightAttitude(0);
	balloon.setTankStatus(420);
	
	objects = [];
	enemySprite = [];
	cloudSprite = [];
	powerupSprite = [];
	
	balloon.setX(200);
	balloon.setX(250);
	balloon.setVertSpeed(0);
	balloon.setSpeed(0);
	balloon.setFrame(0);
	
	hasFocus = true;
	isStarted = false;
}

function startGame() {
	if(hasFocus && !isStarted) {
		isStarted = true;
		
		gameHandle = setInterval(draw, 50);
		cloudHandle = setInterval(createCloud, 1000);
		powerUpHandle = setInterval(createPowerUp, 1000);
		enemyHandle = setInterval(createEnemy, 1000);
		sound.levelSound.play();
	}
}

function stopGame() {
	if(isStarted) {
		isStarted = false;
	
		clearInterval(gameHandle);
		clearInterval(cloudHandle);
		clearInterval(powerUpHandle);
		clearInterval(enemyHandle);
	
		gameHandle = 0;
		cloudHandle = 0;
		powerUpHandle = 0;
		enemyHandle = 0;
		
		sound.levelSound.pause();
	}
}

// Spiel pausieren oder wieder fortsetzen
function pauseGame() {
	if (!gamePaused) {
		stopGame();
		gamePaused = true;
	} else if (gamePaused) {
		startGame();
		gamePaused = false;
	}
}


