/**********************************************************
VARIABLES
**********************************************************/
var points = 0;
var gravity = 500;
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
var platformCount = 15;
var movingPlatform;
var deplacement;
var modifier;
var position = 0;
var palmares = [];
var firstB = true;
var firstR = true;

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
/*Geolocation part*/
var geoUser = "";

if (localStorage.getItem("geoUserMemo") === null) { //if palmares is null we create it
    localStorage.setItem("geoUserMemo", JSON.stringify(geoUser));
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("goeloc not supported");
    }
}


function showPosition(position) {

    var getJSON = function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function () {
            var status = xhr.status;
            if (status === 200) {
                callback(null, xhr.response);
            } else {
                callback(status, xhr.response);
            }
        };
        xhr.send();
    };

    getJSON('http://open.mapquestapi.com/geocoding/v1/reverse?key=A5AOlcOT3M0rfeqBbrwMLBfHMZWDF1vZ&location=' + position.coords.latitude + ',' + position.coords.longitude + '&includeRoadMetadata=true&includeNearestIntersection=true', function (err, data) {
        if (err !== null) {
            alert('Something went wrong: ' + err);
        } else {
            var thisGeoUser = data["results"]["0"]["locations"]["0"]["adminArea5"] + "-" + data["results"]["0"]["locations"]["0"]["adminArea1"];
            localStorage.setItem("geoUserMemo", JSON.stringify(thisGeoUser));
        }
    });
}

getLocation();

geoUser = localStorage.getItem("geoUserMemo");
geoUser = geoUser.substring(1, geoUser.length); //Delete first character
geoUser = geoUser.slice(0, -1); //Delete last character

/*End geolocations part*/

/*Check before launch*/

var checkBeforeLaunch = function () {
    var imgPlayer1 = document.getElementById("imgPlayer1");
    var imgPlayer2 = document.getElementById("imgPlayer2");

    if (imgPlayer1.src.includes("game/_ressources/logo/logoArrows/Interrogation3.png") ||
        imgPlayer2.src.includes("game/_ressources/logo/logoArrows/Interrogation3.png")) {
        alert("Veuillez choisir une compagnie spaciale !");
    } else {
        launchGame();
    }
}

/*End check before launch*/

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

    var x; // Now x is undefined
    console.log(typeof (x));
    x = 5; // Now x is a Number
    console.log(typeof (x));
    x = "John"; // Now x is a String
    console.log(typeof (x));

}

//elements
var talk1 = new Audio("_ressources/sound/talk1.mp3")
var talk2 = new Audio("_ressources/sound/talk2.mp3");
var pjou1 = new Audio("_ressources/sound/pjiou_J.mp3");
var pjou2 = new Audio("_ressources/sound/pjiou_R.mp3");
var fart1 = new Audio("_ressources/sound/fart1.mp3");
var fart2 = new Audio("_ressources/sound/fart2.mp3");
var fart3 = new Audio("_ressources/sound/fart3.mp3");
var fart4 = new Audio("_ressources/sound/fart4.mp3");
var fart5 = new Audio("_ressources/sound/fart5.mp3");
var lost = new Audio("_ressources/sound/lost.mp3");
var farts = [fart1, fart2, fart3, fart4, fart5];

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

function Rocket(speed, y, x, width, height, isDead, player) {
    var rocket = this;
    this.speed = speed,
        this.y = y,
        this.x = x,
        this.width = width,
        this.height = height,
        this.isDead = isDead,
        this.player = player,
        this.reachHalfScreen = function (rocketJump) {

            //When the rocket reaches half height : move the platforms to create the illusion of scrolling and recreate the platforms that are out of canvas...
            if (this.y < (canvas.height / 2) - (this.height + 100)) {

                if (rocketJump >= 15)
                    deplacement = this.speed * rocketJump * modifier / 8;
                else
                    deplacement = gravity * modifier;

                for (var i = platformCount - 1; i >= 0; i--) {
                    //plateforms goes down at new jump
                    if (rocketJump <= 15) {
                        platforms[i].y += deplacement;
                        points += Math.round(rocketJump / 10);
                    }

                    //if platform goes past the canvas, create new one
                    if (platforms[i].y > canvas.height) {

                        //random calcul to determine if moving or normal platform
                        var randomValue = Math.round(Math.random() * 10);
                        console.log("RANDOM red" + randomValue);

                        if (points > 4000) { //only moving platform (10000)
                            movingPlatform = true;
                        } else if (points > 2000 && points <= 4000) {
                            if (randomValue < 3) movingPlatform = true;
                        } else if (points > 1000 && points <= 2000) {
                            if (randomValue < 2) movingPlatform = true;
                        } else if (points > 500 && points <= 1000) {
                            if (randomValue < 1) movingPlatform = true;
                        }
                        platforms[i] = new Platform();
                        platforms[i].y = 0;
                        randomValue = false; //reset randomValue for next platform
                        movingPlatform = false;
                    }
                }
                //all rocket goes down by the same amount as the platforms
                blueRocket.y += deplacement;
                redRocket.y += deplacement;
            }
        }
};


