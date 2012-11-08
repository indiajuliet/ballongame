
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
			balloonPicture = balloon_fire;
			balloonDirection = -2;
			balloonVertSpeed--;
			break;	
			
		case DOWN_ARROW:
			balloonPicture = balloon_hole;
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
		
	// Waehle zufaellig ein Bild
	var nr = getRandom(0,2);

	var pic = null;
	
	switch(nr) {
		case 0:
			pic = cloud1;
			break;
		case 1:
			pic = cloud2;
			break;
		case 2:
			pic = cloud3;
			break;
		default:
			pic = cloud3;
			break;
	}

	var newCloud = new Cloud(x, y, s, pic);
	clouds.push(newCloud);
}	

//Erzeugt ein zuf�lliges Power Up
function createPowerUp() {
	var x = -100 + Math.random() * 5 * 320;
	var y = -200 + Math.random() * 5 * 500;
	var s = Math.random() * 10;
	
	// Ermittle die Position des naechsten Objekts
	if(x >= 0)
		y = -200;
	else if(y >= 0)
		x = -200;
		
	// Waehle zufaellig ein Bild
	var nr = ~~(Math.random() * 2);
	var pic, type;
	
	switch(nr) {
		case 0:
			pic = gas;
			type = 0;
			break;
		case 1:
			pic = repairKit;
			type = 1;
			break;
		default:
			pic = gas;
			type = 0;
			break;
	}

	var newpowerUp = new powerUp(x, y, s, pic, type);
	powerUps.push(newpowerUp);
}

// verringere Geschwindigkeit (beim Fallen)
function updateBalloon() {
	
	// Flughoehe aktualisieren
	flightAttitude += -balloonVertSpeed;
	flightAttitude = Math.round(flightAttitude);
	
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
	if(flightAttitude >= maxLvlHeight) {
		flightAttitude = maxLvlHeight;
		balloonVertSpeed = 0;
		console.log("H�he: " + flightAttitude);
		console.log("Max H�he: " + maxLvlHeight);
	}
	
	// Beende Bewegung wenn Ballon am Rand ist
	if(balloonXPosition <= -10) { 						// linker Rand
		if(balloonHorSpeed < 0) {
			balloonHorSpeed = 0;
			balloonXPosition = -10;
		}
	}
	else if((balloonXPosition + 140) >= width) {		// rechter Rand
		if(balloonHorSpeed > 0) {
			balloonHorSpeed = 0;
			balloonXPosition = (width - 140);
		}
	}
	
	balloonHorSpeed += windSpeed / 100;
	balloonXPosition += balloonHorSpeed;
	
	console.log("WindSpeed: " + windSpeed + " balloonHorSpeed: " + balloonHorSpeed);
	
	timer++;
	
	//Falls Ballon auf ein PowerUp trifft, wird dieses entfernt und die entsprechende Aktion ausgef�hrt
	for (var b = 0; b < powerUps.length; b++) {
		if (powerUps[b].x >= balloonXPosition && powerUps[b].y >= balloonYPosition
				&& powerUps[b].x <= balloonXPosition + 130 && powerUps[b].y <= balloonYPosition + 130){
			powerUps.splice(b, 1);
			b--;
		}
	}
	
	// verringere geschwindigkeit jede Sekunde um 1 (Schwerkraft)
	if(timer == 20) {
		if(balloonVertSpeed >= -20 && balloonVertSpeed <= 20) 
			balloonVertSpeed += 0.4;
		
		timer = 0;
		balloonPicture = balloon;
	}
}

// aktualisiere den Windpfeil
function updateWindArrow() {

	// Hole das Pfeilbild
	var $windArrow = $("#windDirection");
	
	// Berechne Windgeschwindikeit
	var randSpeed = getRandom(-1, 1);
	
	if(windSpeed + randSpeed < 9 && windSpeed + randSpeed > -9)
		windSpeed += randSpeed;
	
	// Ermittle den Windpfeilwinkel
	degree = windSpeed * 10;
	
	// Position des Pfeils
	var posW = width - 5;
	var posH = 40 - 5 ;
	
	// Rotiere den Windpfeil um diesen Winkel an einer bestimmten Position
	rotateIt(sctx, windArrow, degree, posW, posH);
}

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

//===========================================================
// Zeichenfunktionen
//===========================================================

// Zeichnet alles (Diese Funktion wird jede 50 ms wiederholt)
function draw() {
	drawScene();
	drawClouds();
	drawBalloon();
	drawPowerUp();
}

// Zeichnet alle Hintergrundteile der Szene 
function drawScene() {
	// loeschen des Inhaltes vom Canvas-Elements
	ctx.clearRect(0,0, width, height);
	sctx.clearRect(0,0, width, 40);
	
	// Zeichnen des Himmels als ein linearer Gradient
	sky = ctx.createLinearGradient(0, width, 0, height);
	//sky.addColorStop(Math.random(), SKY_COLOR);
	sky.addColorStop(1, SKY_COLOR);
	sky.addColorStop(1, '#FFFFFF');
	ctx.fillStyle = sky;
	ctx.fillRect(0, 0, width, height);
	
	// zeichne den Pfeil neu
	updateWindArrow();
	
	// zeichne den Text
	drawText();
	
	// Zeichnen der Berge
	//ctx.drawImage(mountains, -20, height - 350);
	
	// Zeichnen des Bodens
	//ctx.drawImage(ground, 0, height - 80);
	
	// Zeichnen der Sonne
	/*if(sunPosition >= width) {
		sunPosition = SUN_START_POSITION;
	}
	else 
		sunPosition++;
	ctx.drawImage(sun, sunPosition, 0);*/

	// Zeichnen der Wolken
	/*ctx.drawImage(cloud1, 20, 50);
	ctx.drawImage(cloud2, 150, 130);
	ctx.drawImage(cloud3, 300, 40);*/
}

// Zeichnet den Ballon an seiner aktuellen Position
function drawBalloon() {
	// Zeichne den Ballon
	updateBalloon();
	ctx.drawImage(balloonPicture, balloonXPosition, balloonYPosition);
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
		
		ctx.drawImage(clouds[b].pic, clouds[b].x, clouds[b].y);
		//ctx.drawImage(bird, birds[b].x, birds[b].y);
	}
	
	console.log("Wolkenanzahl: " + clouds.length);
}

function drawPowerUp() {
	// Entferne alle Voegel, die sich nicht mehr innerhalb des Bildschirms befinden
	for (var b = 0; b < powerUps.length; b++) {
		if (powerUps[b].defunct == true || powerUps[b].x > width || powerUps[b].y > height ) {
			powerUps.splice(b, 1);
			b--;
		}
	}
	
	for (var b = 0; b < powerUps.length; b++) {
		// Bewege den Vogel nach rechts
		powerUps[b].x += powerUps[b].speed;
		
		// Bewege Objekte nach unten damit es so aussieht dass der Ballon steigt
		if(balloonYPosition < 200)
			powerUps[b].y -= balloonVertSpeed;
		
		ctx.drawImage(powerUps[b].pic, powerUps[b].x, powerUps[b].y);
		//ctx.drawImage(bird, birds[b].x, birds[b].y);
	}
}
