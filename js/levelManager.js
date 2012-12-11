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
	
	this.spriteRowHeights = [0,			// Levelhintergrund 
							 1301, 		// Ballon
							 1518, 		// Wolke
							 1619, 		// Vogel
							 1670, 		// Tankstatus
							 1710, 		// PowerUp
							 1771, 		// Flugzeug
							 1897 		// Asteroid
							 ];
}

// Initialisation
LevelManager.prototype.init = function(file) {
	this.levelFile = file;
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
	this.currentLevel = lvl;
	
	var enemies = {};
	var objects = {};
	var powerUps = {};
	var attr = {}; 
	
	$(this.xml).find('level').each(function(){
		var id = $(this).attr('id');
		
		if(id == lvl) {
			Level.prototype.setLevelNr(id);
			Level.prototype.setColor($(this).find('color').text());
			Level.prototype.setTitle($(this).find('title').text());
			Level.prototype.setBgPicture($(this).find('picture').text());
			Level.prototype.setLvlHeight($(this).find('lvlHeight').text());
			Level.prototype.setMaxWindStrenght($(this).find('maxWindStrenght').text());
			Level.prototype.setLevelSound($(this).find('music').text());
			
			// Gegnerdaten sammeln
			$(this).find('enemy').each(function() {
			
				var desc = $(this).find('desc').text();	
				attr = {'width' : $(this).find('width').text(),
						'height' : $(this).find('height').text(),
						'frames' : $(this).find('frames').text().split(','),
						'row' : $(this).find('row').text(),
						'sound_appear': $(this).find('sound_appear').text(),
						'sound_hit': $(this).find('sound_hit').text()
					   };
								
				enemies[desc] = attr;
			});
			
			// Objektdaten sammeln
			$(this).find('object').each(function() {
			
				var desc = $(this).find('desc').text();	
				attr = {'width' : $(this).find('width').text(),
						'height' : $(this).find('height').text(),
						'frames' : $(this).find('frames').text().split(','),
						'row' : $(this).find('row').text()
					   };
								
				objects[desc] = attr;
			});
			
			// PowerUp-Dauten sammeln
			$(this).find('powerUp').each(function() {
			
				var desc = $(this).find('desc').text();	
				attr = {'width' : $(this).find('width').text(),
						'height' : $(this).find('height').text(),
						'frames' : $(this).find('frames').text().split(','),
						'row' : $(this).find('row').text()
					   };
								
				powerUps[desc] = attr;
			});
		}
	});
	
	var eFrames = this.calculateFrames(enemies);
	Level.prototype.setEnemyFrames(eFrames);
	
	var oFrames = this.calculateFrames(objects);
	Level.prototype.setObjectFrames(oFrames);
	
	var pFrames = this.calculateFrames(powerUps);
	Level.prototype.setPowerUpFrames(pFrames);
	
	return this.level;
}

// Berechne alle Frames anhand der gesammelten Daten
LevelManager.prototype.calculateFrames = function(data) {

	var arr = [];
	for(i in data) {
		
		var attribs = data[i];
		
		var frames = attribs['frames'];
		var width = parseInt(attribs['width']);
		var height = parseInt(attribs['height']);
		var row = parseInt(attribs['row']);
		var y = this.spriteRowHeights[row-1];
		
		var temp = [];
		for(j in frames) {
			var x = (parseInt(frames[j]) * (width + 1));
			var frame = [x, y, width, height, 0, 0, i];
			temp[j] = frame;
		}
		
		arr[i] = temp;
		
	}

	return temp;
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