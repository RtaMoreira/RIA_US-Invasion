/**********************************************************
VARIABLES
**********************************************************/
var points = 0;
var gravity = 350;
var player1 = "";
var player2 = "";
var playing = false;
var startScreen = false;
var endScreen = false;
var pause1 = 20;
var pause2 = 20;
var pause3 = 20;
var pause4 = 20;
var phase1 = false;
var paused = false;
var platforms = [];
var platformCount = 10;
var position = 0;
var palmares = [];

/********************************************************
Create the canvas
********************************************************/
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 850;
canvas.id = "second";
document.body.appendChild(canvas);

/********************************************************
BEFORE THE GAME
********************************************************/
var launchGame = function () {
    player1 = document.getElementById("player1").value;
    player2 = document.getElementById("player2").value;
    document.getElementById("cadrePlacementStart").style.display = "none";
    document.getElementById("cadrePlacement").style.display = "none";
    document.getElementById("buttonSkip").style.display = "block";
    //If we come from an other game
    document.getElementById("cadreEndgame").style.display = "none";
    startScreen = true;
    phase1 = true;
    if (localStorage.getItem("palmares") === null) { //if palmares is null we create it
        localStorage.setItem("palmares", JSON.stringify(palmares));
    }

}

//elements
var muskReady = false;
var muskImage = new Image();
muskImage.onload = function () {
    muskReady = true;
};
muskImage.src = "_ressources/images/elon.png";
var musk = {
    y: 550,
    x: 600,
    width: 300,
    height: 300
}; //x go to 300

//elements
var bezosReady = false;
var bezosImage = new Image();
bezosImage.onload = function () {
    bezosReady = true;
};
bezosImage.src = "_ressources/images/jeff.png";
var bezos = {
    y: 550,
    x: -350,
    width: 350,
    height: 300
}; //x go to 0

//bubbles
var boobal1Ready = false;
var boobal1Image = new Image();
boobal1Image.onload = function () {
    boobal1Ready = true;
};
boobal1Image.src = "_ressources/images/boobal1.png";
var boobal1 = {
    y: 300,
    x: -400,
    width: 400,
    height: 300
}; //x go to 110

var boobal2Ready = false;
var boobal2Image = new Image();
boobal2Image.onload = function () {
    boobal2Ready = true;
};
boobal2Image.src = "_ressources/images/boobal2.png";
var boobal2 = {
    y: 300,
    x: 1050,
    width: 400,
    height: 300
}; //x go to 110

var boobal3Ready = false;
var boobal3Image = new Image();
boobal3Image.onload = function () {
    boobal3Ready = true;
};
boobal3Image.src = "_ressources/images/boobal3.png";
var boobal3 = {
    y: 300,
    x: -400,
    width: 400,
    height: 300
}; //x go to 110

var boobal4Ready = false;
var boobal4Image = new Image();
boobal4Image.onload = function () {
    boobal4Ready = true;
};
boobal4Image.src = "_ressources/images/boobal4.png";
var boobal4 = {
    y: 300,
    x: 1050,
    width: 400,
    height: 300
}; //x go to 110

/********************************************************
GAME OBJECTS
********************************************************/
//BG
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "_ressources/images/bg.png";

// red Rocket image
var redRocketReady = false;
var redRocketImage = new Image();
redRocketImage.onload = function () {
    redRocketReady = true;
};
redRocketImage.src = "_ressources/images/redRocket.png";
var redRocket = {
    speed: 800,
    y: 750,
    x: 70,
    width: 100,
    height: 100,
    isDead: false,
    player: 'player1'
};
var redRocketJump = 0;
var redRocketStationary = true;

/********************************************************
PLATEFORMS GENERATION
********************************************************/

var platformReady = false;
var platformImage = new Image();
platformImage.onload = function () {
    platformReady = true;
};
platformImage.src = "_ressources/images/platform_small.png";

function Platform() {
    this.width = 70;
    this.height = 10;

    this.x = Math.random() * (canvas.width - this.width);
    this.y = position;


    //to create platform each time lower than the previous one
    position += (canvas.height / platformCount);


    //Function to draw it
    this.draw = function () {
        try {
            ctx.drawImage(platformImage, this.x, this.y, this.width, this.height);

        } catch (e) {}
    };
};

