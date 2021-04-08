export default class Rectangle {
  static HORIZONTAL = 'horizontal';
  static VERTICAL = 'vertical';

  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  getWidth() {
    return this.x2 - this.x1;
  }

  getHeight() {
    return this.y2 - this.y1;
  }

  setWidth(width) {
    this.x2 = this.x1 + width;
  }

  setHeight(height) {
    this.y2 = this.y1 + height;
  }

  getLayout() {
    if (this.getWidth() > this.getHeight()) {
      return Rectangle.HORIZONTAL;
    } else {
      return Rectangle.VERTICAL;
    }
  }

  getRatio() {
    const width = this.getWidth();
    const height = this.getHeight();
    if (width > height) {
      return width / height;
    } else {
      return height / width;
    }
  }

  shrinkWidth(value) {
    this.x1 += value;
  }
  shrinkHeight(value) {
    this.y1 += value;
  }

  shrinkCentered(value) {
    const halvedValue = value / 2;
    this.x1 += halvedValue;
    this.y1 += halvedValue;
    this.x2 -= halvedValue;
    this.y2 -= halvedValue;
  }
}

export class RectGroup {
  constructor(layout) {
    this.rects = []
    this.rect = new Rectangle(0, 0, 0, 0);
  }

  getMaxRatio() {
    let max = 0;
    let ratio;
    this.rects.forEach(r => {
      ratio = r.getRatio();
      if (ratio > max) max = ratio;
    });
    return max;
  }
}