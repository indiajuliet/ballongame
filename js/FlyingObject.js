/******
* Fliegendes Objekt
*
*******/

FlyingObject = function(x, y, s, f, sp, w, h) {
	this.x = x;
	this.y = y;
	this.speed = s;
	this.frame = f;
	this.sprite = sp;
	this.width = w;
	this.height = h;
	this.defunct = false;
	
	this.setX = function(xPos) { this.x = xPos; };
	this.getX = function() { return this.x; };
	this.incX = function(inc) { this.x += inc; };
	this.decX = function(dec) { this.x -= dec; };
	
	this.setY = function(yPos) { this.y = yPos; };
	this.getY = function() { return this.y; };
	this.incY = function(inc) { this.y += inc; };
	this.decY = function(dec) { this.y -= dec; };
	
	this.setSpeed = function(s) { this.speed = s; };
	this.getSpeed = function() { return this.speed; };
	this.incSpeed = function(inc) { this.speed += inc; };
	this.decSpeed = function(dec) { this.speed -= dec; };
	
	this.setSprite = function(val) { this.sprite = val; };
	this.getSprite = function() { return this.sprite; };

	this.setFrame = function(f) { this.frame = f; };
	this.getFrame = function() { return this.frame; };
	
	this.setWidth = function(val) { this.width = val; };
	this.getWidth = function() { return this.width; };
	
	this.setHeight = function(val) { this.height = val; };
	this.getHeight = function() { return this.height; };
	
	this.setDefunct = function() { this.defunct = true; };
	
	this.init = function() {
		var sprite = this.getSprite();
		var frame = this.getFrame();
		this.setWidth(sprite.getWidth(frame));
		this.setHeight(sprite.getHeight(frame));
	};
}


/****
*  Wolke
*
****/
Cloud = function(sp) {	
	this.base = FlyingObject;
	
	this.type = "Cloud";
	
	var xPos = getRandom(-100, width + 100);
	var yPos = getRandom(-100, height);
	var speed = windSpeed;
	
	// Ermittle die Position des naechsten Objekts
	if(xPos >= 0)
		yPos = -100;
	else if(yPos >= 0)
		xPos = -100;
	
	var frame = getRandom(0,2);
	
	this.base(xPos, yPos, speed, frame, sp);
}

Cloud.prototype = new FlyingObject();
Cloud.prototype.constructor = Cloud;

Cloud.prototype = {
	fly: function() {
		this.incSpeed(windSpeed / 100);
		this.incX(this.getSpeed());
	}
}

/****
*  PowerUp
*
****/
PowerUp = function(xPos, yPos, speed, frame, sp) {
	this.base = FlyingObject;

	
	this.base(xPos, yPos, speed, frame, sp);

	this.type = "PowerUp";
}

PowerUp.prototype = new FlyingObject();
PowerUp.prototype.constructor = PowerUp;


/****
*  Tank
*
****/
Tank = function(sp) {
	this.base = PowerUp;
	
	var xPos = getRandom(0, width-40);
	var yPos = getRandom(-100 , -60);
		
	var frame = 0;
	var speed = 0;
	
	this.base(xPos, yPos, speed, frame, sp);
	this.init();
	
	this.type = "Tank";
	
	this.soundHit = new Audio(sp.getSoundHit());
}

Tank.prototype = new PowerUp();
Tank.prototype.constructor = Tank;

Tank.prototype = {
	
	
	fly: function() {
		
	}
}

/****
*  Nitro
*
****/
Nitro = function(sp) {
	this.base = PowerUp;
	
	var xPos = getRandom(0, width-40);
	var yPos = getRandom(-100 , -60);
		
	var frame = 1;
	var speed = 0;
	
	this.base(xPos, yPos, speed, frame, sp);
	this.init();
	
	this.type = "Nitro";

	this.soundHit = new Audio(sp.getSoundHit());
	
}

Nitro.prototype = new PowerUp();
Nitro.prototype.constructor = Nitro;

Nitro.prototype = {
	fly: function() {
		
	}
}

/****
*  Gegner
*
****/
Enemy = function(s, sp) {
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
	
	this.base(xPos, yPos, speed, 0, sp);

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
	
	
	this.base(speed, sp);
	this.init();
	
	this.type = "Bird";
	this.flyAwayFlag = false;
	this.soundHit = new Audio(sp.getSoundHit());

}

Bird.prototype = new Enemy();
Bird.prototype.constructor = Bird;

