// Initialisation beim Start
window.addEventListener("load", function() {
	// Hole das Canvas Element
	myCanvas = document.getElementById('gameCanvas');
	myStatusBar = document.getElementById('statusbar');
	myHeightBar = document.getElementById('heightBar');
	myFooter = document.getElementById('foot');
	
	if (!myCanvas || !myCanvas.getContext || !myStatusBar || !myStatusBar.getContext || !myHeightBar || !myHeightBar.getContext) {
		return;
	}

	// Hole das Canvas 2d Context
	ctx = myCanvas.getContext('2d');
	sctx = myStatusBar.getContext('2d');
	hctx = myHeightBar.getContext('2d');
	
	// Initialisiere das Spiel
	
	myCanvas.style.opacity = 1;
	myStatusBar.style.opacity = 1;
	myHeightBar.style.opacity = 1;
	
	width = myCanvas.width;
	height = myCanvas.height;
	HBWidth = myHeightBar.width;
	HBHeight = myHeightBar.height;
	SBWidth = myStatusBar.width;
	SBHeight = myStatusBar.height;

	RATIO = width / height; 	
	
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
	sound.menuSound.play();
	
	resize();
	window.addEventListener("resize", resize, false);

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
	
	
	var tankFrames = [
				[0, 1670, 42, 39, 0, 0],
				[43, 1670, 42, 39, 0, 0],
				[86, 1670, 42, 39, 0, 0],
				[129, 1670, 42, 39, 0, 0],
				[172, 1670, 42, 39, 0, 0]
			];
	
	tankSprite = new SpriteSheet(spriteSheet, tankFrames);
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
	$("#getLvl").click(function() {
		$.mobile.changePage("#main", { transition: "slideup"} )
		startNewGame(lvlMngr.getCurrentLevelId()+1);
	});
	$("#lvlDoneReplay").click(function() {
		$.mobile.changePage("#main", { transition: "slideup"} )
		startNewGame(lvlMngr.getCurrentLevelId()+1);
	});
	$("#nextLvl").click(function() {	
		var lvl = lvlMngr.getCurrentLevelId()+2;
		if (lvl <= 3){
			$.mobile.changePage("#main", { transition: "slideup"} )
			startNewGame(lvl);			
		}
	});
	$("#backBtn").click(function() {
		if(isStarted == true)
			pauseGame();
	});
	$("#playBtn").click(function() {
		pauseGame();
		if(gamePaused) {
			$(this).css('background-image', 'url(pics/button_play.png)');
		}
		else {
			$(this).css('background-image', 'url(pics/button_pause.png)');
		}
	});
	$("#pauseBtn").click(function() {		
		pauseGame();
	});
	
});


//Sound an/aus


$(document).ready(function(){
	
	PlaySound=1;
	$("#sound_on").attr("checked","checked");
	$("#sound_on").click(function() {
		PlaySound=1;
		$("#musicBtn").css("background-image", "url(pics/Button_music_on.png)");
		sound.setVolume(PlaySound);
	});
	$("#sound_off").click(function() {
		PlaySound=0;
		$("#musicBtn").css("background-image", "url(pics/Button_music_off.png)");
		sound.setVolume(PlaySound);
	});
	$("#musicBtn").click(function() {
		PlaySound=(PlaySound+1)%2;
		if (PlaySound){
		  $("#musicBtn").css("background-image", "url(pics/Button_music_on.png)"); 
		  sound.setVolume(PlaySound);
		  $("#sound_on").attr("checked","checked");
		}
		else{
		  $("#musicBtn").css("background-image", "url(pics/Button_music_off.png)");
		  sound.setVolume(PlaySound);
		  $("#sound_off").attr("checked","checked");
		}
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
	sound.menuSound.pause();
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
	upSpeed = 1;
	upSpeedTimer = 0;
}

function startGame() {
	if(hasFocus && !isStarted) {
		isStarted = true;
		gamePaused = false;
		
		gameHandle = setInterval(draw, 50);
		cloudHandle = setInterval(createCloud, 1000);
		powerUpHandle = setInterval(createPowerUp, 1000);
		enemyHandle = setInterval(createEnemy, 1000);
		sound.setVolume(PlaySound);
		sound.levelSound.play();
		sound.menuSound.pause();
	}
}

function stopGame() {
	if(isStarted) {
		isStarted = false;
		gamePaused = true;
		
		clearInterval(gameHandle);
		clearInterval(cloudHandle);
		clearInterval(powerUpHandle);
		clearInterval(enemyHandle);
	
		gameHandle = 0;
		cloudHandle = 0;
		powerUpHandle = 0;
		enemyHandle = 0;
		
		sound.levelSound.pause();
		sound.menuSound.play();
	}
}

// Spiel pausieren oder wieder fortsetzen
function pauseGame() {
  sound.menuSound.play();
	if (!gamePaused) {
		stopGame();
	} else if (gamePaused) {
		startGame();
	}
}

function resize() {
	currentHeight = window.innerHeight * 0.86;
	currStatusHeight = window.innerHeight * 0.05;
	currFooterHeight = window.innerHeight * 0.08;
	
	
	// resize the width in proportion
	// to the new height
	currentWidth = currentHeight * RATIO;
	scale = currentWidth / width;
	
	myCanvas.style.width = currentWidth * 0.92 + 'px';
	myCanvas.style.height = currentHeight + 'px';
	
	myStatusBar.style.width = currentWidth + 'px';
	myStatusBar.style.height = currStatusHeight + 'px';

	myHeightBar.style.width = currentWidth * 0.08 + 'px';
	myHeightBar.style.height = currentHeight + 'px';
	
	myFooter.style.width = currentWidth + 'px';
	myFooter.style.height = currFooterHeight + 'px';
	
	// a short delay
	window.setTimeout(function() {
		window.scrollTo(0,1);
	}, 1);
}
