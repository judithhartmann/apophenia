var Grid = function (width, height) {
    this.height = height;

    this.width = width;

    this.createCells();
};

Grid.prototype.createCells = function () {
    this.gridCells = [];

    for (var x = 0; x < this.width; x++) {
        this.gridCells[x] = [];
        for (var y = 0; y < this.height; y++) {
            this.gridCells[x][y] = new GridCell(x, y);
        }
    }
};

Grid.prototype.pickRandomEmptyCell = function () {
    while (true) {
        var x = getRandomInt(0, GRIDSIZE);
        var y = getRandomInt(0, GRIDSIZE);

        if (this.isCellEmpty(x,y)) {
            return this.gridCells[x][y];
        }
    }
};

Grid.prototype.isCellEmpty = function (x, y) {
    var gridCell = this.gridCells[x][y];
    return !gridCell.hasSnake && !gridCell.item;
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

var GridCell = function (x, y) {
    this.position = {
        x: x,
        y: y
    };

    this.hasSnake = false;
};

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

