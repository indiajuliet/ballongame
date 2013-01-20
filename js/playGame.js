
// Bewege den Ballon zur Mausposition (horizontal)
function moveBalloon(e) {
	/*balloonXPosition = e.clientX;
	balloonYPosition = e.clientY;*/
}

// Tastenaktionen
function keyDown(e) {
	switch (e.keyCode) {
		case LEFT_ARROW:
			balloon.decSpeed(1);
			break;
			
		case RIGHT_ARROW:
			balloon.incSpeed(1);
			break;
			
		case UP_ARROW:
			if(balloon.getTankStatus() >= 0) {
				balloon.decVertSpeed(upSpeed);
				balloon.decTankStatus(1);
				balloon.setFrame(1);
				balloon.setHeightBarFrame(4);
				sound.ignite.play();
			}
			break;	
			
		case DOWN_ARROW:
			balloon.incVertSpeed(upSpeed);
			balloon.setFrame(2);
			balloon.setHeightBarFrame(5);
			break;
			
		case SPACE_BAR:
			fireBullet();
			break;
		
		default:
			// TODO
			break;
	}
}

// Feuert eine Kugel ab
function fireBullet() {
	// TODO
}

// erstellt eine Wolke an einer Zufaelligen Stelle
function createCloud() {
	for(o in cloudSprite) {
		switch(o) {
			case 'cloud':
				if(checkInterval(cloudSprite['cloud'].getInterval(), 100, 200)) {
					var newCloud = new Cloud(cloudSprite['cloud']);
					objects.push(newCloud);
				}
				break;
		default:
			// mache nix
			break;
		}
	}
}	

//Erzeugt ein zufälliges Power Up
function createPowerUp() {
	for(p in powerupSprite) {
		switch(p) {
			case 'fuel':
				if(checkInterval(powerupSprite['fuel'].getInterval(), 100, 200)) {
					var newpowerUp = new Tank(powerupSprite['fuel']);
					objects.push(newpowerUp);
				}
				break;
			case 'nitro':
				if(checkInterval(powerupSprite['nitro'].getInterval(), 100, 200)) {
					var newpowerUp = new Nitro(powerupSprite['nitro']);
					objects.push(newpowerUp);
				}
				break;
			default:
				break;
		}
	}
}

//Erzeugt einen zufälligen Enemy
function createEnemy() {

	for(e in enemySprite) {
		var newEnemy;
		switch (e) {
			case 'bird':
				if(checkInterval(enemySprite['bird'].getInterval(), 0, 50)) {
					newEnemy = new Bird(enemySprite['bird']);
					objects.push(newEnemy);
				}
				break;
			case 'plane':
				if(checkInterval(enemySprite['plane'].getInterval(), 100, 200)) {
					newEnemy = new Plane(enemySprite['plane']);
					objects.push(newEnemy);
				}
				break;
			case 'asteroid':
				if(checkInterval(enemySprite['asteroid'].getInterval(), 0, 10)) {
					newEnemy = new Asteroid(enemySprite['asteroid']);
					objects.push(newEnemy);
				}
				break;
			default:
				// mache nix
				break;
		}
	}
}

// verringere Geschwindigkeit (beim Fallen)
function updateBalloon() {
	// Flughoehe aktualisieren
	balloon.incFlightAttitude(-balloon.getVertSpeed());
	
	// Geschwindigkeit drosseln
	balloon.derate();
	
	balloon.checkBoundary();
	
	balloon.incSpeed(windSpeed / 100);
	balloon.incX(balloon.getSpeed());
	
	if(balloon.checkAttitude())
		nextLevel();
		
	if(upSpeed > 1) {
		if(upSpeedTimer < 50)
			upSpeedTimer++;
		else {
			upSpeed = 1;
			upSpeedTimer = 0;
			balloon.deration = 20;
		}
	}
}

