// Initialisation beim Start
window.addEventListener("load", function() {
	// Hole das Canvas Element
	var myCanvas = document.getElementById('gameCanvas');
	var myStatusbar = document.getElementById('statusbar');
	var myHeightBar = document.getElementById('heightBar');
	
	if (!myCanvas || !myCanvas.getContext || !myStatusbar || !myStatusbar.getContext || !myHeightBar || !myHeightBar.getContext) {
		return;
	}

	// Hole das Canvas 2d Context
	ctx = myCanvas.getContext('2d');
	sctx = myStatusbar.getContext('2d');
	hctx = myHeightBar.getContext('2d');
	
	// Initialisiere das Spiel
	//playBackgroundMusic();
	
	myCanvas.style.opacity = 1;
	myStatusbar.style.opacity = 1;
	myHeightBar.style.opacity = 1;
	
	width = myCanvas.width;
	height = myCanvas.height;
			
	//loadAllImages();
	
	// Level Manager
	lvlMngr = new LevelManager();
	lvlMngr.init("js/levels.xml");
	
	// Image Manager
	imgMngr =  new ImageManager();
	imgMngr.load({
		"bird0" 				: "./pics/bird2.png",
		"bird1" 				: "./pics/bird3.png",
		"cloud1" 				: "./pics/cloud1.png",
		"cloud2" 				: "./pics/cloud2.png",
		"cloud3" 				: "./pics/cloud3.png",
		"sun" 					: "./pics/sun.png",
		"mountains" 			: "./pics/mountains.png",
		"spaceship" 			: "./pics/spaceship.png",
		"balloon" 				: "./pics/balloon_small.png",
		"balloon_fire" 			: "./pics/balloon_small_fire.png",
		"balloon_hole" 			: "./pics/balloon_small_hole.png",
		"balloonHB" 			: "./pics/balloon_tiny.png",
		"balloonHB_fire" 		: "./pics/balloon_tiny_fire.png",
		"balloonHB_hole" 		: "./pics/balloon_tiny_hole.png",
		"windArrow"		 		: "./pics/up_arrow_small.png",
		"buttonPlay" 			: "./pics/button_play.png",
		"tank_green" 			: "./pics/Tankanzeige_gruen_small.png",
		"tank_yellow" 			: "./pics/Tankanzeige_gelb_small.png",
		"tank_orange" 			: "./pics/Tankanzeige_orange_small.png",
		"tank_red" 				: "./pics/Tankanzeige_rot_small.png",
		"tank_empty" 			: "./pics/Tankanzeige_leer_small.png",
		"repairKit" 			: "./pics/Kanister2.png",
		"gas" 					: "./pics/try.png",
		"background"			: backgroundPic
	}, onDone);
	
	// Mouse Events
	document.addEventListener("mousemove", moveBalloon, false);
	document.addEventListener("mousedown", fireBullet, false);
	document.addEventListener("keydown", keyDown, false);
}, false);

function onDone() {
	cloud0 			= imgMngr.get("cloud1");
	cloud1 			= imgMngr.get("cloud2");
	cloud2 			= imgMngr.get("cloud3");
	balloon 		= imgMngr.get("balloon");
	balloon_fire 	= imgMngr.get("balloon_fire");
	balloon_hole 	= imgMngr.get("balloon_hole");
	balloonHB 		= imgMngr.get("balloonHB");
	balloonHB_fire 	= imgMngr.get("balloonHB_fire");
	balloonHB_hole 	= imgMngr.get("balloonHB_hole");
	windArrow 		= imgMngr.get("windArrow");
	buttonPlay 		= imgMngr.get("buttonPlay");
	tank_green 		= imgMngr.get("tank_green");
	tank_yellow 	= imgMngr.get("tank_yellow");
	tank_orange 	= imgMngr.get("tank_orange");
	tank_red 		= imgMngr.get("tank_red");
	tank_empty 		= imgMngr.get("tank_empty");
	repairKit 		= imgMngr.get("repairKit");
	gas 			= imgMngr.get("gas");
	bird0 			= imgMngr.get("bird0");
	bird1 			= imgMngr.get("bird1");
	background 		= imgMngr.get("background");
	

	balloonPicture = balloon;
	heightBarPicture = balloonHB;
	
	alert("All Pics Loaded");
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
	powerUpHandle = setInterval(createPowerUp, 1300);
	enemyHandle = setInterval(createEnemy, 500);
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

