import Rectangle from 'classes/Rectangle';

export default class Row {
  static HORIZONTAL = 'horizontal';
  static VERTICAL = 'vertical';

  constructor(layout, size, x1, y1) {
    this.x1 = x1;
    this.y1 = y1;
    this.value = 0;
    this.layout = layout;
    this.tiles = [];
    this.maxRatio = 1;
    this.size = size;
  }

  getWidth(pWidth, pValue) {
    if (this.layout === Row.HORIZONTAL) {
      return this.size;
    } else {
      return pWidth * (this.value / pValue);
    }
  }

  getHeight(pHeight, pValue) {
    if (this.layout === Row.HORIZONTAL) {
      return pHeight * (this.value / pValue);
    } else {
      return this.size;
    }
  }

  addTile(tile) {
    this.tiles.push(tile);
    this.value += tile.value;
    this.maxRatio = tile.rect.getRatio();
  }

  recalc(pWidth, pHeight, pValue) {
    if (this.tiles.length === 0) {
      return;
    }
    
    let tile = this.tiles[0];
    tile.rect = this.calcRect(tile.value, pValue, pWidth, pHeight, this.x1, this.y1);
    tile.displayRect = new Rectangle(0, 0, tile.rect.getWidth(), tile.rect.getHeight());
    for (let i = 1; i < this.tiles.length; i++) {
      tile = this.tiles[i];

      if (this.layout === Row.HORIZONTAL) {
        tile.rect = this.calcRect(tile.value, pValue, pWidth, pHeight, this.tiles[i-1].rect.x2, this.tiles[i-1].rect.y1);
      } else {
        tile.rect = this.calcRect(tile.value, pValue, pWidth, pHeight, this.tiles[i-1].rect.x1, this.tiles[i-1].rect.y2);
      }
      tile.displayRect = new Rectangle(0, 0, tile.rect.getWidth(), tile.rect.getHeight());
    }
  }

  // Return a rectangle if it was in the row
  calcRect(tValue, pValue, pWidth, pHeight, x1=0, y1=0) {
    let rowValue = this.value;
    let rowWeight = rowValue / pValue;
    let portion = tValue / rowValue;

    let rect;
    if (this.layout === Row.HORIZONTAL) {
      rect = new Rectangle(x1, y1, portion * this.size, rowWeight * pHeight);
    } else {
      rect = new Rectangle(x1, y1, rowWeight * pWidth, portion * this.size);
    }

    return rect;
  }

  calcSampleRect(tValue, pValue, pWidth, pHeight) {
    let rowValue = this.value + tValue;
    let rowWeight = rowValue / pValue;
    let portion = tValue / rowValue;

    let rect;
    if (this.layout === Row.HORIZONTAL) {
      rect = new Rectangle(0, 0, portion * this.size, rowWeight * pHeight);
    } else {
      rect = new Rectangle(0, 0, rowWeight * pWidth, portion * this.size);
    }

    return rect;
  }
};