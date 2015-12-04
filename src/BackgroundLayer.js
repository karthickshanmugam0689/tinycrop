var BackgroundLayer = function(opts) {

  opts = opts || {};

  this.backgroundColor = opts.backgroundColor;
  this.foregroundColor = opts.foregroundColor;
  this.parent = opts.parent;
  this.context = opts.context;
  this.isDirty = true;
};

BackgroundLayer.create = function(opts) {
  return new BackgroundLayer(opts);
};

BackgroundLayer.prototype.revalidate = function() {
  this.isDirty = true;
};

BackgroundLayer.prototype.paint = function() {

  if (this.isDirty) {

    var parent = this.parent;
    var context = this.context;

    context.fillStyle = this.backgroundColor;
    context.fillRect(0, 0, parent.width, parent.height);

    var w = parent.width;
    var h = parent.height;

    var cols = 32;
    var size = parent.width / cols;
    var rows = Math.ceil(h / size);

    context.fillStyle = this.foregroundColor;
    var count = 0;
    for (var i = 0; i < cols; i += 1) {
      for (var j = 0; j < rows; j += 1) {
        if ((i + j) % 2 === 0)
          context.fillRect(i * size, j * size, size, size);
        count += 1;
      }
    }

    this.isDirty = false;
  }
};

module.exports = BackgroundLayer;
