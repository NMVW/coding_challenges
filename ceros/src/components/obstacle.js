import { AssetLoader } from 'services';

export class Obstacle {

  static types = [
    'tree',
    'treeCluster',
    'rock1',
    'rock2'
  ];

  static forestField = (l, t, r, b) => ({
    1: [[l - 50, l, t, b]], // left
    2: [[l - 50, l, t, b], [l, r, b, b + 50]], // left down
    3: [[l, r, b, b + 50]], // down
    4: [[r, r + 50, t, b], [l, r, b, b + 50]], // right down
    5: [[r, r + 50, t, b]], // right
    6: [[l, r, t - 50, t]], // up
  });

  static randType () {
    return Obstacle.types[_.random(0, Obstacle.types.length - 1)];
  }

  constructor (game, { type=Obstacle.randType(), x, y }) {
    this.type = type;
    this.x = x;
    this.y = y;

    this.game = game;
  }

  draw () {
    // detect position relative to skier
    this.img = AssetLoader.loaded[this.type];
    const { x, y } = this._getPosition(this.img, this.game.entities.skier);

    // out of bounds landscape need not be drawn
    if (this._shouldDraw(x, y)) {
      this.game.ui.draw(this.img, x, y);
      return true;
    };
    return false;
  }
  _getPosition (img, skier) {
    const { x, y } = this;
    return {
      x: x - skier.x - img.width / 2,
      y: y - skier.y - img.height / 2
    };
  }
  _shouldDraw (x, y) {
    const outOfBounds = x < -100 || x > this.game.ui.width + 50 || y < -100 || y > this.game.ui.height + 50;
    return !outOfBounds;
  }

}