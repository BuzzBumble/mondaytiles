import Tile from 'classes/Tile';

export const newTileTree = (board, weight_column_id, group_column_id) => {
  let tree = new Tile("Root", "Root", 0);

  board.groups.forEach((group) => {
    const sum = group.items.reduce((sum, item) => {
      return sum + item.values[weight_column_id].value;
    }, 0);

    const groupTile = new Tile(group.id, group.title, sum);

    const categories = {};
    group.items.forEach((item) => {
      let item_value = item.values[group_column_id].value;
      if (item_value === "") item_value = "None";
      const item_weight_value = item.values[weight_column_id].value;
      const category_id = group.id + '-' + item_value;
      const item_exists = Object.keys(categories).includes(item_value);
      if (!item_exists) {
        const categoryTile = new Tile(
          category_id,
          item_value,
          0
        );
        categories[item_value] = categoryTile;
      }

      const itemTile = new Tile(item.id, item.name, item_weight_value);
      categories[item_value].addChild(itemTile);
    });

    groupTile.addChildren(Object.values(categories));
    tree.addChild(groupTile);
  });

  return tree;
};