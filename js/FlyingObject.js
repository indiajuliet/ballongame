/******
* Fliegendes Objekt
*
*******/

FlyingObject = function(x, y, s, f) {
	this.x = x;
	this.y = y;
	this.speed = s;
	this.frame = f;
	this.defunct = false;
}

/****
*  Wolke
*
****/
Cloud = function(sp) {	
	this.base = FlyingObject;
	
	this.type = "Cloud";
	this.sprite = sp;
	
	var xPos = getRandom(-100, width + 100);
	var yPos = getRandom(-100, height);
	var speed = windSpeed;
	
	// Ermittle die Position des naechsten Objekts
	if(xPos >= 0)
		yPos = -100;
	else if(yPos >= 0)
		xPos = -100;
	
	var frame = getRandom(0,2);
	
	this.base(xPos, yPos, speed, frame);
}

Cloud.prototype = new FlyingObject();
Cloud.prototype.constructor = Cloud;

Cloud.prototype = {
	setX: function(xPos) { this.x = xPos; },
	getX: function() { return this.x; },
	incX: function(inc) { this.x += inc; },
	decX: function(dec) { this.x -= dec; },
	
	setY: function(yPos) { this.y = yPos; },
	getY: function() { return this.y; },
	incY: function(inc) { this.y += inc; },
	decY: function(dec) { this.y -= dec; },
	
	setSpeed: function(s) { this.speed = s; },
	getSpeed: function() { return this.speed; },
	incSpeed: function(inc) { this.speed += inc; },
	decSpeed: function(dec) { this.speed -= dec; },

	getSprite: function() { return this.sprite; },
	
	setFrame: function(f) { this.frame = f; },
	getFrame: function() { return this.frame; },
	
	fly: function() {
		this.incSpeed(windSpeed / 100);
		this.incX(this.getSpeed());
	}
}

/****
*  PowerUp
*
****/
PowerUp = function(sp) {
	this.base = FlyingObject;
	
	this.sprite = sp;
	var xPos = getRandom(0, width-40);
	var yPos = getRandom(-100 , -60);
		
	var frame = 0;
	var speed = 0;
	//var t = 0;
	
	this.base(xPos, yPos, speed, frame);
	
	this.type = "PowerUp";
}

PowerUp.prototype = new FlyingObject();
PowerUp.prototype.constructor = PowerUp;

PowerUp.prototype = {
	setX: function(xPos) { this.x = xPos; },
	getX: function() { return this.x; },
	incX: function(inc) { this.x += inc; },
	decX: function(dec) { this.x -= dec; },
	
	setY: function(yPos) { this.y = yPos; },
	getY: function() { return this.y; },
	incY: function(inc) { this.y += inc; },
	decY: function(dec) { this.y -= dec; },

	getSprite: function() { return this.sprite; },
	
	setFrame: function(f) { this.frame = f; },
	getFrame: function() { return this.frame; },

	fly: function() {
		
	}
}

/****
*  Gegner
*
****/
Enemy = function(s) {
	this.base = FlyingObject;
	
	var yPos = getRandom(0, 300);
	var speed = s;
	var xPos;
	
	// Ermittle die Position des naechsten Objekts
	var side = getRandom(0, 1);
	
	if(side == 0) {
		xPos = 0;
	}
	else {
		xPos = width;
		speed = -speed;
	}
	
	
	this.base(xPos, yPos, speed, 0);

	this.dir = side;
}

Enemy.prototype = new FlyingObject();
Enemy.prototype.constructor = Enemy;


/****
*  Vogel
*
****/
Bird = function(sp) {
	this.base = Enemy;
	
	var speed = getRandom(3, 7);
	
	this.base(speed);
	
	this.type = "Bird";
	this.sprite = sp;
}

Bird.prototype = new Enemy();
Bird.prototype.constructor = Bird;

Bird.prototype = {
	setX: function(xPos) { this.x = xPos; },
	getX: function() { return this.x; },
	incX: function(inc) { this.x += inc; },
	decX: function(dec) { this.x -= dec; },
	
	setY: function(yPos) { this.y = yPos; },
	getY: function() { return this.y; },
	incY: function(inc) { this.y += inc; },
	decY: function(dec) { this.y -= dec; },

	setFrame: function(f) { this.frame = f; },
	getFrame: function() { return this.frame; },
	
	getSprite: function() { return this.sprite; },
	
	getSpeed: function() {return this.speed; },
	
	getDir: function() { return this.dir; },
	
	fly: function() {
		this.incX(this.getSpeed());
		
		var xPos = Math.round(this.getX());
		var dir = this.getDir();
		//this.setFrame(0);
		
		if((xPos % 50) >= 0 && (xPos % 50) <= 10) {
			if(dir == 1)
				this.setFrame(0);
			else
				this.setFrame(2);
				
			this.incY(3);
		}
		else {
			if(dir == 1)
				this.setFrame(1);
			else
				this.setFrame(3);
				
			this.decY(3);
		}
		
		//console.log("X: " + this.x + " xPos: " + xPos + " Y: " + this.y + " Frame: " + this.getFrame() + " Speed: " + this.getSpeed());
	}
}

/****
*  Flugzeug
*
****/
Plane = function(sp) {
	this.base = Enemy;
	
	var speed = getRandom(10, 15);
	
	this.base(speed);
	
	this.type = "Plane";
	this.sprite = sp;
}

Plane.prototype = new Enemy();
Plane.prototype.constructor = Plane;

