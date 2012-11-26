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
	
	//loadAllImages();
	
	// Level Manager
	lvlMngr = new LevelManager();
	lvlMngr.init("js/levels.xml");
	
	level = lvlMngr.getCurrentLevel();
	updateLevel(level);
	
	// Image Manager
	imgMngr =  new ImageManager();
	imgMngr.load({
		"spriteSheet"			: "./pics/spriteSheets/spriteSheet.png",
		"tank"					: "./pics/tank.png",		
		"windArrow"		 		: "./pics/up_arrow_small.png"
	}, onDone);
	
	// Mouse Events
	document.addEventListener("mousemove", moveBalloon, false);
	document.addEventListener("mousedown", fireBullet, false);
	document.addEventListener("keydown", keyDown, false);
}, false);

function onDone() {
	spriteSheet 	= imgMngr.get("spriteSheet");
	tank 			= imgMngr.get("tank");
	windArrow 		= imgMngr.get("windArrow");
	
	var bgFrames = [
				[0, 0, 480, 1300, 0, 0],
				[481, 0, 480, 1300, 0, 0],
				[962, 0, 480, 1300, 0, 0]
			];
	
	bg_sprite = new SpriteSheet(spriteSheet, bgFrames);
	
	var balloonFrames = [
				[0, 1472, 124, 216, 0, 0],
				[125, 1472, 124, 216, 0, 0],
				[250, 1472, 124, 216, 0, 0],
				[375, 1472, 34, 59, 0, 0],
				[410, 1472, 34, 59, 0, 0],
				[445, 1472, 34, 59, 0, 0]
			];
	
	b_sprite = new SpriteSheet(spriteSheet, balloonFrames);
	
	balloonFrame = 0;
	heightBarFrame = 3;
	
	var tankFrames = [
				[0, 1841, 42, 39, 0, 0],
				[43, 1841, 42, 39, 0, 0],
				[86, 1841, 42, 39, 0, 0],
				[129, 1841, 42, 39, 0, 0],
				[172, 1841, 42, 39, 0, 0]
			];
	
	t_sprite = new SpriteSheet(spriteSheet, tankFrames);
}

// Event zum starten des Spieles
$(document).ready(function(){
	$("#startBtn").click(function() {
		startGame();
	});
	$("#backBtn").click(function() {
		pauseGame();
	});
	$("#playBtn").click(function() {
		startGame();
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

// starte das Spiel
function startGame() {
	gameHandle = setInterval(draw, 50);
	cloudHandle = setInterval(createCloud, 1000);
	powerUpHandle = setInterval(createPowerUp, 15000);
	enemyHandle = setInterval(createEnemy, 1000);
}

// Spiel pausieren oder wieder fortsetzen
function pauseGame() {
	if (!gamePaused) {
		clearInterval(gameHandle);
		clearInterval(cloudHandle);
		clearInterval(powerUpHandle);
		gamePaused = true;
	} else if (gamePaused) {
		startGame();
		gamePaused = false;
	}
}

