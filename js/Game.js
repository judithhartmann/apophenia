GRIDSIZE = 20;
CELLSIZE = 32;

var Game = function () {
    var fps = 2;
    this.interval = 1000/fps;
    this.then = 0;

    this.stage = new PIXI.Container();

    this.snake = new Snake(5, 5);

    this.grid = new Grid(GRIDSIZE, GRIDSIZE);

    this.renderer = PIXI.autoDetectRenderer(GRIDSIZE * CELLSIZE, GRIDSIZE * CELLSIZE, {backgroundColor : 0x1099bb});

    //Add the canvas to the HTML document
    document.body.appendChild(this.renderer.view);
};

Game.prototype.update = function () {
    this.snake.move();

    this.checkCollisions();
};

Game.prototype.checkCollisions = function () {
    if (this.snake.snakeHead.position.x < 0 || this.snake.snakeHead.position.x >= GRIDSIZE ||
        this.snake.snakeHead.position.y < 0 || this.snake.snakeHead.position.y >= GRIDSIZE
        || this.snake.checkBodyCollision()) {
        console.log("YOU LOSE");
        return;
    }


};

Game.prototype.run = function () {

    requestAnimationFrame(GAME.run);

    GAME.now = Date.now();
    GAME.delta = GAME.now - GAME.then;

    if (GAME.delta > GAME.interval) {
        GAME.update();

        GAME.then = GAME.now - (GAME.delta % GAME.interval);

        GAME.draw();
    }
};

Game.prototype.draw = function () {
    this.snake.draw(this.stage, this.grid);

    this.renderer.render(this.stage)
};

Game.prototype.handleKeyPress = function (event) {
    console.log(event.keyCode, this);
    switch (event.keyCode) {
        case 37: // left
            this.snake.setDirection(false);
            break;
        case 39: // right
            this.snake.setDirection(true);
            break;
        case 38:
            this.snake.grow();
            break
    }
    event.preventDefault();
};