// aktualisiere den Windpfeil
function updateWindArrow() {

	// Berechne Windgeschwindikeit
	var randSpeed = getRandom(-1, 1);
	
	if(windSpeed + randSpeed < maxWindStrenght && windSpeed + randSpeed > -maxWindStrenght)
		windSpeed += randSpeed;
	
	// Ermittle den Windpfeilwinkel
	degree = windSpeed * 10;
	
	// Position des Pfeils
	var posW = width / 2;
	var posH = 40 - 5 ;
	
	// Rotiere den Windpfeil um diesen Winkel an einer bestimmten Position
	rotateIt(sctx, windArrow, degree, posW, posH);
}

function updateHeightBar() {
	// Zeichne horizontale Linien
	var s = height / 10;
	
	hctx.beginPath();
	
	for (var i = 0; i < s; i++) {
		hctx.moveTo(0, i * s + 0.5);
		hctx.lineTo(40, i * s + 0.5);
	}
	
	hctx.lineWidth = 1;
	hctx.strokeStyle = "#FFFFFF";
	hctx.stroke();
	
	// Zeichne Mini-Ballon
	hctx.save();
	
	var step = (height - 80) / maxLvlHeight;
	var relHeight = (height - 80) - (balloon.getFlightAttitude() * step);
	var center = HBWidth / 2;

	balloonSprite.drawFrame(hctx, balloon.getHeightBarFrame(), center - 16, relHeight);	
	
	hctx.restore();
}

// Dreht ein Objekt entsprechend der Gradzahl an der gewuenschten Position
function rotateIt(objContext, objImg, lngPhi, posW, posH){
	var w = objImg.width;
	var h = objImg.height;
	
	var transW = posW - (w / 2);
	var transH = posH - (h / 2);	
	
	objContext.save();  
	
	objContext.translate(transW, transH);           	// Ursprung verschieben
	objContext.rotate(lngPhi*Math.PI/180);  			// Context drehen
	objContext.translate(-transW, -transH);         	// Ursprung verschieben
	
	objContext.drawImage(objImg, posW - w, posH - h);   // Bild zentriert zeichnen
	
	objContext.restore();
}

function updateStatusBar(){
	// aktualisiere Text
	drawText();

	// aktualisiere Windpfeil 
	updateWindArrow();
	
	// zeichne Tankstatus
	drawTankStatus();
}

function drawTankStatus() {
	// Position der Tankanzeige
	var posW = width - 50;
	var posH = 1;
	
	// Hole die richtige Tankanzeige, entsprechend dem aktuellen Status
	var frame = balloon.getTankFrame();
	
	tankSprite.drawFrame(sctx, frame, posW, posH);
}

// Lade naechstes Level
function nextLevel() {
	clearScene();
	clearLevel();
	
	level = lvlMngr.nextLevel();
	updateLevel(level);
	
	startGame();
}

function updateLevel(level) {
	maxLvlHeight = level.getLvlHeight();
	maxWindStrenght = level.getMaxWindStrenght();
	bgFrame = level.getLevelNr();
	
	// Gegnersprite anlegen
	var enemyFrames = level.getEnemyFrames();
	for(e in enemyFrames) {
		enemySprite[e] = new SpriteSheet(spriteSheet, enemyFrames[e]);
	}
	
	// Objektsprite anlegen
	var objectFrames = level.getObjectFrames();
	for(o in objectFrames) {
		cloudSprite[o] = new SpriteSheet(spriteSheet, objectFrames[o]);
	}
	
	// PowerUp-Sprite anlegen
	var powerUpFrames = level.getPowerUpFrames();
	for(p in powerUpFrames) {
		console.log(p);
		powerupSprite[p] = new SpriteSheet(spriteSheet, powerUpFrames[p]);
	}
	
//	sound.setEnemyAppear(level.getEnemyAppear());
	sound.setLevelSound(level.getLevelSound());
}

// Dreht ein Objekt entsprechend der Gradzahl (jQuery)
function rotate($object, degree) {
	// For All Browsers
    $object.css({ 
	'-webkit-transform' : 'rotate('+degree+'deg)',
       '-moz-transform' : 'rotate('+degree+'deg)',  
        '-ms-transform' : 'rotate('+degree+'deg)',  
         '-o-transform' : 'rotate('+degree+'deg)',  
            'transform' : 'rotate('+degree+'deg)',  
                 'zoom' : 1});
}

