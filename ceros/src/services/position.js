export class Position {

  static findOpen ({ xRange, yRange }, entities) {
    const x = _.random(xRange.min, xRange.max);
    const y = _.random(yRange.min, yRange.max);
    if (!entities.length) return {x, y}; // no entities, free space!
    const free = Position._isFree(x, y, entities);
    return free ? {x, y} : Position.findOpen({xRange, yRange}, entities);
  }

  static _isFree (x, y, entities) {
    return !_.find(entities, obstacle => Position._boundX(obstacle, x, 50) && Position._boundY(obstacle, y, 50));
  }

  static _boundX = (entity, unit, margin) => unit > (entity.x - margin) && unit < (entity.x + margin);
  static _boundY = (entity, unit, margin) => unit > (entity.y - margin) && unit < (entity.y + margin);
}