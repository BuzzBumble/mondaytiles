// Tile Class
export default class DataTile {
  constructor(id, name, value) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.weight = 0;
    this.children = [];
  }

  addChild(tile) {
    if (this.children.length !== 0 &&
    tile.value < this.children[0].value )
    {
      this.children.unshift(tile)
    } else {
      this.children.push(tile);
    }
    this.value += tile.value;
  }

  addChildren(tiles) {
    tiles.forEach((tile) => {
      this.addChild(tile);
    });
  }

  calcChildrenWeights() {
    if (this.children.length === 0) {
      return;
    }

    this.children.forEach((child) => {
      child.calcChildrenWeights();
      child.weight = child.value / this.value;
    });
  }

  getWeightOfChild(i) {
    return this.children[i].value / i;
  }

  recalcValues() {
    if (this.children.length === 0) {
      return this.value;
    }
    this.value = this.children.reduce((sum, tile) => {
      return sum + tile.recalcValues();
    }, 0);

    return this.value;
  }

  sortChildren() {
    if (this.children.length < 2) {
      return;
    }

    this.children.sort((a, b) => {
      return a.value - b.value;
    });

    this.children.forEach((child) => {
      child.sortTiles();
    });
  }
}