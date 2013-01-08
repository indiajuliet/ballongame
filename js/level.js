function Level()
{
	this.levelNr;
	this.title;
	this.bgPicture;
	this.bgMusic;
	this.color;
	
	this.clouds = [];
	this.powerUps = [];
	this.enemies = [];
	
	this.lvlHeight;
	this.maxWindStrenght;
	this.enemyFrames;
	this.objectFrames;
	this.powerUpFrames;
	
	this.levelSound;
	this.enemyAppear;
	this.enemyHit;
	this.powerup;
}

Level.prototype = {
	setLevelNr: function(val) { this.levelNr = val; },
	getLevelNr: function() { return this.levelNr; },

	setTitle: function(val) { this.title = val; },
	getTitle: function() { return this.title; },
	
	setBgPicture: function(val) { this.bgPicture = val; },
	getBgPicture: function() { return this.bgPicture; },
	
	setBgMusic: function(val) { this.bgMusic = val; },
	getBgMusic: function() { return this.bgMusic; },
	
	setColor: function(val) { this.color = val; },
	getColor: function() { return this.color; },
	
	setLvlHeight: function(val) { this.lvlHeight = val; },
	getLvlHeight: function() { return this.lvlHeight; },
	
	setMaxWindStrenght: function(val) { this.maxWindStrenght = val; },
	getMaxWindStrenght: function() { return this.maxWindStrenght; },
	
	setEnemyFrames: function(val) { this.enemyFrames = val; },
	getEnemyFrames: function() { return this.enemyFrames; },
	
	getEnemyFrame: function(index) { return this.enemyFrames[index]; },
	
	setObjectFrames: function(val) { this.objectFrames = val; },
	getObjectFrames: function() { return this.objectFrames; },
	
	setPowerUpFrames: function(val) { this.powerUpFrames = val; },
	getPowerUpFrames: function() { return this.powerUpFrames; },
	
	setLevelSound:	function(val) {this.levelSound = val;},
	getLevelSound:	function() {return this.levelSound;},
	
	setEnemyAppear:	function(val) {this.enemyAppear = val;},
	getEnemyAppear:	function() {return this.enemyAppear;},

	setEnemyHit:	function(val) {this.enemyHit = val;},
	getEnemyHit:	function() {return this.enemyHit;},

	setPowerup:	function(val) {this.Powerup = val;},
	getPowerup:	function() {return this.Powerup;},

}