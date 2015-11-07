/**
 * Created by judithhartmann on 07/11/15.
 */

document.addEventListener("DOMContentLoaded", function(event) {
    GAME = new Game();
    GAME.run();


    window.addEventListener("keydown", function (event) {
        GAME.handleKeyPress(event);
    });
});
