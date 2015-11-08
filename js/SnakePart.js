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

SnakePart.prototype.HEAD_TEXTURE = [
    PIXI.Texture.fromImage('img/SnakeHeadC1x24Up.png'),
    PIXI.Texture.fromImage('img/SnakeHeadC1x24Right.png'),
    PIXI.Texture.fromImage('img/SnakeHeadC1x24Down.png'),
    PIXI.Texture.fromImage('img/SnakeHeadC1x24Left.png')
];

SnakePart.prototype.BODY_TEXTURE = [
    PIXI.Texture.fromImage('img/SnakeBodyB1x24Vertical.png'),
    PIXI.Texture.fromImage('img/SnakeBodyB1x24.png'),
    PIXI.Texture.fromImage('img/SnakeBodyB1x24Vertical.png'),
    PIXI.Texture.fromImage('img/SnakeBodyB1x24.png')
];

SnakePart.prototype.TAIL_TEXTURE = [
    PIXI.Texture.fromImage('img/TailB1Up.png'),
    PIXI.Texture.fromImage('img/TailB1Right.png'),
    PIXI.Texture.fromImage('img/TailB1Down.png'),
    PIXI.Texture.fromImage('img/TailB1Left.png')
];

SnakePart.prototype.createSprite = function (stage) {

    var texture;
    if (this.isHead())
        texture = this.HEAD_TEXTURE[1];
    else
        texture = this.TAIL_TEXTURE[1];

    this.sprite = new PIXI.Sprite(texture);

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

    var diffX = this.position.x - this.previousPosition.x;
    var diffY = this.position.y - this.previousPosition.y;
    if (!this.isHead()) {
        var textureObject = this.isTail() ? this.TAIL_TEXTURE : this.BODY_TEXTURE;
        if (diffX != 0) {
            if (diffX > 0) {
                this.sprite.texture = textureObject[DIRECTION.RIGHT]
            } else {
                this.sprite.texture = textureObject[DIRECTION.LEFT]
            }
        } else {
            if (diffY > 0) {
                this.sprite.texture = textureObject[DIRECTION.DOWN]
            } else {
                this.sprite.texture = textureObject[DIRECTION.UP]
            }
        }
    }

    var pixelPosition = grid.getPixelPosition(this.position);

    this.sprite.position.x = pixelPosition.x;
    this.sprite.position.y = pixelPosition.y;
};