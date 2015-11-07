var Grid = function (width, height) {
    this.height = height;

    this.width = width;

    this.CELLWIDTH = 25;

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

Grid.prototype.getPixelPosition = function (position) {
    return {
        x: position.x * this.CELLWIDTH,
        y: position.y * this.CELLWIDTH
    };
};

var GridCell = function (x, y) {

};