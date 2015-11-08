var SnakePart = function (x, y, predecessor) {
    this.position = {
        x: x,
        y: y
    };

    this.previousPosition = this.position;

    this.predecessor = predecessor;

    if (predecessor)
        this.predecessor.successor = this;

    this.isMoving = false;
};

SnakePart.prototype.HEAD_TEXTURE = PIXI.Texture.fromImage('img/SnakeHeadA1x32.png');

SnakePart.prototype.BODY_TEXTURE = PIXI.Texture.fromImage('img/SnakeBodyA2x32.png');

SnakePart.prototype.TAIL_TEXTURE = PIXI.Texture.fromImage('img/TailA1x32.png');

SnakePart.prototype.createSprite = function (stage) {

    var texture;
    if (this.isHead())
        texture = this.HEAD_TEXTURE;
    else
        texture = this.TAIL_TEXTURE;

    this.sprite = new PIXI.Sprite(texture);


    this.sprite.scale.x *= 0.75;
    this.sprite.scale.y *= 0.75;

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

SnakePart.prototype.isTail = function () {
    return (typeof this.successor == "undefined");
};

SnakePart.prototype.draw = function (stage, grid) {
    if (typeof this.sprite == "undefined") {
        this.createSprite(stage);
    }

    if (!(this.isHead() || this.isTail()))
        this.sprite.texture = this.BODY_TEXTURE;

    var pixelPosition = grid.getPixelPosition(this.position);

    this.sprite.position.x = pixelPosition.x;
    this.sprite.position.y = pixelPosition.y;
};