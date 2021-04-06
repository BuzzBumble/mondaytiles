// Tile Class
export default class DataTile {
  constructor(id, name, value) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.weight = 0;
    this.children = []; // Array of Tiles
  }

  addChild(tile) {
    this.value += tile.value;

    this.children.push(tile);
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

  sortChildren(asc=false) {
    if (this.children.length < 2) {
      return;
    }

    this.children.sort((a, b) => {
      if (asc) {
        return a.value - b.value;
      } else {
        return b.value - a.value;
      }
    });

    this.children.forEach((child) => {
      child.sortChildren(asc);
    });
  }
}