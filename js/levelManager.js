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
			/*	
			Level.prototype.color = $(this).find('color').text();
			Level.prototype.title = $(this).find('title').text();
			*/
			// setze die Hintergrundfarbe
			/*if(this.level.color == null || this.level.color == "")
				SKY_COLOR = STD_SKY_COLOR;
			else
				SKY_COLOR = color;*/
			
			// setze Hintergrundbild
			Level.prototype.setBgPicture($(this).find('picture').text());
		
			/*this.level.lvlHeight = $(this).find('lvlHeight').text();
			this.level.maxWindStrength = $(this).find('maxWindStrenght').text();	*/
			
			backgroundPic = $(this).find('picture').text();
			
			// setze maximale Level Hoehe
			maxLvlHeight = $(this).find('lvlHeight').text();
			
			// maximale Windstaerke
			maxWindStrenght = $(this).find('maxWindStrenght').text();
			
			
			/*$(this).find('cloud').each(function(){
				var id = $(this).attr('id');
				id = id++;
				var obj = "cloud" + id;
				eval(obj);
				
				obj = $(this).text();
				
				//$(cloud+(id+1)) =  $(this).text();
			});*/
		}
	});
	
	return this.level;
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

LevelManager.prototype.getCurrentLevel = function() {
	return this.level;
}