Plane.prototype = {
	setX: function(xPos) { this.x = xPos; },
	getX: function() { return this.x; },
	incX: function(inc) { this.x += inc; },
	decX: function(dec) { this.x -= dec; },
	
	setY: function(yPos) { this.y = yPos; },
	getY: function() { return this.y; },
	incY: function(inc) { this.y += inc; },
	decY: function(dec) { this.y -= dec; },

	setFrame: function(f) { this.frame = f; },
	getFrame: function() { return this.frame; },
	
	getSprite: function() { return this.sprite; },
	
	getSpeed: function() {return this.speed; },
	
	getDir: function() { return this.dir; },
	
	fly: function() {
		this.incX(this.getSpeed());
		
		var xPos = Math.round(this.getX());
		var dir = this.getDir();
		
		if((xPos % 15) >= 0 && (xPos % 15) <= 10) {
			if(dir == 1)
				this.setFrame(0);
			else
				this.setFrame(2);
				
			this.incY(3);
		}
		else {
			if(dir == 1)
				this.setFrame(1);
			else
				this.setFrame(3);
				
			this.decY(3);
		}
	}
}


/****
*  Ballon
*
****/
Balloon = function(x, y, horSpeed, vertSpeed, f) {	
	this.base = FlyingObject;
	this.base(x, y, horSpeed, f);

	this.vertSpeed = vertSpeed;
	this.fligtAttitude = 0;
	this.tankStatus = 420;
	this.timer = 0;
	this.heightBarFrame = 3;
	this.type = "Balloon";
}

Balloon.prototype = new FlyingObject();
Balloon.prototype.constructor = Balloon;

Balloon.prototype = {
	setX: function(xPos) { this.x = xPos; },
	getX: function() { return this.x; },
	incX: function(inc) { this.x += inc; },
	decX: function(dec) { this.x -= dec; },
	
	setY: function(yPos) { this.y = yPos; },
	getY: function() { return this.y; },
	incY: function(inc) { this.y += inc; },
	decY: function(dec) { this.y -= dec; },
	
	setHorSpeed: function(s) { this.s = s; },
	getHorSpeed: function() { return this.s; },
	incHorSpeed: function(inc) { this.s += inc; },
	decHorSpeed: function(dec) { this.s -= dec; },
	
	setVertSpeed: function(s) { this.vertSpeed = s; },
	getVertSpeed: function() { return this.vertSpeed; },
	incVertSpeed: function(inc) { this.vertSpeed += inc; },
	decVertSpeed: function(dec) { this.vertSpeed -= dec; },
	
	setFrame: function(f) { this.frame = f; },
	getFrame: function() { return this.frame; },
	
	setHeightBarFrame: function(f) { this.heightBarFrame = f; },
	getHeightBarFrame: function() { return this.heightBarFrame; },
	
	setFlightAttitude: function(val) { this.flightAttitude = val; },
	getFlightAttitude: function() { return this.flightAttitude; },
	incFlightAttitude: function(inc) { this.flightAttitude += inc; },
	decFlightAttitude: function(dec) { this.flightAttitude -= dec; },
	
	setTankStatus: function(val) { this.tankStatus = val; },
	getTankStatus: function() { return this.tankStatus; },
	incTankStatus: function(inc) { this.tankStatus += inc; },
	decTankStatus: function(dec) { this.tankStatus -= dec; },
	
	getSprite: function() { return this.sprite; },
	
	derate: function() {
		if(this.vertSpeed <= -20)
			this.vertSpeed = -20;
		if(this.vertSpeed >= 20)
			this.vertSpeed = 20;
	},
	
	checkAttitude: function() {
		var nextLevelFlag = false;
		
		// Falls die Y Position des Ballons < 200 ist wird der Ballon nicht mehr bewegt nur die Objekte
		if(this.y > 200) {
			this.incY(this.vertSpeed);
		}
		
		// Falls die Flughoehe kleiner Null ist nicht mehr sinken
		if(this.flightAttitude < 0) {
			this.setFlightAttitude(0);
			this.setVertSpeed(0);
		}
		
		// Falls die Flughoehe die maximale Level Hoehe erreicht
		if(this.flightAttitude > maxLvlHeight) {
			this.setFlightAttitude(maxLvlHeight);
			this.setVertSpeed(0);
			
			// lade naechstes Level
			nextLevelFlag = true;
		}
		
		this.setFlightAttitude(Math.round(this.flightAttitude));
		
		// verringere geschwindigkeit jede Sekunde um 1 (Schwerkraft)
		if(this.timer == 10) {
			if(this.vertSpeed >= -20 && this.vertSpeed <= 20) {
				this.incVertSpeed(1);
			}
			
			this.timer = 0;
			this.setFrame(0);
			
			this.setHeightBarFrame(3);
		}
		
		this.timer++;
		return nextLevelFlag;
	},
	
	checkBoundary: function() {
		// Beende Bewegung wenn Ballon am Rand ist
		if(this.x <= 0) { 						// linker Rand
			if(this.s < 0) {
				this.setHorSpeed(0);
				this.setX(0);
			}
		}
		else if((this.x + 124) >= width) {		// rechter Rand
			if(this.s > 0) {
				this.setHorSpeed(0);
				this.setX((width - 124));
			}
		}
	},
	
	getTankFrame: function() {
		var frame = 0;
		var tankStatus = this.tankStatus;
		
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
		
		return frame;
	},
	
	collide: function() {
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
}

function getRandom(a, b) {
	var z = Math.random();
	z *= (b - a + 1);
	z += a;
	return (Math.floor(z));
}

