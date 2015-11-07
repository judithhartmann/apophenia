var SnakePart = function (x, y, predecessor) {
    this.position = {
        x: x,
        y: y
    };

    this.previousPosition = this.position;

    this.predecessor = predecessor;

    this.isMoving = false;
};

SnakePart.prototype.createSprite = function (stage) {
    /**
     *
     * @type {PIXI.Graphics}
     */
    this.sprite = new PIXI.Graphics();

    this.sprite.beginFill(0x00F600);
    this.sprite.drawRect(this.position.x, this.position.y, 22, 22);
    stage.addChild(this.sprite);
};

SnakePart.prototype.move = function (direction) {
    this.previousPosition = JSON.parse(JSON.stringify(this.position));
    switch (direction) {
        case DIRECTION.UP:
            this.position.y--;
            break;
        case DIRECTION.RIGHT:
            this.position.x++;
            break;
        case DIRECTION.DOWN:
            this.position.y++;
            break;
        case DIRECTION.LEFT:
            this.position.x--;
            break;
    }

};

SnakePart.prototype.moveForward = function () {
    if (this.position.x == this.predecessor.previousPosition.x && this.position.y == this.predecessor.previousPosition.y)
        this.isMoving = true;

    if (this.isMoving) {
        this.previousPosition = JSON.parse(JSON.stringify(this.position));

        this.position = JSON.parse(JSON.stringify(this.predecessor.previousPosition));
    }
};

SnakePart.prototype.isHead = function () {
    return (typeof this.predecessor == "undefined");
};

SnakePart.prototype.draw = function (stage, grid) {
    if (typeof this.sprite == "undefined") {
        this.createSprite(stage);
    }

    var pixelPosition = grid.getPixelPosition(this.position);

    this.sprite.position.x = pixelPosition.x;
    this.sprite.position.y = pixelPosition.y;
};