Bird.prototype = {
	getDir: function() { return this.dir; },
	setDir: function(d) { this.dir = d; },
	
	setFlyAwayFlag: function() { this.flyAwayFlag = true; },
	getFlyAwayFlag: function() { return this.flyAwayFlag; },
	
	fly: function() {
		this.incX(this.getSpeed());
		
		var xPos = Math.round(this.getX());
		var dir = this.getDir();
		
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
	},
	
	changeDirection: function() {
		var newDir = this.getDir() == 0 ? 1 : 0;
		this.setDir(newDir);
		this.setSpeed(-this.getSpeed());
		return newDir;
	}, 
	
	flyAway: function() {
		var dir = this.changeDirection();
		if(dir)
			this.decSpeed(10);
		else
			this.incSpeed(10);
	}
}

/****
*  Flugzeug
*
****/
Plane = function(sp) {
	this.base = Enemy;
	var speed = getRandom(10, 15);
	this.base(speed, sp);
	this.type = "Plane";
	this.init();
	this.flyAwayFlag = false;
	
	this.soundHit = new Audio(sp.getSoundHit());

}

Plane.prototype = new Enemy();
Plane.prototype.constructor = Plane;

Plane.prototype = {
	getDir: function() { return this.dir; },
	setDir: function(d) { this.dir = d; },
	
	setFlyAwayFlag: function() { this.flyAwayFlag = true; },
	getFlyAwayFlag: function() { return this.flyAwayFlag; },
	
	fly: function() {
		this.incX(this.getSpeed());
		
		var xPos = Math.round(this.getX());
		var dir = this.getDir();
		
		if((xPos % 20) >= 0 && (xPos % 20) <= 5) {
			if(dir == 1)
				this.setFrame(3);
			else
				this.setFrame(1);
				
			this.incY(3);
		}
		else {
			if(dir == 1)
				this.setFrame(2);
			else
				this.setFrame(0);
				
			this.decY(3);
		}
	},
	
	changeDirection: function() {
		var newDir = this.getDir() == 0 ? 1 : 0;
		this.setDir(newDir);
		this.setSpeed(-this.getSpeed());
		return newDir;
	}, 
	
	flyAway: function() {
		//Do Nothing
	}
}

/****
*  Asteroid
*
****/
Asteroid = function(sp) {
	this.base = Enemy;
	
	var speed = getRandom(3, 7);

	this.base(speed, sp);
	this.init();
	
	this.type = "Asteroid";
	this.flyAwayFlag = false;
	this.angle;
	this.degree;
	this.vx;
	this.vy;
	
	this.setFlight();
	
	this.soundHit = new Audio(sp.getSoundHit());
}

Asteroid.prototype = new Enemy();
Asteroid.prototype.constructor = Asteroid;

Asteroid.prototype = {
	getDir: function() { return this.dir; },
	setDir: function(d) { this.dir = d; },
	
	getAngle: function() { return this.angle; },
	setAngle: function(val) { this.angle = val; },
	
	getDegree: function() { return this.degree; },
	setDegree: function(val) { this.degree = val; },
	
	setFlyAwayFlag: function() { this.flyAwayFlag = true; },
	getFlyAwayFlag: function() { return this.flyAwayFlag; },
	
	getVX: function() { return this.vx; },
	setVX: function(val) { this.vx = val; },
	
	getVY: function() { return this.vy; },
	setVY: function(val) { this.vy = val; },
	
	setFlight: function() {
		var dir = this.getDir();
		
		if(dir == 1) {
			this.setX(getRandom((220-this.getWidth()), width));
			this.setY(-100);
			var d = getRandom(7, 8);
			this.setFrame(d-7);
		}
		else {
			this.setX(getRandom(0, 220));
			this.setY(-100);
			var d = getRandom(10, 11);
			this.setFrame(d-7-1);
		}
		
		this.setDegree(d * 30);
		this.setAngle(this.getDegree() * Math.PI / 180);
		var angle = this.getAngle();
		this.setVX(this.getSpeed() * Math.cos(angle));
		this.setVY(this.getSpeed() * Math.sin(angle));
	},
	
	fly: function() {
		// Pathfinder
	
		var dir = this.getDir();
		
		if(dir == 1) {
			this.decX(this.getVX());
			this.incY(this.getVY());
		}
		else {
			this.incX(this.getVX());
			this.decY(this.getVY());
		}
		
		//console.log("X: " + this.x + " xPos: " + xPos + " Y: " + this.y + " Frame: " + this.getFrame() + " Speed: " + this.getSpeed());
	},
	
	changeDirection: function() {
		var newDir = this.getDir() == 0 ? 1 : 0;
		this.setDir(newDir);
		//this.setSpeed(-this.getSpeed());
		return newDir;
	}, 
	
	flyAway: function() {
		var dir = this.changeDirection();
		
	}
}

/****
*	Satellite
*
****/
Satellite = function(sp) {
	this.base = Enemy;
	var speed = getRandom(10, 15);
	this.base(speed, sp);
	this.type = "Satellite";
	this.init();
	this.flyAwayFlag = false;
	
	this.soundHit = new Audio(sp.getSoundHit());
	
}

