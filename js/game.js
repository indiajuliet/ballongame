
// width of the canvas
var width = 320;  

// height of the canvas  
var height = 500;  

// game Loop
var gLoop;
  
//canvas itself  
var c = document.getElementById('c');   
   
// and two-dimensional graphic context of the  
// canvas, the only one supported by all   
// browsers for now  
var ctx = c.getContext('2d');  
  
// setting canvas size  
c.width = width;  
c.height = height;  


var clear = function() {  
	//set active color to #d0e... (nice blue)  
	//UPDATE - as 'Ped7g' noticed - using clearRect() in here is useless, we cover whole surface of the canvas with blue rectangle two lines below. I just forget to remove that line  
	//ctx.clearRect(0, 0, width, height);  
	//clear whole surface
	ctx.fillStyle = '#d0e7f9';  
	
	//start drawing
	ctx.beginPath();  
	
	//draw rectangle from point (0, 0) to  
	//(width, height) covering whole canvas 
	ctx.rect(0, 0, width, height);  
 
	//end drawing
	ctx.closePath();  
  
	//fill rectangle with active  
	//color selected before
	ctx.fill();  
}

var howManyCircles = 10, circles = [];  
  
for (var i = 0; i < howManyCircles; i++) {
	//add information about circles into  
	//the 'circles' Array. It is x & y positions,   
	//radius from 0-100 and transparency   
	//from 0-0.5 (0 is invisible, 1 no transparency)
	circles.push([Math.random() * width, Math.random() * height, Math.random() * 100, Math.random() / 2]);
}	
  
  
var DrawCircles = function(){  
	for (var i = 0; i < howManyCircles; i++) { 
		//white color with transparency in rgba
		ctx.fillStyle = 'rgba(255, 255, 255, ' + circles[i][3] + ')';  
  
		ctx.beginPath();  
	
		//arc(x, y, radius, startAngle, endAngle, anticlockwise)  
		//circle has always PI*2 end angle
		ctx.arc(circles[i][0], circles[i][1], circles[i][2], 0, Math.PI * 2, true);  
  
		ctx.closePath();  
		ctx.fill();  
	}  
};  

var MoveCircles = function(deltaY){  
	for (var i = 0; i < howManyCircles; i++) {
	//the circle is under the screen so we change  
	//informations about it
    if (circles[i][1] - circles[i][2] > height) {  
		circles[i][0] = Math.random() * width;  
		circles[i][2] = Math.random() * 100;  
		circles[i][1] = 0 - circles[i][2];  
		circles[i][3] = Math.random() / 2;  
    } 
	else {  
		//move circle deltaY pixels down  
		circles[i][1] += deltaY;  
    }  
  }  
};

var player = new (function(){  
	//create new object based on function and assign   
	//what it returns to the 'player' variable  
  
	var that = this;  
	//'that' will be the context now  
  
	//attributes  
	that.image = new Image();  
	that.image.src = "angel.png";  
	//create new Image and set it's source to the   
	//'angel.png' image I upload above  
  
	that.width = 65;  
	//width of the single frame  
	that.height = 95;  
	//height of the single frame  
  
	that.X = 0;  
	that.Y = 0;  
	//X&Y position  
  
	//methods   
	that.setPosition = function(x, y){  
	that.X = x;  
	that.Y = y;  
}  

	that.draw = function(){  
		try {  
			ctx.drawImage(that.image, 0, 0, that.width, that.height, that.X, that.Y, that.width, that.height);  
			//cutting source image and pasting it into destination one, drawImage(Image Object, source X, source Y, source Width, source Height, destination X (X position), destination Y (Y position), Destination width, Destination height)  
		} catch (e) {  
			//sometimes, if character's image is too big and will not load until the drawing of the first frame, Javascript will throws error and stop executing everything. To avoid this we have to catch an error and retry painting in another frame. It is invisible for the user with 50 frames per second.  
        }  
    }  
})();  
//we immediately execute the function above and   
//assign its result to the 'player' variable  
//as a new object   
  
player.setPosition(~~((width-player.width)/2),  ~~((height - player.height)/2));  
//our character is ready, let's move it   
//to the center of the screen,  
//'~~' returns nearest lower integer from  
//given float, equivalent of Math.floor()

var GameLoop = function(){  
	clear();  
	//MoveCircles(5);  
	//DrawCircles();  
	gLoop = setTimeout(GameLoop, 1000 / 50);  
}  
GameLoop();  