var Snake = function (startX, startY) {
    this.snakeHead = new SnakePart(startX, startY);

    this.direction = DIRECTION.RIGHT;

    this.parts = [this.snakeHead];
};

var DIRECTION = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
};

Snake.prototype.setDirection = function (isRight) {
    switch (this.direction) {
        case DIRECTION.UP:
            this.direction = isRight? DIRECTION.RIGHT : DIRECTION.LEFT;
            break;
        case DIRECTION.DOWN:
            this.direction = isRight? DIRECTION.LEFT : DIRECTION.RIGHT;
            break;
        case DIRECTION.LEFT:
            this.direction = isRight? DIRECTION.UP : DIRECTION.DOWN;
            break;
        case DIRECTION.RIGHT:
            this.direction = isRight? DIRECTION.DOWN : DIRECTION.UP;
            break;

    }
};

Snake.prototype.move = function () {
    this.snakeHead.move(this.direction);

    //todo check any pickups?

    this.parts.forEach(function (snakePart) {
        if (!snakePart.isHead()) {
            snakePart.moveForward();
        }
    });
};

Snake.prototype.getLength = function () {
    return this.parts.length;
};

Snake.prototype.grow = function () {
    this.parts.push(new SnakePart(this.snakeHead.x, this.snakeHead.y, this.parts[this.parts.length - 1]));
};

Snake.prototype.draw = function (stage, grid) {
    this.parts.forEach(function (part) {
        part.draw(stage, grid);
    });
};