// red Rocket image
var redRocket = new Rocket(800, 750, 170, 100, 100, false, 'player1');
var redRocketReady = false;
var redRocketJump = 0;
var redRocketStationary = true;
var redRocketImage = new Image();
redRocketImage.onload = function () {
    redRocketReady = true;
};
redRocketImage.src = "_ressources/images/redRocket.png";


// blue Rocket image
var blueRocket = new Rocket(800, 750, 330, 100, 100, false, 'player2');
var blueRocketReady = false;
var blueRocketJump = 0;
var blueRocketStationary = true;
var blueRocketImage = new Image();
blueRocketImage.onload = function () {
    blueRocketReady = true;
};
blueRocketImage.src = "_ressources/images/blueRocket.png";


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
    this.width = 120;
    this.height = 10;
    this.speed = 0;
    this.x = Math.random() * (canvas.width - this.width); //random x position
    this.y = position;

    //to create platform each time lower than the previous one
    position += (canvas.height / platformCount);

    //for moving platform
    if (movingPlatform) {
        this.speed = 2;
    }

    //Function to draw it
    this.draw = function () {
        try {
            ctx.drawImage(platformImage, this.x, this.y, this.width, this.height);

        } catch (e) {}
    };
};

//first platform at the beginning of the array (first to be tested)
for (var i = platformCount - 1; i >= 0; i--) {
    platforms[i] = (new Platform());
    //1st platform always in the middle for start
    if (i == 0) {
        platforms[i].x = (canvas.width / 2 - platforms[i].width / 2);
    }
};

