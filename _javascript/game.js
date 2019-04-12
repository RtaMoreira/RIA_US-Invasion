/**********************************************************
VARIABLES
**********************************************************/
var points=0;
var gravity=350;
var player1="";
var player2="";
var playing=false;
var startScreen = false;
var pause1 = 20;
var pause2 = 20;
var pause3 = 20;
var pause4 = 20;

/********************************************************
Create the canvas
********************************************************/
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 850;
canvas.id="second";
document.body.appendChild(canvas);

/********************************************************
BEFORE THE GAME
********************************************************/
var launchGame = function(){
    player1 = document.getElementById("player1").value;
    player2 = document.getElementById("player2").value;
    document.getElementById("cadreStart").style.display="none";
    startScreen=true;
}
//elements
var muskReady = false;
var muskImage = new Image();
muskImage.onload = function () {
	muskReady = true;
};
muskImage.src = "_ressources/images/elon.png";
var musk = {y:550,x:600,width:300,height:300};//x go to 300

//elements
var bezosReady = false;
var bezosImage = new Image();
bezosImage.onload = function () {
	bezosReady = true;
};
bezosImage.src = "_ressources/images/jeff.png";
var bezos = {y:550,x:-350,width:350,height:300};//x go to 0

//bubbles
var boobal1Ready = false;
var boobal1Image = new Image();
boobal1Image.onload = function () {
	boobal1Ready = true;
};
boobal1Image.src = "_ressources/images/boobal1.png";
var boobal1 = {y:300,x:-400,width:400,height:300};//x go to 110

var boobal2Ready = false;
var boobal2Image = new Image();
boobal2Image.onload = function () {
	boobal2Ready = true;
};
boobal2Image.src = "_ressources/images/boobal2.png";
var boobal2 = {y:300,x:1050,width:400,height:300};//x go to 110

/********************************************************
GAME OBJECTS
********************************************************/
//BG
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {bgReady = true;};
bgImage.src = "_ressources/images/bg.png";

// platform image
var platformReady = false;
var platformImage = new Image();
platformImage.onload = function () {
	platformReady = true;
};
platformImage.src = "_ressources/images/platform.png";
var platform = {x:270,y:650,width:150,height:10};
var platform2 = {x:270,y:400,width:150,height:10};

// red Rocket image
var redRocketReady = false;
var redRocketImage = new Image();
redRocketImage.onload = function () {
	redRocketReady = true;
};
redRocketImage.src = "_ressources/images/redRocket.png";
var redRocket = {speed: 800,y:750,x:70,width:100,height:100};
var redRocketJump =0;
var redRocketStationary=true;

/********************************************************
KEYBOARD LISTENER
********************************************************/
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
    console.log(keysDown);
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

/********************************************************
MAIN LOOP
********************************************************/
var main = function () {
	var now = Date.now();
	var delta = now - then;

    if(startScreen)
        startAnimation(delta/100);

    if(playing)
        update(delta / 1000);

	render();

	then = now;
	// Request to do this again ASAP
	requestAnimationFrame(main);
};


/********************************************************
START ANIMATION
********************************************************/
var startAnimation = function (modifier) {
    //characters appear
    if(musk.x>310)
        musk.x-=100*modifier;
    if(bezos.x<0)
        bezos.x+=100*modifier;

    //do phase 2 (bubbles)
    if(musk.x<=310 && bezos.x>=0){
        if(boobal1.x<110)
            boobal1.x+=100*modifier;
        else{
            if(pause1>0)
                pause1-=modifier;
            else{
                //disapear text1 and appear text2
                if(boobal2.x>110)
                    boobal2.x-=100*modifier;
                boobal1.y-=100*modifier;
            }
        }
    }
};
/********************************************************
UPFATE GAME OBJECTS WHILE PLAYING
********************************************************/
var update = function (modifier) {
    //if up key is pressed and rocket is stationary, go up 50
    if (38 in keysDown) {
		if (redRocketStationary){
            redRocketJump=20;
            redRocketStationary=false;
        }
	}

    if(!redRocketStationary){
        //go left
        if (37 in keysDown) {
            redRocket.x -= redRocket.speed/2 * modifier;
        }

        //go right
        if (39 in keysDown) {
            redRocket.x += redRocket.speed/2 * modifier;
        }
    }

    //jump or fall or stay on platform
    if(redRocketJump>0){
        redRocket.y -= redRocket.speed * modifier * redRocketJump/10;
        redRocketJump--;
    }
    else{
        if(redRocketStationary)
            redRocket.y=redRocket.y;
        else{
            redRocket.y += gravity * modifier;
        }
    }

    // is it in a platform
	if ((touching(platform,redRocket) ||
         touching(platform2,redRocket))
        && redRocketJump==0) {
		redRocketStationary=true;
	}
};

/********************************************************
TEST IF ROCKET IS TOUCHIN PLATFORM
********************************************************/
var touching = function(platform,redrocket){
    if(redRocket.y+redRocket.height>=platform.y-3
        && redRocket.y+redRocket.height<=platform.y+3
        && redRocket.x+redRocket.width>platform.x
        && redRocket.x<platform.x+150)
        return true;
}

/********************************************************
DRAW EVERYTHING
********************************************************/
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

    if (platformReady){
     ctx.drawImage(platformImage,platform.x,platform.y,platform.width,platform.height);
    ctx.drawImage(platformImage,platform2.x,platform2.y,platform.width,platform.height);
    }

    if (redRocketImage){
        ctx.drawImage(redRocketImage,redRocket.x,redRocket.y,redRocket.width,redRocket.height);
    }

    if (bezosReady){
        ctx.drawImage(bezosImage,bezos.x,bezos.y,bezos.width,bezos.height);
    }
    if (muskReady){
        ctx.drawImage(muskImage,musk.x,musk.y,musk.width,musk.height);
    }
    if (boobal1Ready){
        ctx.drawImage(boobal1Image,boobal1.x,boobal1.y,boobal1.width,boobal1.height);
    }
    if (boobal2Ready){
        ctx.drawImage(boobal2Image,boobal2.x,boobal2.y,boobal2.width,boobal2.height);
    }

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText(points+" KM", 32, 32);
};

/********************************************************
Cross-browser support for requestAnimationFrame
********************************************************/
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var start = function(){

}

/********************************************************
PLAY
********************************************************/
var then = Date.now();
start();
main();