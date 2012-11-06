/**
 * 
 */
function LevelManager()
{
	this.levelFile;
	this.currentLevel = 0;
	this.levels;
	this.xml;
}

// Initialisation
LevelManager.prototype.init = function(file) {
	this.levelFile = file;
	this.currentLevel = 0;
	
	// lade Level Datei	
	this.xml = this.getXml(file);
	
	// lade das erste Level
	this.loadLevel(this.currentLevel);
}

// Lade XML mit der uebergebenen URL
LevelManager.prototype.getXml = function(url) {
    var result = null;
	$.ajax({
		url: url,
		type: 'get',
		dataType: 'xml',
		async: false,
		success: function(data) {
			result = data;
		}
	});
    return result;
}

// Gebe die aktuelle Level ID zurueck
LevelManager.prototype.getCurrentLevelId = function() {
	return this.currentLevel;
}

// Lade das uebergebene Level
LevelManager.prototype.loadLevel = function(level) {
	$(this.xml).find('level').each(function(){
		var id = $(this).attr('id');
		
		if(id == level) {
			var title = $(this).find('title').text();
			var color = $(this).find('color').text();
			var lvlHeight = $(this).find('lvlHeight').text();
			
			// setze die Hintergrundfarbe
			if(color == null || color == "")
				SKY_COLOR = STD_SKY_COLOR;
			else
				SKY_COLOR = color;
			
			// setze maximale Level Hoehe
			maxLvlHeight = lvlHeight;
			
			alert(title);
		}
	});
}

// Naechstes Level
LevelManager.prototype.nextLevel = function() {
	this.currentLevel++;
	this.loadLevel(this.currentLevel);
}

// Vorherriges Level
LevelManager.prototype.previousLevel = function() {
	this.currentLevel--;
	this.loadLevel(this.currentLevel);
}

// Lade das Level neu
LevelManager.prototype.reloadLevel = function() {
	// TODO
}

// Setze die Level zurueck
LevelManager.prototype.reset = function() {
	this.currentLevel = 0;
}