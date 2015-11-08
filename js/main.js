/**
 * Created by judithhartmann on 07/11/15.
 */

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function loadJSON(file, callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

document.addEventListener("DOMContentLoaded", function(event) {
    GAME = new Game(1);

    window.addEventListener("keydown", function (event) {
        GAME.handleKeyPress(event);
    });
});