Satellite.prototype = new Enemy();
Satellite.prototype.constructor = Satellite;

Satellite.prototype = {
	getDir: function() { return this.dir; },
	setDir: function(d) { this.dir = d; },
	
	setFlyAwayFlag: function() { this.flyAwayFlag = true; },
	getFlyAwayFlag: function() { return this.flyAwayFlag; },
	
	fly: function() {
		this.incX(this.getSpeed());
		
		var xPos = Math.round(this.getX());
		var dir = this.getDir();
		
		if((xPos % 20) >= 0 && (xPos % 20) <= 5) {
			if(dir == 1)
				this.setFrame(3);
			else
				this.setFrame(1);
				
			this.incY(3);
		}
		else {
			if(dir == 1)
				this.setFrame(2);
			else
				this.setFrame(0);
				
			this.decY(3);
		}
	},
	
	changeDirection: function() {
		var newDir = this.getDir() == 0 ? 1 : 0;
		this.setDir(newDir);
		this.setSpeed(-this.getSpeed());
		return newDir;
	}, 
	
	flyAway: function() {
		var dir = this.changeDirection();
		if(dir)
			this.decSpeed(10);
		else
			this.incSpeed(10);
	}
}

/****
*  Ufo
*
****/
Ufo = function(sp) {
	this.base = Enemy;
	var speed = getRandom(10, 15);
	this.base(speed, sp);
	this.type = "Ufo";
	this.init();
	this.flyAwayFlag = false;
	
	this.soundHit = new Audio(sp.getSoundHit());
	
}

Ufo.prototype = new Enemy();
Ufo.prototype.constructor = Ufo;

Ufo.prototype = {
	getDir: function() { return this.dir; },
	setDir: function(d) { this.dir = d; },
	
	setFlyAwayFlag: function() { this.flyAwayFlag = true; },
	getFlyAwayFlag: function() { return this.flyAwayFlag; },
	
	fly: function() {

		var xPos = Math.round(this.getX());
		this.incX(this.getSpeed());
		var dir = this.getDir();

		if((xPos % 200) >= 0 && (xPos % 200) <= 50) {
			if(dir == 1) {
				this.setFrame(1);
			}
			else {
				this.setFrame(0);
			}

			this.incY(5);
		}
		else {
			if(dir == 1) {
				this.setFrame(1);
			}
			else {
				this.setFrame(0);
			}

			this.decY(5);
		}

	},
	
	changeDirection: function() {
		var newDir = this.getDir() == 0 ? 1 : 0;
		this.setDir(newDir);
		this.setSpeed(-this.getSpeed());
		return newDir;
	}, 
	
	flyAway: function() {
		var dir = this.changeDirection();
		if(dir)
			this.decSpeed(10);
		else
			this.incSpeed(10);
	}
}

/****
*  Nyancat
*
****/
Nyancat = function(sp) {
	this.base = Enemy;
	var speed = getRandom(10, 15);
	this.base(speed, sp);
	this.type = "Nyancat";
	this.init();
	this.flyAwayFlag = false;
	
	this.soundHit = new Audio(sp.getSoundHit());
	
}

Nyancat.prototype = new Enemy();
Nyancat.prototype.constructor = Nyancat;

Nyancat.prototype = {
	getDir: function() { return this.dir; },
	setDir: function(d) { this.dir = d; },
	
	setFlyAwayFlag: function() { this.flyAwayFlag = true; },
	getFlyAwayFlag: function() { return this.flyAwayFlag; },
	
	fly: function() {
		this.incX(this.getSpeed());
		
		var xPos = Math.round(this.getX());
		var dir = this.getDir();
		
		if((xPos % 100) >= 0 && (xPos % 100) <= 5) {
			if(dir == 1)
				this.setFrame(1);
			else
				this.setFrame(0);
				
			this.incY(5);
		}
		else {
			if(dir == 1)
				this.setFrame(1);
			else
				this.setFrame(0);
				
			this.decY(5);
		}
	},
	
	changeDirection: function() {
		var newDir = this.getDir() == 0 ? 1 : 0;
		this.setDir(newDir);
		this.setSpeed(-this.getSpeed());
		return newDir;
	}, 
	
	flyAway: function() {
		var dir = this.changeDirection();
		if(dir)
			this.decSpeed(10);
		else
			this.incSpeed(10);
	}
}

/****
*  Ballon
*
****/
Balloon = function(x, y, horSpeed, vertSpeed, f) {	
	this.base = FlyingObject;
	
	this.base(x, y, horSpeed, f);

	this.type = "Balloon";
	this.width = 124;
	this.height = 216;
	this.vertSpeed = vertSpeed;
	this.fligtAttitude = 0;
	this.tankStatus = 420;
	this.timer = 0;
	this.heightBarFrame = 3;
	this.deration = 20;
	
}

