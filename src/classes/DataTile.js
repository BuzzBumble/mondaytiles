import Rectangle from "classes/Rectangle";

// Tile Class
export default class DataTile {
  constructor(id, name, value) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.weight = 1;
    this.rect = null;
    this.children = [];
  }

  setRect(rect) {
    this.rect = rect;
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
    const rect = new Rectangle(0, 0, this.rect.getWidth(), this.rect.getHeight());
    const firstChild = this.children[0];

    // If there's only one child,
    // its rect can just fill the whole area
    if (this.children.length === 1) {
      firstChild.setRect(new Rectangle(rect.x1, rect.y1, rect.x2, rect.y2));
      return;
    }

    // Initialize a rectangle to represent the "empty space"
    // The first child's rect is aligned to the short side using 'layout'
    const emptyRect = new Rectangle(rect.x1, rect.y1, rect.x2, rect.y2);
    let layout = rect.getLayout();
    if (layout === Rectangle.HORIZONTAL) {
      const width = Math.floor(firstChild.weight * this.rect.getWidth());
      firstChild.setRect(new Rectangle(rect.x1, rect.y1, width, rect.y2));
      emptyRect.shrinkWidth(width);
    } else {
      const height = Math.floor(firstChild.weight * this.rect.getHeight());
      firstChild.setRect(new Rectangle(rect.x1, rect.y1, rect.x2, height));
      emptyRect.shrinkHeight(height);
    }

    // Max Ratio starts out as the first child rect's ratio as it's the only one
    let maxRatio = firstChild.rect.getRatio();
    // Layout repurposed to track the group's layout instead of the parent's
    if (layout === Rectangle.HORIZONTAL) {
      layout = Rectangle.VERTICAL;
    } else {
      layout = Rectangle.HORIZONTAL;
    }

    // Group array to keep track of children whose rects are the 'current' group
    let group = [firstChild];
    let groupValue = firstChild.value;
    let groupWeight = firstChild.weight;
    let remainingValue = this.value;

    // Ratio of the new rect if it were added to the current group
    let testRatio = 0;
    // Rect to represent the entire group
    let groupRect = new Rectangle(firstChild.rect.x1, firstChild.rect.y1, firstChild.rect.x2, firstChild.rect.y2);

    let emptyLayout = emptyRect.getLayout();

    for (let i = 1; i < this.children.length; i++) {
      const child = this.children[i];
      const testValue = groupValue + child.value;

      let childWidth, childHeight, testRect;
      if (layout === Rectangle.HORIZONTAL) {
        // Child width = child's portion of the group's width
        childWidth = child.value / testValue * groupRect.getWidth();
        // Child height = group's height
        childHeight = groupWeight * rect.getHeight();
      } else {
        // Child height = child's portion of the group's height
        childHeight = child.value / testValue * groupRect.getHeight();
        // Child width = group's width
        childWidth = groupWeight * rect.getWidth();
      }
      // Child's rect if it were to be put in the group
      testRect = new Rectangle(rect.x1, rect.y1, childWidth, childHeight);
      testRatio = testRect.getRatio();
      // If the ratio is larger than the previous max,
      // The rect will be placed in a new group
      if (testRatio > maxRatio) {

        remainingValue -= groupValue;
        // Put the child in a new group within the empty rect
        const newChildWeight = child.value / remainingValue;
        if (emptyLayout === Rectangle.HORIZONTAL) {
          childWidth = newChildWeight * emptyRect.getWidth();
          childHeight = emptyRect.getHeight();
        } else {
          childHeight = newChildWeight * emptyRect.getHeight();
          childWidth = emptyRect.getWidth();
        }
        const newRect = new Rectangle(emptyRect.x1, emptyRect.y1, 0, 0);
        newRect.setWidth(childWidth);
        newRect.setHeight(childHeight);
        groupRect = new Rectangle(newRect.x1, newRect.y1, newRect.x2, newRect.y2);
        if (this.id === "new_group") console.log(emptyRect.getWidth(), childWidth);
        if (groupRect.getLayout() === Rectangle.HORIZONTAL) {
          emptyRect.shrinkWidth(childWidth);
        } else {
          emptyRect.shrinkHeight(childHeight);
        }
        child.rect = newRect;

        // Start a new group
        group = [child];
        // Re-evaluate emptyRect's and group's layout
        layout = groupRect.getLayout();
        emptyLayout = emptyRect.getLayout();
        // Max Ratio of the new group = The new rect's ratio
        maxRatio = newRect.getRatio();
        groupValue = child.value;
      } else {
        groupValue += child.value;
        groupWeight = groupValue / remainingValue;
        // Put the child rect into the current group
        child.setRect(testRect);
        group.push(child);
        // Set the group's new width/height
        if (layout === Rectangle.HORIZONTAL) {
          const newHeight = groupWeight * rect.getHeight();
          emptyRect.shrinkHeight(newHeight - groupRect.getHeight());
          groupRect.setHeight(newHeight);
        } else {
          const newWidth = groupWeight * rect.getWidth();
          emptyRect.shrinkWidth(newWidth - groupRect.getWidth());
          groupRect.setWidth(newWidth);
        }

        // Recalculate the rects of all children in the group
        this.recalcRectsForGroup(group, groupRect, groupValue);
      }
    }
    this.children.forEach((c) => c.calcRects());
  }

  recalcRectsForGroup(group, groupRect, totalValue) {
    let lastX = groupRect.x1;
    let lastY = groupRect.y1;
    group.forEach(c => {
      const weight = c.value / totalValue;
      if (groupRect.getLayout() === Rectangle.HORIZONTAL) {
        c.rect.x1 = lastX;
        c.rect.y1 = groupRect.y1;
        c.rect.setWidth(weight * groupRect.getWidth());
        c.rect.setHeight(groupRect.getHeight());
      } else {
        c.rect.y1 = lastY;
        c.rect.x1 = groupRect.x1;
        c.rect.setHeight(weight * groupRect.getHeight());
        c.rect.setWidth(groupRect.getWidth());
      }

      lastX = c.rect.x2;
      lastY = c.rect.y2;
    });
  };

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