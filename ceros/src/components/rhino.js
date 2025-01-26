import { AssetLoader } from 'services';

export class Rhino {

  static directions = [
    'rhinoDefault',
    'rhinoLeft',
    'rhinoLeft2',
    'rhinoEat0',
    'rhinoEat1',
    'rhinoEat2',
    'rhinoEat3',
    'rhinoEat4',
    'rhinoEat5',
  ];

  // feasting rhino is priority
  _eatingDirectionQueue = [];

  static speedDamper = 1.4142;
  static sloMo = 10;
  static randomWalk = 2000;

  static acceleration = {
    // default
    0: [speed => -Math.round(speed / Rhino.speedDamper), speed => Math.round(speed / Rhino.speedDamper)],
    // left
    1: [speed => 0, speed => speed],
    // left 2
    2: [speed => speed / Rhino.speedDamper, speed => speed / Rhino.speedDamper]
  };

  constructor (game, { direction, x, y, speed }) {
    this.type = 'rhino';
    this.x = x;
    this.y = y;

    this.direction = direction;
    this.speed = speed;
    this.game = game;

    this.zombify();
  }

  get state () {
    return this._eatingDirectionQueue.length ? 'eating' : 'hungry';
  }

  draw () {
    let { direction } = this;
    direction = this.checkAppetite(direction);
    const assetName = Rhino.directions[direction];
    this.img = AssetLoader.loaded[assetName];
    this.game.ui.draw(this.img);
  }

  move (reaction=a=>a) {
    if (Object.keys(Rhino.acceleration).includes(`${this.direction}`)) {
      const [ x, y ] = Rhino.acceleration[this.direction];
      this.x += x(this.speed);
      this.y += y(this.speed);
      reaction();
    }
  }

  eat () {
    const frames = [8, 7, 6, 5, 4, 3];
    const dupes = _.range(Rhino.sloMo);
    const dupedFrames = _.reduce(frames, (frames, frame) => frames.concat(dupes.map(i => frame)), []);
    this._eatingDirectionQueue = dupedFrames;
  }

  checkAppetite (direction) {
    return this.state === 'eating' ? this._eatingDirectionQueue.pop() : direction;
  }

  zombify () {
    // randomize direction periodically [0-2] > eating reserved
    this._intervalId = setInterval(() => {
      this.direction = _.random(2); // normal moving patterns
      clearInterval(this._intervalId);
      this.zombify(); // start anew
    }, Rhino.randomWalk * Math.random());
  }
}