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
	getMaxWindStrenght: function() { return this.maxWindStrenght; }
}
