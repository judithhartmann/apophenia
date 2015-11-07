var Item = function (gridCell, stage) {
    gridCell.setItem(this);

    this.addToStage(gridCell, stage);
};


Item.prototype.addToStage = function (gridCell, stage) {
    var texture = PIXI.Texture.fromImage('img/SnakeHeadA1x32.png');

    this.sprite = new PIXI.Sprite(texture);

    var pixelPosition = gridCell.getPixelPosition();

    this.sprite.position.x = pixelPosition.x;
    this.sprite.position.y = pixelPosition.y;

    stage.addChild(this.sprite);
};

Item.prototype.removeFromStage = function (stage) {
    stage.removeChild(this.sprite);
    stage.item = undefined;
};