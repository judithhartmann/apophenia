GRIDSIZE = 32;
CELLSIZE = 24;

var Game = function (level) {
    var fps = 5;
    this.interval = 1000/fps;
    this.then = 0;

    this.isRunning = true;
    this.levelNumber = level;

    loadJSON("levels/level" + this.levelNumber + ".json", this.initializeGame.bind(this));
};

Game.prototype.initializeGame= function(level) {

    this.level = JSON.parse(level);
    console.log(this.level);

    this.stage = new PIXI.Container();

    this.grid = new Grid(GRIDSIZE, GRIDSIZE, this.level);
    this.stage.addChild(this.grid.container);

    this.snake = new Snake(5, 5);


    this.renderer = PIXI.autoDetectRenderer(GRIDSIZE * CELLSIZE, GRIDSIZE * CELLSIZE, {backgroundColor : 0x1099bb});

    //Add the canvas to the HTML document
    document.body.appendChild(this.renderer.view);

    this.run();
};

Game.prototype.lossTexture = PIXI.Texture.fromImage('img/youlose-x256.png');

Game.prototype.spawnItem = function () {
    if (getRandomInt(0, 10) === 1) {
        var spawnCell = this.grid.pickRandomEmptyCell();
        new Item(spawnCell, this.stage);
    }
};

Game.prototype.update = function () {
    this.snake.move(this.grid);

    this.spawnItem();
    this.checkCollisions();
};

Game.prototype.checkCollisions = function () {
    if (this.snake.snakeHead.position.x < 0 || this.snake.snakeHead.position.x >= GRIDSIZE ||
        this.snake.snakeHead.position.y < 0 || this.snake.snakeHead.position.y >= GRIDSIZE
        || this.snake.checkBodyCollision()) {
        this.triggerLoss();
        return;
    }

    var headCell = this.grid.gridCells[this.snake.snakeHead.position.x][this.snake.snakeHead.position.y]
    if (headCell.item) {
        this.snake.grow();
        headCell.item.removeFromStage(this.stage);
    }


};

Game.prototype.triggerLoss = function () {
    this.isRunning = false;

    this.lossSprite = new PIXI.Sprite(this.lossTexture);

    this.lossSprite.anchor.x = 0.5;
    this.lossSprite.anchor.y = 0.5;

    this.lossSprite.position.x = GRIDSIZE * CELLSIZE / 2;
    this.lossSprite.position.y = GRIDSIZE * CELLSIZE / 2;

    this.stage.addChild(this.lossSprite);


};

Game.prototype.run = function () {
    if (!GAME.isRunning)
        return;

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
//    console.log(event.keyCode, this);
    switch (event.keyCode) {
        case 37: // left
            this.snake.setDirection(false);
            break;
        case 39: // right
            this.snake.setDirection(true);
            break;
    }
    event.preventDefault();
};