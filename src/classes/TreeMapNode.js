export default class TreeMapNode {
  constructor(width, height, value) {
    this.width = width;
    this.height = height;
    this.value = value;
    this.area = width * height;
    this.ratio = Math.max(width, height) / Math.min(width, height);
    this.children = [];
  }

  isLeafNode() {
    return this.children.length === 0;
  }
};