for (var i = 0; i < platformCount; i++) {
    platforms.push(new Platform());
    //1st platform always in the middle for start
    if (i == platformCount - 1) {
        platforms[i].x = (canvas.width / 2 - platforms[i].width / 2);
        console.log(platforms[i]);
    }
};



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

    if (startScreen)
        startAnimation(delta / 100);

    if (playing) {
        document.getElementById("buttonSkip").style.display = "none";
        if (!paused)
            update(delta / 1000);
    }

    if (endScreen) {
        //Do  something...
    }

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
    if (phase1) {
        if (musk.x > 310)
            musk.x -= 100 * modifier;
        if (bezos.x < 0)
            bezos.x += 100 * modifier;
        if (bezos.x >= 0 && musk.x <= 310) {
            phase1 = false;
            console.log("salut");
        }
    }

    //do phase 2 (bubbles)
    if (!phase1) {
        if (boobal1.x < 110)
            boobal1.x += 100 * modifier;
        else {
            if (pause1 > 0)
                pause1 -= modifier;
            else {
                //disapear text1 and appear text2
                boobal1.y -= 100 * modifier;
                if (boobal2.x > 110)
                    boobal2.x -= 100 * modifier;
                else {
                    if (pause2 > 0)
                        pause2 -= modifier;
                    else {
                        boobal2.y -= 100 * modifier;
                        if (boobal3.x < 110)
                            boobal3.x += 100 * modifier;
                        else {
                            if (pause3 > 0)
                                pause3 -= modifier;
                            else {
                                boobal3.y -= 100 * modifier;
                                if (boobal4.x > 110)
                                    boobal4.x -= 100 * modifier;
                                else {
                                    if (pause4 > 0)
                                        pause4 -= modifier;
                                    else {
                                        boobal4.y -= 100 * modifier;
                                        musk.x += 100 * modifier;
                                        bezos.x -= 100 * modifier;
                                        if (bezos.x <= 350 && musk.x > 950) {
                                            startScreen = false;
                                            playing = true;
                                        }
                                    }
                                    //characters out and gameOn
                                }
                            }
                        }
                    }
                }

            }
        }
    }
};

/********************************************************
SKIP ANIMATION ON CLICK
********************************************************/
var skipAnimation = function () {
    pause1 = -1;
    pause2 = -1;
    pause3 = -1;
    pause4 = -1;
};


/********************************************************
PAUSE GAME IF SPACE BAR PRESSED
********************************************************/

var pauseGame = function () {
    if (!paused) {
        paused = true;
        // pauseDiv elements visible
        document.getElementById("cadrePause").style.display = "block";
        document.getElementById("logoAppPause").style.display = "block";
        document.getElementById("resultTextPause").style.display = "block";
        document.getElementById("afterPausePlay").style.display = "block";

    } else if (paused) {
        paused = false;
        document.getElementById("cadrePause").style.display = "none";
        document.getElementById("logoAppPause").style.display = "none";
        document.getElementById("resultTextPause").style.display = "none";
        document.getElementById("afterPausePlay").style.display = "none";
    }

};

/********************************************************
UPDATE GAME OBJECTS WHILE PLAYING
********************************************************/
var update = function (modifier) {
    //if spaceBar is pressed, we diplay the Pause div and pause the game
    if (32 in keysDown) {
        pauseGame();
    }

    //if up key is pressed and rocket is stationary, go up 50
    if (38 in keysDown) {
        if (redRocketStationary) {
            redRocketJump = 20;
            redRocketStationary = false;
        }
    }

    if (!redRocketStationary) {
        //go left
        if (37 in keysDown) {
            redRocket.x -= redRocket.speed / 2 * modifier;
        }

        //go right
        if (39 in keysDown) {
            redRocket.x += redRocket.speed / 2 * modifier;
        }
    }

    //jump or fall or stay on platform
    if (redRocketJump > 0) {
        redRocket.y -= redRocket.speed * modifier * redRocketJump / 10;
        redRocketJump--;
    } else {
        if (redRocketStationary)
            redRocket.y = redRocket.y;
        else {
            redRocket.y += gravity * modifier;
        }
    }

    //check if rocket touches any platform
    platforms.forEach(function (platform, i) {
        if (touching(platform, redRocket) && redRocketJump == 0) {
            redRocketStationary = true;
        }
    })

    //When the rocket reaches half height : move the platforms to create the illusion of scrolling and recreate the platforms that are out of canvas...
    if (redRocket.y < (canvas.height / 2) - (redRocket.height / 2)) {

        platforms.forEach(function (p, i) {

            //plateforms goes down at new jump
            if (redRocketJump <= 15) {
                p.y += redRocket.speed * modifier * redRocketJump / 7;
            }

            //if platform goes past the canvas, create new one
            if (p.y > canvas.height) {
                platforms[i] = new Platform();
                platforms[i].y = p.y - canvas.height;
            }

        });


        points++;
    }


    //if touch bottom, game over
    if (redRocket.y + redRocket.height > canvas.height + redRocket.height) {
        gameOver(redRocket); //looser name as param
    }

    //(1)if touch border of canvas : game over
  /*  if(redRocket.x + redRocket.width > canvas.width || redRocket.x < 0){
        gameOver(redRocket);
    }
 */
    //(2)if touch border of canvas : can move through walls
    if(redRocket.x > canvas.width) redRocket.x = 0;
    else if (redRocket.x < 0) redRocket.x = canvas.width;
};

