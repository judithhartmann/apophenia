/**
 * Created by judithhartmann on 07/11/15.
 */

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

document.addEventListener("DOMContentLoaded", function(event) {
    GAME = new Game();
    GAME.run();


    window.addEventListener("keydown", function (event) {
        GAME.handleKeyPress(event);
    });
});
