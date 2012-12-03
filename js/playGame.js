
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
			balloon.decVertSpeed(1);
			balloon.decTankStatus(1);
			balloon.setFrame(1);
			balloon.setHeightBarFrame(4);
			sound.ignite.play();
			break;	
			
		case DOWN_ARROW:
			balloon.incVertSpeed(1);
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
	var newCloud = new Cloud(cloudSprite);
	objects.push(newCloud);
}	

//Erzeugt ein zufälliges Power Up
function createPowerUp() {
	var newpowerUp = new Tank(powerupSprite);
	objects.push(newpowerUp);
}

//Erzeugt ein zufälliges Power Up
function createEnemy() {
	
	var newEnemy = new Bird(enemySprite);
	objects.push(newEnemy);
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
	enemySprite = new SpriteSheet(spriteSheet, enemyFrames);
	
	// Objektsprite anlegen
	var objectFrames = level.getObjectFrames();
	cloudSprite = new SpriteSheet(spriteSheet, objectFrames);
	
	// PowerUp-Sprite anlegen
	var powerUpFrames = level.getPowerUpFrames();
	powerupSprite = new SpriteSheet(spriteSheet, powerUpFrames);
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
	
	if(hasFocus)
		startGame();
	else
		pauseGame();
		
	//console.log("hasFocus: " + hasFocus + " isStarted: " + isStarted);
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
		if(balloon.getY() < 200)
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
