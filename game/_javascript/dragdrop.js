function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("image", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

    if (ev.target.className == "imgPlayer1") {
        document.getElementById("imgPlayer1").src = data;
        document.getElementById("iconPlayer1").src = data;
    }
    if (ev.target.className == "imgPlayer2") {
        document.getElementById("imgPlayer2").src = data;
        document.getElementById("iconPlayer2").src = data;
    }
}
