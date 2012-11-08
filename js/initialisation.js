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
			
	loadAllImages();
	
	// Level Manager
	lvlMngr = new LevelManager();
	lvlMngr.init("js/levels.xml");
	
	// Mouse Events
	document.addEventListener("mousemove", moveBalloon, false);
	document.addEventListener("mousedown", fireBullet, false);
	document.addEventListener("keydown", keyDown, false);
}, false);

// Event zum starten des Spieles
$(document).ready(function(){
	$("#startBtn").click(function() {
		startGame();
	});
	$("#pauseBtn").click(function() {
		pauseGame();
	});
	$("#backBtn").click(function() {
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

// Lade alle Bilder
function loadAllImages() {
	// Himmel
	sky = ctx.createLinearGradient(0, width, 0, height);
	sky.addColorStop(0, SKY_COLOR);
	sky.addColorStop(1, '#FFFFFF');
	
	// Wolke 1
	countImagesLoading++;
	cloud1 = new Image();
	cloud1.src = 'pics/cloud1.png';
	cloud1.addEventListener("load", function() { countImagesLoading--; }, false);
	
	// Wolke 2
	countImagesLoading++;
	cloud2 = new Image();
	cloud2.src = 'pics/cloud2.png';
	cloud2.addEventListener("load", function() { countImagesLoading--; }, false);
	
	// Wolke 3
	countImagesLoading++;
	cloud3 = new Image();
	cloud3.src = 'pics/cloud3.png';
	cloud3.addEventListener("load", function() { countImagesLoading--; }, false);
	
	// Sonne
	countImagesLoading++;
	sun = new Image();
	sun.src = 'pics/sun.png';
	sun.addEventListener("load", function() { countImagesLoading--; }, false);
	
	// Boden
	/*countImagesLoading++;
	ground = new Image();
	ground.src = 'pics/ground.png';
	ground.addEventListener("load", function() { countImagesLoading--; }, false);*/
	
	// Berge
	countImagesLoading++;
	mountains = new Image();
	mountains.src = 'pics/mountains.png';
	mountains.addEventListener("load", function() { countImagesLoading--; }, false);
	
	// Ballon
	countImagesLoading++;
	balloon = new Image();
	balloon.src = 'pics/balloon_small.png';
	balloon.addEventListener("load", function() { countImagesLoading--; }, false);
	
	// Spaceship
	countImagesLoading++;
	bird = new Image();
	bird.src = 'pics/spaceship.png';
	bird.addEventListener("load", function() { countImagesLoading--; }, false);
	
	// Ballon mit Flamme
	countImagesLoading++;
	balloon_fire = new Image();
	balloon_fire.src = 'pics/balloon_small_fire.png';
	balloon_fire.addEventListener("load", function() { countImagesLoading--; }, false);
	
	// Ballon mit Loch
	countImagesLoading++;
	balloon_hole = new Image();
	balloon_hole.src = 'pics/balloon_small_hole.png';
	balloon_hole.addEventListener("load", function() { countImagesLoading--; }, false);
	
	// Windpfeil
	countImagesLoading++;
	windArrow = new Image();
	windArrow.src = 'pics/up_arrow_small.png';
	windArrow.addEventListener("load", function() { countImagesLoading--; }, false);
	
	//Tankanzeige Gr�n
	countImagesLoading++;
	tank_green = new Image();
	tank_green.src = 'pics/Tankanzeige_gruen.png';
	tank_green.addEventListener("load", function() { countImagesLoading--; }, false);
	
	//Tankanzeige Gelb
	countImagesLoading++;
	tank_yellow = new Image();
	tank_yellow.src = 'pics/Tankanzeige_gelb.png';
	tank_yellow.addEventListener("load", function() { countImagesLoading--; }, false);
	
	//Tankanzeige Orange
	countImagesLoading++;
	tank_orange = new Image();
	tank_orange.src = 'pics/Tankanzeige_orange.png';
	tank_orange.addEventListener("load", function() { countImagesLoading--; }, false);
	
	//Tankanzeige Rot
	countImagesLoading++;
	tank_red = new Image();
	tank_red.src = 'pics/Tankanzeige_rot.png';
	tank_red.addEventListener("load", function() { countImagesLoading--; }, false);
	
	//Tankanzeige leer
	countImagesLoading++;
	tank_empty = new Image();
	tank_empty.src = 'pics/Tankanzeige_leer.png';
	tank_empty.addEventListener("load", function() { countImagesLoading--; }, false);
	
	// PowerUp - Benzin
	countImagesLoading++;
	gas = new Image();
	gas.src = 'pics/Kanister2.png';
	gas.addEventListener("load", function() { countImagesLoading--; }, false);
	
	// PowerUp - Flickzeug
	countImagesLoading++;
	repairKit = new Image();
	repairKit.src = 'pics/try.png';
	repairKit.addEventListener("load", function() { countImagesLoading--; }, false);
	
	balloonPicture = balloon;
	
	setTimeout(checkIfAllImagesLoaded, 100);
}

// Pruefe ob alle Bilder geladen sind, wenn ja so starte das Spiel.
function checkIfAllImagesLoaded() {
	// Wenn alle Bilder geladen sind setze das Neuzeichnen auf 50 ms und das Erstellen der Wolken auf 1000ms
	if (countImagesLoading == 0) {
		//startGame();
	}
	else {
		setTimeout(checkIfAllImagesLoaded, 100);
	}
}

// starte das Spiel
function startGame() {
	gameHandle = setInterval(draw, 50);
	cloudHandle = setInterval(createCloud, 1000);
	powerUpHandle = setInterval(createPowerUp, 1300);
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

