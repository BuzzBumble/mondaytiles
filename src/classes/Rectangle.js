export default class Rectangle {

  constructor(x1, y1, width, height) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x1 + width;
    this.y2 = y1 + height;
  }

  getCopy() {
    return new Rectangle(this.x1, this.y1, this.getWidth(), this.getHeight());
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

  addPadding(padding) {
    this.y1 += padding.top;
    this.y2 -= padding.bottom;
    this.x1 += padding.left;
    this.x2 -= padding.right;
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