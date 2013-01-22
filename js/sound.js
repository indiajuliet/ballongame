function Sound(){
  this.ignite=new Audio('audio/ignite.wav');
  this.fuelWarning=new Audio('audio/fuel_warning.wav');
  this.menuSound=new Audio('audio/menusound.wav');
  this.menuSound.loop=true;
  this.levelSound=new Audio();
}

Sound.prototype = {

  setLevelSound:	function(val) {this.levelSound=new Audio(val);},
 // setEnemyAppear[]: 	function(val) {this.enemyAppear=new Audio(val);},
//  setEnemy2Appear: 	function(val) {this.enemy2Appear=new Audio(val);},
//  setEnemyHit:		function(val) {this.enemyHit=new Audio(val);},
//  setEnemy2Hit:		function(val) {this.enemy2Hit=new Audio(val);},
 // setPowerup:		function(val) {this.powerup=new Audio(val);},
 
 
 setVolume:		function(val) {	this.ignite.volume=val;
					//this.fuelWarning.volume=val
					this.levelSound.volume=val;
					this.menuSound.volume=val;
					//this.enemyAppear.volume=val;
					//this.enemy2Appear.volume=val;
//					this.enemyHit.volume=val;
					//this.enemy2Hit.volume=val;
					//this.powerup.volume=val;
				      }
  
  
}