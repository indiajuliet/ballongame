function Sound(){
  this.ignite=new Audio('audio/ignite.wav');
  this.levelSound;
}

Sound.prototype = {

  setLevelSound:	function(val) {this.levelSound=new Audio(val);},
  setEnemyAppear: 	function(val) {this.enemyAppear=new Audio(val);},
  setEnemyHit:		function(val) {this.enemyHit=new Audio(val);},
  
  
}