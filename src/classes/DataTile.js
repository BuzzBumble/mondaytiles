import Rectangle from "classes/Rectangle";
import Row from "classes/Row";

// Tile Class
export default class DataTile {
  constructor(id, name, value) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.weight = 1;
    this.rect = null;
    this.displayRect = null;
    this.children = [];
  }

  setRect(rect) {
    this.rect = rect;
  }

  setDisplayRect(rect) {
    this.displayRect = rect;
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

  calcRects() {
    if (this.children.length === 0) return;
    const emptyRect = this.displayRect.getCopy();
    let remValue = this.value;

    let row = this.startRow(this.children[0], remValue, emptyRect);

    let tile, rect;

    for (let i = 1; i < this.children.length; i++) {
      tile = this.children[i];
      rect = row.calcSampleRect(tile.value, this.value, this.displayRect.getWidth(), this.displayRect.getHeight());

      if (rect.getRatio() > row.maxRatio) {
        row.recalc(emptyRect.getWidth(), emptyRect.getHeight(), remValue);
        if (row.layout === Row.HORIZONTAL) {
          emptyRect.y1 += row.getHeight(emptyRect.getHeight(), remValue);
        } else {
          emptyRect.x1 += row.getWidth(emptyRect.getWidth(), remValue);
        }
        remValue -= row.value;
        row = this.startRow(tile, remValue, emptyRect);
      } else {
        tile.rect = rect;
        row.addTile(tile);
        row.recalc(emptyRect.getWidth(), emptyRect.getHeight(), this.value);
      }
    }
    row.recalc(emptyRect.getWidth(), emptyRect.getHeight(), remValue);
    for (tile of this.children) {
      tile.calcRects();
    }
  }

  startRow(tile, remValue, emptyRect) {
    const emptyWidth = emptyRect.getWidth();
    const emptyHeight = emptyRect.getHeight();

    const weight = tile.value / remValue;

    let rowLayout = emptyWidth > emptyHeight ? Row.VERTICAL : Row.HORIZONTAL;
    let size;
    if (rowLayout === Row.HORIZONTAL) {
      const height = weight * emptyHeight;
      size = emptyWidth;
      tile.rect = new Rectangle(emptyRect.x1, emptyRect.y1, size, height);
    } else {
      const width = weight * emptyWidth;
      size = emptyHeight;
      tile.rect = new Rectangle(emptyRect.x1, emptyRect.y1, width, size);
    }

    let row = new Row(rowLayout, size, emptyRect.x1, emptyRect.y1);
    tile.displayRect = new Rectangle(0, 0, this.rect.getWidth(), this.rect.getHeight());
    row.addTile(tile);
    return row;
  }

  calcChildrenWeights() {
    if (this.children.length === 0) return;

    this.children.forEach((child) => {
      child.calcChildrenWeights();
      child.weight = child.value / this.value;
    });
  }

  calcValues() {
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