import 'mocha';
import { expect } from 'chai';

import { Bike } from './bike';
import { Line } from './line';

const lowEndQ = 20;
const midLvlQ = 10;
const highEndQ = 5;

const lowEndBike = new Bike("Giant", "Defy 1", 1000);
const midLvlBike = new Bike("Specialized", "Venge Elite", 2000);
const highEndBike = new Bike("Specialized", "S-Works Venge Dura-Ace", 5000);

describe('Line', () => {

  it('should get tier of model', () => {
    expect(Line.getTier(lowEndBike)).to.equal('low');
    expect(Line.getTier(midLvlBike)).to.equal('mid');
    expect(Line.getTier(highEndBike)).to.equal('high');
  });

  it('should get discount on model based on tier and quantity', () => {

    expect(Line.discounts['low'](lowEndQ - 1)).to.equal(1);
    expect(Line.discounts['low'](lowEndQ)).to.equal(.9);
    expect(Line.discounts['low'](lowEndQ + 1)).to.equal(.9);
    
    expect(Line.discounts['mid'](midLvlQ - 1)).to.equal(1);
    expect(Line.discounts['mid'](midLvlQ)).to.equal(.8);
    expect(Line.discounts['mid'](midLvlQ + 1)).to.equal(.8);

    expect(Line.discounts['high'](highEndQ - 1)).to.equal(1);
    expect(Line.discounts['high'](highEndQ)).to.equal(.8);
    expect(Line.discounts['high'](highEndQ + 1)).to.equal(.8);
  });
  
  it('should get face-value price for line item below bulk quantity discount', () => {
      const lowLineUnder = new Line(lowEndBike, 10);
      expect(lowLineUnder.itemize()).to.equal(10000);

      const midLineUnder = new Line(midLvlBike, 5);
      expect(midLineUnder.itemize()).to.equal(10000);

      const highLineUnder = new Line(highEndBike, 4);
      expect(highLineUnder.itemize()).to.equal(20000);
  });

  it('should get discounted price for line item at or above bulk quantity discount', () => {
      const lowLineAt = new Line(lowEndBike, 20);
      const lowLineOver = new Line(lowEndBike, 21);
      expect(lowLineAt.itemize()).to.equal(18000);
      expect(lowLineOver.itemize()).to.equal(18900);

      const midLineAt = new Line(midLvlBike, 10);
      const midLineOver = new Line(midLvlBike, 11);
      expect(midLineAt.itemize()).to.equal(16000);
      expect(midLineOver.itemize()).to.equal(17600);

      const highLineAt = new Line(highEndBike, 5);
      const highLineOver = new Line(highEndBike, 6);
      expect(highLineAt.itemize()).to.equal(20000);
      expect(highLineOver.itemize()).to.equal(24000);
  });
});