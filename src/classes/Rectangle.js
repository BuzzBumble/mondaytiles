export default class Rectangle {

  constructor(x1, y1, width, height) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x1 + width;
    this.y2 = y1 + height;
  }

  getCopy() {
    return new Rectangle(this.x1, this.y1, this.x2, this.y2);
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

  getRatio() {
    const width = this.getWidth();
    const height = this.getHeight();
    if (width > height) {
      return width / height;
    } else {
      return height / width;
    }
  }

}