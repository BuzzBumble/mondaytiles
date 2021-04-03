import Tile from 'classes/Tile';

export const newTileTree = (board, weight_column_id, group_column_id) => {
  let tree = new Tile("Root", "Root", 0);

  board.groups.forEach((group) => {
    const sum = group.items.reduce((sum, item) => {
      return sum + item.values[weight_column_id];
    }, 0);

    const tile = new Tile(group.id, group.title, sum);

    const categoryTiles = {}
    for (let [k, v] of Object.entries(group.values)) {
      categoryTiles[k] = new Tile(group.id + "-" + k + ":" + v, v, v);
    }

    group.items.forEach((item) => {
      const category = item.values[group_column_id];
      const itemTile = new Tile(item.id, item.name, item.values[weight_column_id]);

      categoryTiles[category].addChild(itemTile);
    });

    for (let v of Object.values(categoryTiles)) {
      tile.addChild(v);
    }

    tree.addChild(tile);
    tree.total += tile.value;
  });

  return tree;
};