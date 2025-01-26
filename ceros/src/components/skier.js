import { AssetLoader } from 'services';

export class Skier {

  static directions = [
    'skierCrash',
    'skierLeft',
    'skierLeftDown',
    'skierDown',
    'skierRightDown',
    'skierRight',
    'skierJump1',
    'skierJump2',
    'skierJump3',
    'skierJump4',
    'skierJump5',
  ];

  // hijacks asset rendering pipeline until skier lands safely
  _airborneDirectionsQueue = [];

  static speedDamper = 1.4142;
  static sloMo = 10;

  static acceleration = {
    // down left
    2: [speed => -Math.round(speed / Skier.speedDamper), speed => Math.round(speed / Skier.speedDamper)],
    // down
    3: [speed => 0, speed => speed],
    // down right
    4: [speed => speed / Skier.speedDamper, speed => speed / Skier.speedDamper]
  };

  constructor (game, { direction, x, y, speed }) {
    this.type = 'skier';
    this.x = x;
    this.y = y;

    this.direction = direction;
    this.speed = speed;
    this.game = game;
  }

  get state () {
    return this._airborneDirectionsQueue.length ? 'airborne' : 'grounded';
  }

  draw () {
    let { direction } = this;
    direction = this.checkJumpStatus(direction);
    const assetName = Skier.directions[direction];
    this.img = AssetLoader.loaded[assetName];
    this.game.ui.draw(this.img);
  }

  move (reaction=a=>a) {
    if (Object.keys(Skier.acceleration).includes(`${this.direction}`)) {
      const [ x, y ] = Skier.acceleration[this.direction];
      this.x += x(this.speed);
      this.y += y(this.speed);
      reaction();
    }
  }

  jump () {
    const frames = [10, 9, 8, 7, 6];
    const dupes = _.range(Skier.sloMo);
    const dupedFrames = _.reduce(frames, (frames, frame) => frames.concat(dupes.map(i => frame)), []);
    this._airborneDirectionsQueue = dupedFrames;
  }

  checkJumpStatus (direction) {
    return this.state === 'airborne' ? this._airborneDirectionsQueue.pop() : direction;
  }
}