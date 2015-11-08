GRIDSIZE = 32;
CELLSIZE = 24;

var Game = function (level) {
    var fps = 8;
    this.interval = 1000/fps;

    this.then = 0;

    this.gameState = GAMESTATE.RUNNING;
    this.levelNumber = level;

    loadJSON("levels/level" + this.levelNumber + ".json", this.initializeGame.bind(this));
};

GAMESTATE = {
    RUNNING: 0,
    PAUSE: 1,
    WON: 2,
    LOST: 3
};

Game.prototype.initializeGame= function(level) {

    this.level = JSON.parse(level);

    this.stage = new PIXI.Container();

    this.grid = new Grid(GRIDSIZE, GRIDSIZE, this.level);
    this.stage.addChild(this.grid.container);

    this.snake = new Snake(5, 5);

    this.gameState = GAMESTATE.RUNNING;
    this.run();
};

Game.prototype.lossTexture = PIXI.Texture.fromImage('img/youlose-x256.png');
Game.prototype.winTexture = PIXI.Texture.fromImage('img/youwinx256.png');

Game.prototype.spawnItem = function () {
    if (getRandomInt(0, 20) === 1) {
        var spawnCell = this.grid.pickRandomEmptyCell();
        new Item(spawnCell, this.stage);
    }
};

Game.prototype.update = function () {
    this.snake.move(this.grid);

    this.spawnItem();

    this.checkWin();

    this.checkCollisions();
};

Game.prototype.checkWin = function () {
    if (this.grid.checkWin()) {
        this.triggerWin();
    }
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

Game.prototype.triggerWin = function () {
    this.gameState = GAMESTATE.WON;

    this.endSprite = new PIXI.Sprite(this.winTexture);

    this.endSprite.anchor.x = 0.5;
    this.endSprite.anchor.y = 0.5;

    this.endSprite.position.x = GRIDSIZE * CELLSIZE / 2;
    this.endSprite.position.y = GRIDSIZE * CELLSIZE / 2;

    this.stage.addChild(this.endSprite);

    RENDERER.render(this.stage)
};

Game.prototype.triggerLoss = function () {
    this.gameState = GAMESTATE.LOST;

    this.endSprite = new PIXI.Sprite(this.lossTexture);

    this.endSprite.anchor.x = 0.5;
    this.endSprite.anchor.y = 0.5;

    this.endSprite.position.x = GRIDSIZE * CELLSIZE / 2;
    this.endSprite.position.y = GRIDSIZE * CELLSIZE / 2;

    this.stage.addChild(this.endSprite);
    RENDERER.render(this.stage)
};

Game.prototype.run = function () {
    if (GAME.gameState != GAMESTATE.RUNNING)
        return;

    requestAnimationFrame(GAME.run);

    if (isNaN(GAME.then)) {
        GAME.then = 0;
    }

    GAME.now = Date.now();
    GAME.delta = GAME.now - GAME.then;

    if (GAME.delta > GAME.interval) {
        GAME.update();

        GAME.then = GAME.now - (GAME.delta % GAME.interval);

        GAME.draw();
    }
};

Game.prototype.draw = function () {

    if (GAME.gameState != GAMESTATE.RUNNING)
        return;

    this.snake.draw(this.stage, this.grid);

    RENDERER.render(this.stage)
};

Game.prototype.startNewGame = function (newLevel) {
    GAME = new Game(newLevel);
};

Game.prototype.handleKeyPress = function (event) {
//    console.log(event.keyCode, this);

    if (this.gameState === GAMESTATE.RUNNING) {
        switch (event.keyCode) {
            case 37: // left
                this.snake.setDirection(false);
                break;
            case 39: // right
                this.snake.setDirection(true);
                break;
        }
        return;
    }
    if (this.gameState === GAMESTATE.WON) {
        this.startNewGame(this.levelNumber + 1);
        return;
    }

    if (this.gameState === GAMESTATE.LOST) {
        this.startNewGame(this.levelNumber);
        return;
    }
    event.preventDefault();
};