export class Canvas {

  constructor ({ width, height, dpr }, host) {
    this.width = width;
    this.height = height;
    this.scale = unit => unit * dpr;
    this.attach(host);
  }

  attach (host='body') {
    this._view = $('<canvas></canvas>')
      .attr('width', this.scale(this.width))
      .attr('height', this.scale(this.height))
      .css({ width: `${this.width}px`, height: `${this.height}px` });
    this._ctx = this._view[0].getContext('2d');
    $(host).append(this._view); // attach to DOM
  }

  draw (img, x, y) {
    x = x ? x : (this.width - img.width) / 2;
    y = y ? y : (this.height - img.height) / 2;
    this._ctx.drawImage(img, x, y, img.width, img.height);
  }

  clear () {
    this._ctx.clearRect(0, 0, this.width, this.height);
  }

  render (global, activity=a=>a) {
    this._ctx.save();

    // Retina support
    this._ctx.scale(global.devicePixelRatio, global.devicePixelRatio);

    this.clear();

    // game activity
    activity();

    this._ctx.restore();
  }
}