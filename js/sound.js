function Sound(){
  this.ignite=new Audio('audio/ignite.ogg');
  this.fuelWarning=new Audio('audio/fuel_warning.ogg');
  this.menuSound=new Audio('audio/menusound.ogg');
  this.menuSound.loop=true;
  this.levelSound=new Audio();
}

Sound.prototype = {
  setLevelSound:	function(val) {this.levelSound=new Audio(val);},

 setVolume:		function(val) {	this.ignite.volume=val;
					this.levelSound.volume=val;
					this.menuSound.volume=val;

				      }
}