Balloon.prototype = new FlyingObject();
Balloon.prototype.constructor = Balloon;

Balloon.prototype = {
	setVertSpeed: function(s) { this.vertSpeed = s; },
	getVertSpeed: function() { return this.vertSpeed; },
	incVertSpeed: function(inc) { this.vertSpeed += inc; },
	decVertSpeed: function(dec) { this.vertSpeed -= dec; },
	
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
		if(this.vertSpeed <= -this.deration)
			this.vertSpeed = -this.deration;
		if(this.vertSpeed >= this.deration)
			this.vertSpeed = this.deration;
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
			//nextLevelFlag = true;
			pauseGame();
			setTimeout(function() {
				$.mobile.changePage("#lvlDone", { transition: "slideup"} )
			}, 3000);
			
		}
		
		this.setFlightAttitude(Math.round(this.flightAttitude));
		
		// verringere geschwindigkeit jede Sekunde um 1 (Schwerkraft)
		if(this.timer == 10) {
			if(this.vertSpeed >= -20 && this.vertSpeed <= 20 && this.flightAttitude > 0) {
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
			if(this.speed < 0) {
				this.setSpeed(0);
				this.setX(0);
			}
		}
		else if((this.x + 124) >= width) {		// rechter Rand
			if(this.speed > 0) {
				this.setSpeed(0);
				this.setX((width - 124));
			}
		}
	},
	
	getTankFrame: function() {
		var frame = 0;
		var tankStatus = this.tankStatus;
		
		// Hole die richtige Tankanzeige, entsprechend dem aktuellen Status			
		if (tankStatus <= 0){
			frame = 4;
		}
		if (tankStatus >= 0 && tankStatus < 100){
			frame = 3;
		}
		if (tankStatus >= 100 && tankStatus < 200){
			frame = 2;
		}
		if (tankStatus >= 200 && tankStatus < 300){
			frame = 1;
		} 
		if (tankStatus >= 300){
			frame = 0;
		}
		
		return frame;
	},
	
	// Kollisionsverarbeitung
	checkCollisions: function(object) {
		var balloonX = this.getX();
		var balloonY = this.getY();
		var objectX = object.getX();
		var objectY = object.getY();
		var objectWidth = object.getWidth();
		var objectHeigth = object.getHeight();
		
		if(balloonX + this.width >= objectX && balloonX <= objectX + objectWidth  && balloonY + this.height >= objectY && balloonY <= objectY + objectHeigth) {
			var offsetX, offsetY, speedOffset;
			
			if(object instanceof Bird) {
				offsetX = 20;
				offsetY = 5;
				speedOffset = 3;

				speedOffset = 5;
				if(PlaySound)
				  object.soundHit.play();

			}
			
			else if(object instanceof Plane) {
				offsetX = 5;
				offsetY = 35;
				speedOffset = 1;
				if(PlaySound)
				  object.soundHit.play();
			}
			
			else if(object instanceof Asteroid) {
				offsetX = 5;
				offsetY = 20;
				speedOffset = 1;
				if(PlaySound)
				  object.soundHit.play();
			}
			
			else if(object instanceof Satellite) {
				offsetX = 5;
				offsetY = 5;
				speedOffset = 8;
				if(PlaySound)
				  object.soundHit.play();
			}
			
			else if(object instanceof Ufo) {
				offsetX = 30;
				offsetY = -5;
				speedOffset = 8;
				if(PlaySound)
				  object.soundHit.play();
			}
			
			else if(object instanceof Nyancat) {
				offsetX = 10;
				offsetY = 10;
				speedOffset = 10;
				if(PlaySound)
				  object.soundHit.play();
			}
			
			else if(object instanceof Tank) {
				if (this.getTankFrame() != 0)
					this.incTankStatus(100);
				object.setDefunct();
				if(PlaySound)
				  object.soundHit.play();
			}
			
			else if(object instanceof Nitro) {
				upSpeed = 10;
				this.deration = 50;
				this.incTankStatus(200);
				
				object.setDefunct();
				if(PlaySound)
				  object.soundHit.play();
			}
						
			if (!(object instanceof Tank) && !(object instanceof Nitro)){
				if (object.getDir() == 1){
					if (balloonX + this.width + 20 < width-5)
						this.incX(offsetX);
				} else {
					if (balloonX - 20 > 5)
						this.decX(offsetX);			
				}
				
				if(!object.getFlyAwayFlag()) {
					object.flyAway();
					object.setFlyAwayFlag();
				}
				
				this.incVertSpeed(speedOffset);
				this.incFlightAttitude(offsetY);
				this.setHeightBarFrame(3);
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

