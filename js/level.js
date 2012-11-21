function Level()
{
	this.title;
	this.bgPicture;
	/*this.bgMusic;
	this.color;
	
	this.clouds = [];
	this.powerUps = [];
	this.enemies = [];
	
	this.lvlHeight;
	this.maxWindStrength;*/
}

Level.prototype.setBgPicture = function(pic) {
	this.bgPicture = pic;
}

Level.prototype.getBgPicture = function() {
	return this.bgPicture;
}


/*
Level.prototype = {
    get title(){
        return this._title;
    },
    set title(val){
        this._title = val;
    },
	
	get bgPicture(){
        return this._bgPicture;
    },
    set bgPicture(val){
        this._bgPicture = val;
    },
	
	get bgMusic(){
        return this._bgMusic;
    },
    set bgMusic(val){
        this._bgMusic = val;
    },
	
	get color(){
        return this._color;
    },
    set color(val){
        this._color = val;
    }
};*/