//Calculation for the moving platforms
function platformCalc() {
    platforms.forEach(function (p, i) {
        if (p.speed != 0) {
            if (p.x + p.width > canvas.width) p.speed = -2; //returns back
            else if (p.x < 0) p.speed = 2; // goes from left to right

            p.x += p.speed;
        }
    });
}



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
        if (boobal1.x < 110) {
            boobal1.x += 100 * modifier;
            talk1.play();
        } else {
            if (pause1 > 0)
                pause1 -= modifier;
            else {
                //disapear text1 and appear text2
                boobal1.y -= 100 * modifier;
                if (boobal2.x > 110) {
                    talk1.pause();
                    talk1.currentTime = 0;
                    boobal2.x -= 100 * modifier;
                    talk2.play();
                } else {
                    if (pause2 > 0)
                        pause2 -= modifier;
                    else {
                        boobal2.y -= 100 * modifier;
                        if (boobal3.x < 110) {
                            talk2.pause();
                            talk2.currentTime = 0;
                            boobal3.x += 100 * modifier;
                            talk1.play();
                        } else {
                            if (pause3 > 0)
                                pause3 -= modifier;
                            else {
                                boobal3.y -= 100 * modifier;
                                if (boobal4.x > 110) {
                                    talk1.pause();
                                    boobal4.x -= 100 * modifier;
                                    talk2.play();
                                } else {
                                    if (pause4 > 0)
                                        pause4 -= modifier;
                                    else {
                                        talk2.pause();
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


    //check if rocket touches any platform (only when falling)
    if(redRocketJump > 0) {
        //jump (redrocket)
        redRocket.y -= redRocket.speed * modifier * redRocketJump / 10;
        redRocketJump--;
    }else if (!redRocketStationary &&redRocketJump <= 0) {
        redRocket.y += gravity * modifier;

        platforms.forEach(function (platform, i) {

            if (touching(platform, redRocket)) {
                redRocketStationary = true;
                if (platform.speed != 0) // if on moving platform, moves together
                {
                    redRocket.x += platform.speed;
                }
            }
        })
    }

    if(blueRocketJump > 0) {
        //jump blueRocket
        blueRocket.y -= blueRocket.speed * modifier * blueRocketJump / 10;
        blueRocketJump--;
    }else if (!blueRocketStationary && blueRocketJump <= 0) {
        blueRocket.y += gravity * modifier;

        platforms.forEach(function (platform, i) {
            if (touching(platform, blueRocket)) {
                blueRocketStationary = true;
                if (platform.speed != 0) //if on moving platform, moves together
                {
                    blueRocket.x += platform.speed;
                }
            }
        })
    }

    //moves the plateform when reach half of the screen
    redRocket.reachHalfScreen(redRocketJump);
    blueRocket.reachHalfScreen(blueRocketJump);

    //if spaceBar is pressed, we diplay the Pause div and pause the game
    if (32 in keysDown) {
        pauseGame();
    }

    if (87 in keysDown) {
        if (redRocketStationary) {
            redRocketJump = 16;
            redRocketStationary = false;
            if (firstR === true) {
                firstR = false;
                pjou1.play();
            } else {
                farts[parseInt(Math.random() * 5)].play();
                console.log("" + parseInt(Math.random() * 5));
            }
        }
    }

    //if up key is pressed and rocket is stationary, go up 50
    if (38 in keysDown) {
        if (blueRocketStationary) {
            blueRocketJump = 16;
            blueRocketStationary = false;
            if (firstB === true) {
                firstB = false;
                pjou2.play();
            } else {
                farts[parseInt(Math.random() * 5)].play();
            }
        }
    }

    if (!redRocketStationary) {
        //go left
        if (65 in keysDown) {
            redRocket.x -= redRocket.speed / 2 * modifier;
        }

        //go right
        else if (68 in keysDown) {
            redRocket.x += redRocket.speed / 2 * modifier;
        }
    }

    if (!blueRocketStationary) {
        //go left
        if (37 in keysDown) {
            blueRocket.x -= blueRocket.speed / 2 * modifier;
        }

        //go right
        else if (39 in keysDown) {
            blueRocket.x += blueRocket.speed / 2 * modifier;
        }
    }



    //if touch bottom, game over (redrocket)
    if (redRocket.y + redRocket.height > canvas.height + redRocket.height) {
        gameOver(redRocket); //looser name as param
    }

    //if touch bottom, game over (bluerocket)
    if (blueRocket.y + blueRocket.height > canvas.height + blueRocket.height) {
        gameOver(blueRocket); //looser name as param
    }

};

/********************************************************
TEST IF ROCKET IS TOUCHIN PLATFORM
********************************************************/
var touching = function (platform, rocket) {
    var rocketHeight = rocket.y+rocket.height;

    //only test platform that are under the rocket
    if (rocketHeight >= (platform.y - 6) && rocketHeight <= (platform.y + 6)) {

        return ((rocket.x + rocket.width) >= platform.x && rocket.x <= (platform.x + platform.width))
    }
}


/********************************************************
GAME OVER
********************************************************/
function gameOver(looser) {

    endScreen = true;
    playing = false;
    looser.isDead = "";
    //show winner-looser and score, restart game?
    if (looser.player === 'player1')
        showScore(player2, player1); //winner-looser
    else
        showScore(player1, player2); //winner-looser

}

function showScore(winner, looser) {
    document.getElementById("cadreEndgame").style.display = "block";
    document.getElementById("logoAppEndgame").style.display = "block";
    document.getElementById("resultTextEndgame").innerHTML = looser + " <br>could not follow!";
    document.getElementById("resultTextEndgame").style.display = "block";
    document.getElementById("afterEndgame").style.display = "block";

    updateScore(winner, points);
    lost.play();
    displayScore();
}

function reload() {
    $.ajax({
        type: "GET",
        url: "index.html",
        success: function () {
            location.reload();
        }
    });
}

/********************************************************
HANDLE SCORES AND PALMARES
********************************************************/
function updateScore(theWinner, thePoints) {
    var currentPalmares = JSON.parse(localStorage.getItem("palmares"));

    var myValue = currentPalmares.length;
    var cpt = 0;
    var isSet = false;
    currentPalmares.forEach(function (element) {
        var infoScore = element.split('|');
        //console.log("infoScore : " + infoScore[1] + " | thePoints :" + thePoints);

        if (infoScore[1] < thePoints && !isSet) {
            //    console.log("coucou de l'intérieur du if");
            myValue = cpt;
            isSet = true;
        }
        cpt++;
    });

    console.log("myValue :" + myValue);

    currentPalmares.splice(myValue, 0, theWinner + ',' + geoUser + '|' + thePoints);

    localStorage.setItem("palmares", JSON.stringify(currentPalmares));

}

function displayScore() {
    var myPalmares = JSON.parse(localStorage.getItem("palmares"));

    var theStatePalmares = document.getElementById("palmares");
    theStatePalmares.innerHTML = "";

    var cpt = 1;
    myPalmares.forEach(function (element) {
        if (cpt <= 9) {
            var infoScore = element.split('|');
            var newScore = '<div id="player1" class="player"><div id="numero">' + cpt + '. ' + infoScore[0] + '</div><div id="score">' + infoScore[1] + 'pts</div></div>';
            theStatePalmares.insertAdjacentHTML('beforeend', newScore);
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

    if (blueRocketImage) {
        ctx.drawImage(blueRocketImage, blueRocket.x, blueRocket.y, blueRocket.width, blueRocket.height);
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
MAIN LOOP
********************************************************/
var main = function () {
    var now = Date.now();
    var delta = now - then;
    modifier = delta / 1000;

    if (startScreen)
        startAnimation(delta / 100);

    if (playing) {
        document.getElementById("buttonSkip").style.display = "none";
        if (!paused) {
            update(modifier);
            platformCalc();
        }
    }

    render();

    then = now;
    // Request to do this again ASAP
    requestAnimationFrame(main);
};

/********************************************************
Cross-browser support for requestAnimationFrame
********************************************************/
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

/********************************************************
PLAY
********************************************************/
var then = Date.now();
main();