// Erstellt eine zufaellige Zahl in einem bestimmten Bereich 
function getRandom(a, b) {
	var z = Math.random();
	z *= (b - a + 1);
	z += a;
	return (Math.floor(z));
}

function updateBackground() {
	var yPos = 1300 - height;
	yPos = yPos - (balloon.getFlightAttitude() / 50);
	
	backgroundSprite.drawFrame(ctx, bgFrame, 0, -yPos);
}

function clearScene() {	
	ctx.clearRect(0,0, width, height);
	sctx.clearRect(0,0, width, 40);
	hctx.clearRect(0,0, 40, height);
}

function checkFocus() {
	$(window).bind('blur', function(){
        hasFocus = false;
    });

    $(window).bind('focus', function(){
        hasFocus = true;
    });
    // IE EVENTS
    $(document).bind('focusout', function(){
        hasFocus = false;
    });

    $(document).bind('focusin', function(){
        hasFocus = true;
    });
	
	if(hasFocus) {
		startGame();
		$('#playBtn').css('background-image', 'url(pics/button_pause.png)');
	}
	else {
		pauseGame();
		$('#playBtn').css('background-image', 'url(pics/button_play.png)');
	}
		
	//console.log("hasFocus: " + hasFocus + " isStarted: " + isStarted);
}

function checkInterval(interval, a, b) {
	console.log((balloon.getFlightAttitude() % interval) >= a , (balloon.getFlightAttitude() % interval) <= b)
	return ((balloon.getFlightAttitude() % interval) >= a && (balloon.getFlightAttitude() % interval <= b));
}
//===========================================================
// Zeichenfunktionen
//===========================================================

// Zeichnet alles (Diese Funktion wird jede 50 ms wiederholt)
function draw() {
	checkFocus();
		
	drawScene();
	drawBalloon();
	drawObjects();
}

// Zeichnet alle Hintergrundteile der Szene 
function drawScene() {
	// loeschen des Inhaltes vom Canvas-Elements
	clearScene();
	
	// Zeichnen des Himmels als ein linearer Gradient
	sky = ctx.createLinearGradient(0, width, 0, height);
	//sky.addColorStop(Math.random(), SKY_COLOR);
	sky.addColorStop(1, SKY_COLOR);
	sky.addColorStop(1, '#FFFFFF');
	ctx.fillStyle = sky;
	ctx.fillRect(0, 0, width, height);
	
	// Hintergrundbild zeichnen
	updateBackground();
	
	// aktualisiere StatusBar
	updateStatusBar();
	
	// aktuellisiere HeightBar 
	updateHeightBar();

}

// Zeichnet den Ballon an seiner aktuellen Position
function drawBalloon() {
	// Zeichne den Ballon
	updateBalloon();
	
	balloonSprite.drawFrame(ctx, balloon.getFrame(), balloon.getX(), balloon.getY());
}

function drawText() {
	// Flughoehe
	sctx.fillStyle = "white";
    sctx.font = "Bold 16px Sans-Serif";
	sctx.fillText(balloon.getFlightAttitude() + "m", 10, 20);
}

function drawObjects() {
	// Entferne alle Voegel, die sich nicht mehr innerhalb des Bildschirms befinden
	/*for (var i = 0; i < objects.length; i++) {
		
	}*/
	
	for (var i = 0; i < objects.length; i++) {
		// bewege Objekt
		objects[i].fly();
		
		balloon.checkCollisions(objects[i]);
		
		// Bewege Objekt nach unten damit es so aussieht dass der Ballon steigt
		//if(balloon.getY() < 200)
			objects[i].y -= balloon.getVertSpeed();
	
		// Zeichne Objekt
		var sprite = objects[i].getSprite();
		sprite.drawFrame(ctx, objects[i].getFrame(), objects[i].getX(), objects[i].getY());
		
		if (objects[i].defunct == true || objects[i].x > (width + 100) || objects[i].x < -100 || objects[i].y > height ) {
			objects.splice(i, 1);
			i--;
		}
	}
}
