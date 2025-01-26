import { Canvas } from './canvas';
import { Rhino } from './rhino';
import { Skier } from './skier';
import { Obstacle } from './obstacle';

import { Controls, Position, AssetLoader, Scoreboard } from 'services';

export class Game {

  entities = {
    rhino: null,
    skier: null,
    obstacles: []
  };

  constructor (dimensions, host) {
    this.ui = new Canvas(dimensions, host);
    this.score = new Scoreboard(host);
  }

  initControls (global) {
    this.controls = new Controls(this, global, Obstacle);
  }

  startScoring () {
    if (this.score.isTracking) return;
    this.score.start();
  }
  pauseScoring () {
    this.score.stop();
  }
  reduceScore (value) {
    this.score.reduce(value);
  }
  renderScore () {
    this.score.render();
  }

  makeRhino (config) {
    return this.entities.rhino = new Rhino(this, config);
  }
  makeSkier (config) {
    return this.entities.skier = new Skier(this, config);
  }
  makeObstacle (config) {
    this.entities.obstacles.push(new Obstacle(this, config));
  }
  drawAllObstacles () {
    const obstacles = _.filter(this.entities.obstacles, obstacle => obstacle.draw());
    this.entities.obstacles = obstacles;
  }

  addRandomObstacle (minX, maxX, minY, maxY) {
    const xRange = {min: minX, max: maxX};
    const yRange = {min: minY, max: maxY};
    const { x, y } = Position.findOpen({xRange, yRange}, this.entities.obstacles);
    this.makeObstacle({type: undefined, x, y});
  }

  initObstacles () {

    const { ui, entities } = this;

    const width = ui.width / 800;
    const height = ui.height / 500;
    const count = Math.ceil(_.random(5, 7) * width * height);
    const minX = -50;
    const maxX = ui.width + 50;
    const minY = ui.height / 2 + 100;
    const maxY = ui.height + 50;
    _.each(_.range(count), i => this.addRandomObstacle(minX, maxX, minY, maxY));
    this.entities.obstacles = _.sortBy(entities.obstacles, ({ y, type }) => y + AssetLoader.loaded[type].height);
  }

  addNewObstacles (direction) {
    const skip = _.random(1, 8);
    if (skip !== 8) return;

    const { x, y } = this.entities.skier;
    direction = direction !== undefined ? direction : this.entities.skier.direction;

    const left = x;
    const right = x + this.ui.width;
    const top = y;
    const bottom = y + this.ui.height;

    _.each(Obstacle.forestField(left, top, right, bottom)[direction], params => this.addRandomObstacle(...params));
  }

  detectCollision () {
    const { skier } = this.entities;

    const skierSpace = {
      left: skier.x + this.ui.width / 2,
      right: skier.x + skier.img.width + this.ui.width / 2,
      top: skier.y + skier.img.height - 5 + this.ui.height / 2,
      bottom: skier.y + skier.img.height + this.ui.height / 2
    };

    // you must believe that you can fly
    const collision = this._isCollision(skierSpace);

    if (skier.state !== 'airborne' && collision) {
      if (skier.direction !== 0) this.reduceScore(50); // no need to foster learned helplessness
      skier.direction = 0;
      this.entities.rhino.eat();
      this.pauseScoring();
    } else {
      this.startScoring();
    }
  }
  _isCollision (skierSpace) {
    return _.find(this.entities.obstacles.concat(this.entities.rhino), obstacle => {
      const obstacleSpace = {
        left: obstacle.x,
        right: obstacle.x + obstacle.img.width,
        top: obstacle.y + obstacle.img.height - 5,
        bottom: obstacle.y + obstacle.img.height
      };
      return !(obstacleSpace.left > skierSpace.right ||
               obstacleSpace.right < skierSpace.left ||
               obstacleSpace.top > skierSpace.bottom ||
               obstacleSpace.bottom < skierSpace.top
      );
    });
  }
}