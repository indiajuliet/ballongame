/**
 * 
 */
function LevelManager()
{
	this.level;
	this.levelFile;
	this.currentLevel = 0;
	this.levels;
	this.xml;
}

// Initialisation
LevelManager.prototype.init = function(file) {
	this.levelFile = file;
	this.currentLevel = 0;
	this.level = new Level();

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
LevelManager.prototype.loadLevel = function(lvl) {
	$(this.xml).find('level').each(function(){
		var id = $(this).attr('id');
		
		if(id == lvl) {
			Level.prototype.setLevelNr(id);
			Level.prototype.setColor($(this).find('color').text());
			Level.prototype.setTitle($(this).find('title').text());
			Level.prototype.setBgPicture($(this).find('picture').text());
			Level.prototype.setLvlHeight($(this).find('lvlHeight').text());
			Level.prototype.setMaxWindStrenght($(this).find('maxWindStrenght').text());
		}
	});
	
	return this.level;
}

// Naechstes Level
LevelManager.prototype.nextLevel = function() {
	this.currentLevel++;
	this.loadLevel(this.currentLevel);
	return this.getCurrentLevel();
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

LevelManager.prototype.getCurrentLevel = function() {
	return this.level;
}