/********************************************************
TEST IF ROCKET IS TOUCHIN PLATFORM
********************************************************/
var touching = function (platform, redrocket) {
    if (redRocket.y + redRocket.height >= platform.y - 3 &&
        redRocket.y + redRocket.height <= platform.y + 3 &&
        redRocket.x + redRocket.width > platform.x &&
        redRocket.x < platform.x + 70)
        return true;
}


/********************************************************
GAME OVER
********************************************************/
function gameOver(looser) {

    endScreen = true;
    playing = false;
    looser.isDead = "";
    //show winner-looser and score, restart game?
    if(looser.player === 'player1')
        showScore(player2,player1); //winner-looser
    else
        showScore(player1,player2); //winner-looser

}

/*XXXXXXXXXXXXXXXXX Gestion du score, update du palmares à faire ! XXXXXXXXXXXXXXXXXXXXX*/
function showScore(winner,looser) {
    document.getElementById("cadreEndgame").style.display = "block";
    document.getElementById("logoAppEndgame").style.display = "block";
    document.getElementById("resultTextEndgame").innerHTML = looser+" <br>could not follow you!";
    document.getElementById("resultTextEndgame").style.display = "block";
    document.getElementById("afterEndgame").style.display = "block";

    updateScore(winner, points);

    displayScore();
}

/********************************************************
HANDLE SCORES AND PALMARES
********************************************************/
function updateScore(theWinner, thePoints) {
    var currentPalmares = JSON.parse(localStorage.getItem("palmares"));

    var myValue = currentPalmares.length;
    var cpt = 0;
    var isSet = false;
    currentPalmares.forEach(function(element) {
        var infoScore = element.split('|');
        console.log("infoScore : "+infoScore[1]+" | thePoints :"+thePoints);

        if(infoScore[1]<thePoints && !isSet){
            console.log("coucou de l'intérieur du if");
            myValue = cpt;
            isSet = true;
        }
        cpt++;
    });

    console.log("myValue :"+ myValue);

    currentPalmares.splice(myValue,0,theWinner+'|'+thePoints);

    localStorage.setItem("palmares", JSON.stringify(currentPalmares));

}

function displayScore() {
    var myPalmares = JSON.parse(localStorage.getItem("palmares"));

    var theStatePalmares =  document.getElementById("palmares");
    theStatePalmares.innerHTML = "";

    var cpt = 1;
    myPalmares.forEach(function(element) {
        if(cpt<=9){
            var infoScore = element.split('|');
            var newScore = '<div id="player1" class="player"><div id="numero">'+cpt+'. '+infoScore[0]+'</div><div id="score">'+infoScore[1]+'pts</div></div>';
            theStatePalmares.insertAdjacentHTML('beforeend',newScore);
            cpt++;
        }
    });

    //Just to remove the restart the palmares
    //localStorage.removeItem("palmares");

}



/********************************************************
DRAW EVERYTHING
********************************************************/
var render = function () {

    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (platformReady) {
        for (i = 0; i < platforms.length; i++) {
            platforms[i].draw();
        }
    }

    if (redRocketImage) {
        ctx.drawImage(redRocketImage, redRocket.x, redRocket.y, redRocket.width, redRocket.height);
    }

    if (bezosReady) {
        ctx.drawImage(bezosImage, bezos.x, bezos.y, bezos.width, bezos.height);
    }
    if (muskReady) {
        ctx.drawImage(muskImage, musk.x, musk.y, musk.width, musk.height);
    }
    if (boobal1Ready) {
        ctx.drawImage(boobal1Image, boobal1.x, boobal1.y, boobal1.width, boobal1.height);
    }
    if (boobal2Ready) {
        ctx.drawImage(boobal2Image, boobal2.x, boobal2.y, boobal2.width, boobal2.height);
    }
    if (boobal3Ready) {
        ctx.drawImage(boobal3Image, boobal3.x, boobal3.y, boobal3.width, boobal3.height);
    }
    if (boobal4Ready) {
        ctx.drawImage(boobal4Image, boobal4.x, boobal4.y, boobal4.width, boobal4.height);
    }

    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "18px 'Press Start 2P'";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(points + " KM", 32, 32);
};

/********************************************************
Cross-browser support for requestAnimationFrame
********************************************************/
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var start = function () {

}

/********************************************************
PLAY
********************************************************/
var then = Date.now();
start();
main();
