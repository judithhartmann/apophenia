var Grid = function (width, height, level) {
    this.height = height;

    this.width = width;



    this.level = level;

    this.container = new PIXI.Container();

    this.createCells();
};

Grid.prototype.createCells = function () {
    this.gridCells = [];
    var isGrass = getRandomInt(0, 2) === 0;

    for (var x = 0; x < this.width; x++) {
        this.gridCells[x] = [];
        for (var y = 0; y < this.height; y++) {
            var isPattern = this.level.pattern[y][x] === 1;
            var isLava = this.level.pattern[y][x] === 3;
            this.gridCells[x][y] = new GridCell(x, y, isGrass, isPattern, isLava);
            this.container.addChild(this.gridCells[x][y].sprite)
        }
    }
};

Grid.prototype.pickRandomEmptyCell = function () {
    var tries = 0;
    while (tries < 10) {
        var x = getRandomInt(0, GRIDSIZE);
        var y = getRandomInt(0, GRIDSIZE);

        if (this.isCellEmpty(x,y)) {
            return this.gridCells[x][y];
        }
        tries++;
    }
};

Grid.prototype.isCellEmpty = function (x, y) {
    var gridCell = this.gridCells[x][y];
    return !gridCell.hasSnake && !gridCell.item && !gridCell.isLava && !gridCell.isPattern;
};

Grid.prototype.getPixelPosition = function (position) {
    return {
        x: position.x * CELLSIZE,
        y: position.y * CELLSIZE
    };
};

Grid.prototype.addSnakeToCell = function (position) {
    if (this.gridCells[position.x] && this.gridCells[position.x][position.y])
        this.gridCells[position.x][position.y].hasSnake = true;
};

Grid.prototype.removeSnakeFromToCell = function (position) {
    if (this.gridCells[position.x] && this.gridCells[position.x][position.y])
        this.gridCells[position.x][position.y].hasSnake = false;
};

Grid.prototype.checkWin = function () {
    return this.gridCells.every(function (gridColumn) {
        return gridColumn.every(function (gridCell) {
            if (gridCell.isPattern) {
                return gridCell.hasSnake;
            } else {
                return true;
            }
        });
    })
};

var GridCell = function (x, y, isGrass, isPattern, isLava) {
    this.position = {
        x: x,
        y: y
    };

    this.isLava = isLava;

    this.isPattern = isPattern;

    this.hasSnake = false;

    var texture;
    if (this.isPattern) {
        if (isGrass)
            texture = this.grassPatternTiles[getRandomInt(0, 5) > 3 ? 0 : 1];
        else
            texture = this.earthPatternTiles[getRandomInt(0, 5) > 3 ? 0 : 1];
    }
    else if (this.isLava)
       // texture = this.lavaTiles[getRandomInt(0, 5)];
        texture = this.lavaTiles[0];
    else {
        if (isGrass) {
            texture = this.grassTiles[getRandomInt(0, 5) > 3? 0 : 1] ;
        } else {
            texture = this.earthTiles[getRandomInt(0, 3)] ;
        }
    }


    this.sprite = new PIXI.Sprite(texture);

    this.sprite.position.x = this.getPixelPosition().x;
    this.sprite.position.y = this.getPixelPosition().y;
};

GridCell.prototype.grassTiles = [PIXI.Texture.fromImage('img/grassA.png'), PIXI.Texture.fromImage('img/grassFlatLight.png')];

GridCell.prototype.grassPatternTiles = [PIXI.Texture.fromImage('img/grassB.png'), PIXI.Texture.fromImage('img/grassFlatDark.png')];

GridCell.prototype.earthTiles = [PIXI.Texture.fromImage('img/earthFlatLight2.png'), PIXI.Texture.fromImage('img/earthA3.png'), PIXI.Texture.fromImage('img/earthA2.png')];

GridCell.prototype.earthPatternTiles = [PIXI.Texture.fromImage('img/earthFlatDark.png'), PIXI.Texture.fromImage('img/earthB1.png')];

GridCell.prototype.lavaTiles = [PIXI.Texture.fromImage("img/lavaALoop.gif"), PIXI.Texture.fromImage("img/lavaA1.png"), PIXI.Texture.fromImage("img/lavaA2.png"), PIXI.Texture.fromImage("img/lavaA3.png"), PIXI.Texture.fromImage("img/lavaA4.png")]

GridCell.prototype.setItem = function (item) {
    this.item = item;
};

GridCell.prototype.getItem = function () {
    return this.item;
};

GridCell.prototype.getPixelPosition = function () {
    return {
        x: this.position.x * CELLSIZE,
        y: this.position.y * CELLSIZE
    };
};

