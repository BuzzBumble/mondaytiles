export default class Tile {
  constructor(id, name, value) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.total = 0;
    this.children = [];
  }

  addChild(tile) {
    this.children.push(tile);
  }

  addChildren(tiles) {
    tiles.forEach((tile) => {
      this.addChild(tile);
    });
  }
}