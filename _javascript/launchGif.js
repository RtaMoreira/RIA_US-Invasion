function launchGif(){
    /*document.getElementsByClassName("hiddenAfterClick")[0].style.display = "none";
    document.getElementsByClassName("hiddenAfterClick")[1].style.display = "none";*/
    var fadeTarget = document.getElementsByClassName("hiddenAfterClick")[1];
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        }
        if (fadeTarget.style.opacity == 0){
            fadeTarget.style.display = "none";
            clearInterval(fadeEffect);
        }
    }, 100);

    var fadeTarget2 = document.getElementsByClassName("hiddenAfterClick")[0];
    var fadeEffect2 = setInterval(function () {
        if (!fadeTarget2.style.opacity) {
            fadeTarget2.style.opacity = 1;
        }
        if (fadeTarget2.style.opacity > 0) {
            fadeTarget2.style.opacity -= 0.1;
        }
        if (fadeTarget2.style.opacity == 0){
            fadeTarget2.style.display = "none";
            clearInterval(fadeEffect2);
            //We hide the two rockets during the animation
            document.getElementById("redrocket").style.display = "none";
            document.getElementById("bluerocket").style.display = "none";
            //Ww start the gif animation
            document.getElementById("gifAnimation").style.visibility = "visible";
        }
    }, 100);
}
