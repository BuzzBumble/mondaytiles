import DataTile from 'classes/DataTile';
import Rectangle from 'classes/Rectangle';

export const newTileTree = (board, weight_column_id, group_column_id, width, height) => {
  let tree = new DataTile("Root", "Root", 0);
  const rect = new Rectangle(0, 0, width, height);
  const displayRect = rect.getCopy();

  tree.setRect(rect);
  tree.setDisplayRect(displayRect);

  board.groups.forEach((group) => {
    const groupTile = new DataTile(group.id, group.title, 0);

    const categories = {};
    group.items.forEach((item) => {
      let item_value = item.values[group_column_id].value;
      if (item_value === "") item_value = "None";
      const item_weight_value = item.values[weight_column_id].value;
      const category_id = group.id + '-' + item_value;
      const item_exists = Object.keys(categories).includes(item_value);
      if (!item_exists) {
        const categoryTile = new DataTile(
          category_id,
          item_value,
          0
        );
        categories[item_value] = categoryTile;
      }

      const itemTile = new DataTile(item.id, item.name, item_weight_value);
      categories[item_value].addChild(itemTile);
    });

    groupTile.addChildren(Object.values(categories));
    tree.addChild(groupTile);
  });

  tree.calcChildrenWeights();
  tree.sortChildren();
  return tree;
};