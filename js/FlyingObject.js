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

Cloud = function(x, y, s, f, sp) {	
	this.base = FlyingObject;
	this.base(x, y, s, f);
}

Cloud.prototype = new FlyingObject();
Cloud.prototype.constructor = Cloud;

PowerUp = function(x, y, s, f, t, p) {
	this.base = FlyingObject;
	this.base(x, y, s, f);
	
	this.type = t;
	this.pic = p;
}

PowerUp.prototype = new FlyingObject();
PowerUp.prototype.constructor = PowerUp;

Enemy = function(x, y, s, f, d) {
	this.base = FlyingObject;
	this.base(x, y, s, f);
	
	this.dir = d; 
}

Enemy.prototype = new FlyingObject();
Enemy.prototype.constructor = Enemy;


