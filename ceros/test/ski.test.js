import { Skier } from 'components';
import { Controls } from 'services';

const assert = require('assert');

describe('Ski Controls', function () {

  // SKIER STATES:
  // 0 crash,
  // 1 left,
  // 2 leftDown,
  // 3 down,
  // 4 rightDown,
  // 5 right

  let skier = null;

  beforeEach(function () {
    skier = new Skier({ direction: 0, speed: 8, x: 100, y: 100 });
  });

  describe('Left', function () {

    it('when crashed, should get back up', function () {
      const localSkier = Object.create({}, skier);
      Controls.ski.left(localSkier);
      assert.equal(localSkier.direction, 1);
    });

    it('when already going left, should hockey stop in the direction', function () {
      const localSkier = Object.create({}, skier);
      localSkier.direction = 1;
      Controls.ski.left(localSkier);
      assert.equal(localSkier.x, skier.x - skier.speed);
      assert.equal(localSkier.direction, 1);
    });

  });

  describe('Right', function () {

    it('when crashed, should get back up', function () {
      const localSkier = Object.create({}, skier);
      Controls.ski.right(localSkier);
      assert.equal(localSkier.direction, 5);
    });

    it('when already going right, should hockey stop in the direction', function () {
      const localSkier = Object.create({}, skier);
      localSkier.direction = 5;
      Controls.ski.right(localSkier);
      assert.equal(localSkier.x, skier.x + skier.speed);
      assert.equal(localSkier.direction, 5);
    });
  });

  describe('Up', function () {

    it('when crashed, should get back up', function () {
      const localSkier = Object.create({}, skier);
      Controls.ski.right(localSkier);
      assert.equal(localSkier.direction, 5);
    });

    it('when already going right, should hockey stop in the direction', function () {
      const localSkier = Object.create({}, skier);
      localSkier.direction = 5;
      Controls.ski.right(localSkier);
      assert.equal(localSkier.x, skier.x + skier.speed);
      assert.equal(localSkier.direction, 5);
    });

  });

  describe('Down', function () {

    it('when crashed, should get back up', function () {
      const localSkier = Object.create({}, skier);
      Controls.ski.down(localSkier);
      assert.equal(localSkier.direction, 3);
    });

    // it('when already going right, should hockey stop in the direction', function () {
    //   const localSkier = Object.create({}, skier);
    //   localSkier.direction = 5;
    //   Controls.ski.right(localSkier);
    //   assert.equal(localSkier.x, skier.x + skier.speed);
    //   assert.equal(localSkier.direction, 5);
    // });

  });
});