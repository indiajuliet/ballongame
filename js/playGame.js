
// Bewege den Ballon zur Mausposition (horizontal)
function moveBalloon(e) {
	/*balloonXPosition = e.clientX;
	balloonYPosition = e.clientY;*/
}

// Tastenaktionen
function keyDown(e) {
	switch (e.keyCode) {
		case LEFT_ARROW:
			balloonHorSpeed--;
			balloonDirection = -1;
			break;
			
		case RIGHT_ARROW:
			balloonHorSpeed++;
			balloonDirection = 1;
			break;
			
		case UP_ARROW:
			balloonFrame = 1;
			heightBarFrame = 4;
			balloonDirection = -2;
			balloonVertSpeed--;
			tankStatus--;
			break;	
			
		case DOWN_ARROW:
			balloonFrame = 2;
			heightBarFrame = 5;
			balloonVertSpeed++;
			balloonDirection = 2;
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
	var x = getRandom(-100, width + 100);
	var y = getRandom(-100, height);
	var s = windSpeed;
	
	// Ermittle die Position des naechsten Objekts
	if(x >= 0)
		y = -100;
	else if(y >= 0)
		x = -100;
	
	var frame = getRandom(0,2);
	
	var cloudFrames = [
				[0, 1689, 145, 100, 0, 0],
				[146, 1689, 172, 100, 0, 0],
				[319, 1689, 181, 100, 0, 0]
			];
	
	var sprite = new SpriteSheet(spriteSheet, cloudFrames);
	var newCloud = new Cloud(x, y, s, sprite, frame);
	clouds.push(newCloud);
}	

//Erzeugt ein zufälliges Power Up
function createPowerUp() {
	var x = getRandom(0, width-40);
	var y = getRandom(-100 , -60);
		
	// Waehle zufaellig ein Bild
	var nr = getRandom(0,1);
	var pic, type;
	
	switch(nr) {
		case 0:
			pic = tank;
			type = 0;
			break;
		case 1:
			pic = tank;
			type = 1;
			break;
		default:
			pic = gas;
			type = 0;
			break;
	}

	var newpowerUp = new powerUp(x, y, pic, type);
	powerUps.push(newpowerUp);
}

//Erzeugt ein zufälliges Power Up
function createEnemy() {
	var side = getRandom(0, 1);
	var y = getRandom(0, 300);
	var s = getRandom(3, 7);
	var dir, x;
	
	// Ermittle die Position des naechsten Objekts
	if(side == 0) {
		x = 0;
	}
	else {
		x = width;
		s = -s;
	}
	
	var frames = [
				[255, 1790, 63, 50, 0, 0],
				[63, 1790, 63, 50, 0, 0],
				[318, 1790, 63, 50, 0, 0],
				[191, 1790, 63, 50, 0, 0]
			];
	
	var sprite = new SpriteSheet(spriteSheet, frames);
	var newEnemy = new Enemy(x, y, s, sprite, side);
	enemies.push(newEnemy);
}

// verringere Geschwindigkeit (beim Fallen)
function updateBalloon() {
	
	// Flughoehe aktualisieren
	flightAttitude += -balloonVertSpeed;
	
	// Geschwindigkeit drosseln
	if(balloonVertSpeed <= -20)
		balloonVertSpeed = -20;
	if(balloonVertSpeed >= 20)
		balloonVertSpeed = 20;
	
	// Falls die Y Position des Ballons < 200 ist wird der Ballon nicht mehr bewegt nur die Objekte
	if(balloonYPosition > 200) {
		balloonYPosition += balloonVertSpeed;
	}
	
	// Falls die Flughoehe kleiner Null ist nicht mehr sinken
	if(flightAttitude < 0) {
		flightAttitude = 0;
		balloonVertSpeed = 0;
	}
	
	// Falls die Flughoehe die maximale Level Hoehe erreicht
	if(flightAttitude > maxLvlHeight) {
		flightAttitude = maxLvlHeight;
		balloonVertSpeed = 0;
		
		// lade naechstes Level
		nextLevel();
	}
	flightAttitude = Math.round(flightAttitude);
	
	//console.log("Höhe: " + flightAttitude + "Max Höhe: " + maxLvlHeight);
	
	// Beende Bewegung wenn Ballon am Rand ist
	if(balloonXPosition <= 0) { 						// linker Rand
		if(balloonHorSpeed < 0) {
			balloonHorSpeed = 0;
			balloonXPosition = 0;
		}
	}
	else if((balloonXPosition + 124) >= width) {		// rechter Rand
		if(balloonHorSpeed > 0) {
			balloonHorSpeed = 0;
			balloonXPosition = (width - 124);
		}
	}
	
	balloonHorSpeed += windSpeed / 100;
	balloonXPosition += balloonHorSpeed;
	
	//console.log("WindSpeed: " + windSpeed + " balloonHorSpeed: " + balloonHorSpeed);
	
	timer++;
	
	//Falls Ballon auf ein PowerUp trifft, wird dieses entfernt und die entsprechende Aktion ausgeführt
	collect();
	
	//Falls Vogel in den Ballon fliegt
	//collision();
	
	// verringere geschwindigkeit jede Sekunde um 1 (Schwerkraft)
	if(timer == 10) {
		if(balloonVertSpeed >= -20 && balloonVertSpeed <= 20) {
			balloonVertSpeed += 1;
		}
		
		timer = 0;
		balloonFrame = 0;
		heightBarFrame = 3;
	}
}

function collect(){
	for (var b = 0; b < enemies.length; b++) {
		if (enemies[b].x >= balloonXPosition && enemies[b].y >= balloonYPosition
				&& enemies[b].x <= balloonXPosition + 260 && enemies[b].y <= balloonYPosition + 550){
			var type = enemies[b].type;
			if (type == 0){
				balloonVertSpeed = 0;
			}
			
			enemies.splice(b, 1);
			b--;
		}
	}
}

function collision(){
	for (var b = 0; b < enemies.length; b++) {
		if (enemies[b].x >= balloonXPosition && enemies[b].y >= balloonYPosition
				&& enemies[b].x <= balloonXPosition + 260 && enemies[b].y <= balloonYPosition + 550){
			
			var type = enemies[b].type;
			if (type == 0 && tankStatus <= 300){
				tankStatus += 100;
			}
			
			powerUps.splice(b, 1);
			b--;
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
	var relHeight = (height - 80) - (flightAttitude * step);
	var center = HBWidth / 2;
	
	//hctx.drawImage(heightBarPicture, 0, relHeight);
	
	b_sprite.drawFrame(hctx, heightBarFrame, center - 16, relHeight);	
	
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
	
	// Position der Tankanzeige
	var posW = width - 50;
	var posH = 1;

	var frame = 0;
	
	// Hole die richtige Tankanzeige, entsprechend dem aktuellen Status			
	if (tankStatus < 100){
		frame = 4;
	}
	if (tankStatus >= 100 && tankStatus < 200){
		frame = 3;
	}
	if (tankStatus >= 200 && tankStatus < 300){
		frame = 2;
	}
	if (tankStatus >= 300 && tankStatus < 400){
		frame = 1;
	} 
	if (tankStatus >= 400){
		frame = 0;
	}
	
	t_sprite.drawFrame(sctx, frame, posW, posH);
}

// Lade naechstes Level
function nextLevel() {
	clearScene();
	
	// Wolken-Array leeren
	clouds = [];
	
	level =lvlMngr.nextLevel();
	updateLevel(level);
	
	flightAttitude = 0;
}

function updateLevel(level) {
	maxLvlHeight = level.getLvlHeight();
	maxWindStrenght = level.getMaxWindStrenght();
	bgFrame = level.getLevelNr();
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
function getRandom(min, max) {
	if (min > max) {
		return -1;
	}
 
	if (min == max) {
		return min;
	}
 
	var r;
 
	do {
		r = Math.random();
	}
	while(r == 1.0);
 
	return min + parseInt(r * (max-min+1));
}

function updateBackground() {
	var yPos = 1300 - height;
	yPos = yPos - (flightAttitude / 50);
	
	bg_sprite.drawFrame(ctx, bgFrame, 0, -yPos);
}

function clearScene() {
	ctx.clearRect(0,0, width, height);
	sctx.clearRect(0,0, width, 40);
	hctx.clearRect(0,0, 40, height);
}

//===========================================================
// Zeichenfunktionen
//===========================================================

// Zeichnet alles (Diese Funktion wird jede 50 ms wiederholt)
function draw() {
	drawScene();
	drawClouds();
	drawBalloon();
	drawPowerUp();
	drawEnemies();
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
	
	b_sprite.drawFrame(ctx, balloonFrame, balloonXPosition, balloonYPosition);
	//ctx.drawImage(balloonPicture, balloonXPosition, balloonYPosition);
}

function drawText() {
	// Flughoehe
	sctx.fillStyle = "white";
    sctx.font = "Bold 16px Sans-Serif";
	sctx.fillText(flightAttitude + "m", 10, 20);
}

// Zeichnet alle Wolken
function drawClouds() {
	// Entferne alle Wolken, die sich nicht mehr innerhalb des Bildschirms befinden
	for (var b = 0; b < clouds.length; b++) {
		if (clouds[b].defunct == true || clouds[b].x + 200 < 0 || clouds[b].y + 100 < 0 || clouds[b].x > width || clouds[b].y > height) {
			clouds.splice(b, 1);
			b--;
		}
	}
	
	for (var b = 0; b < clouds.length; b++) {
		// Bewege die Wolken
		clouds[b].speed += windSpeed / 100; // Wind
		clouds[b].x += clouds[b].speed;
		
		// Bewege Objekte nach unten damit es so aussieht dass der Ballon steigt
		if(balloonYPosition < 200)
			clouds[b].y -= balloonVertSpeed;

		var sprite = clouds[b].sprite;
		sprite.drawFrame(ctx, clouds[b].frame, clouds[b].x, clouds[b].y);
	}
}

function drawPowerUp() {
	// Entferne alle PowerUps, die sich nicht mehr innerhalb des Bildschirms befinden
	for (var b = 0; b < powerUps.length; b++) {
		if (powerUps[b].defunct == true || powerUps[b].x > width || powerUps[b].y > height ) {
			powerUps.splice(b, 1);
			b--;
		}
	}
	
	for (var b = 0; b < powerUps.length; b++) {
		// Bewege Objekte nach unten damit es so aussieht dass der Ballon steigt
		if(balloonYPosition < 200)
			powerUps[b].y -= balloonVertSpeed;
		
		ctx.drawImage(powerUps[b].pic, powerUps[b].x, powerUps[b].y);
	}
}

function drawEnemies() {
	// Entferne alle Voegel, die sich nicht mehr innerhalb des Bildschirms befinden
	for (var b = 0; b < enemies.length; b++) {
		if (enemies[b].defunct == true || enemies[b].x > (width + 100) || enemies[b].x < -100 || enemies[b].y > height ) {
			enemies.splice(b, 1);
			b--;
		}
	}
	
	for (var b = 0; b < enemies.length; b++) {
		// Bewege den Vogel nach rechts
		enemies[b].x += enemies[b].speed;	
		
		var xPos = Math.round(enemies[b].x);
		
		var frame = 0;
		
		if((xPos % 50) >= 0 && (xPos % 50) <= 10) {
			if(enemies[b].dir == 1)
				frame = 0;
			else
				frame = 2;
				
			enemies[b].y += 3;
		}
		else {
			if(enemies[b].dir == 1)
				frame = 1;
			else
				frame = 3;
				
			enemies[b].y -= 3;
		}
		
		// Bewege Objekte nach unten damit es so aussieht dass der Ballon steigt
		if(balloonYPosition < 200)
			enemies[b].y -= balloonVertSpeed;
		
		var sprite = enemies[b].sprite;
		
		sprite.drawFrame(ctx, frame, enemies[b].x, enemies[b].y);
	}
}
