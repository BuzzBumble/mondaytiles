import DataTile from 'classes/DataTile';
import Rectangle from 'classes/Rectangle';

export const newTileTree = (board, weight_column_id, group_column_id, width, height) => {
  let weightType;
  if (weight_column_id === undefined) {
    weightType = 'count';
  } else {
    weightType = board.columns[weight_column_id];
  }

  let tree = new DataTile("Root", "Root", 0);
  const rect = new Rectangle(0, 0, width, height);
  const displayRect = rect.getCopy();

  tree.setRect(rect);
  tree.setDisplayRect(displayRect);

  board.groups.forEach((group) => {
    const groupTile = new DataTile(group.id, group.title, 0);

    const categories = {};
    group.items.forEach((item) => {
      let category_name = item.values[group_column_id].value;
      if (category_name === "") category_name = "None";
      let item_weight_value;
      if (weightType === 'numeric') {
        item_weight_value = item.values[weight_column_id].value;
      } else if (weightType === 'count') {
        item_weight_value = 1;
      }
      const category_id = group.id + '-' + category_name;
      const item_exists = Object.keys(categories).includes(category_name);
      if (!item_exists) {
        const categoryTile = new DataTile(
          category_id,
          category_name,
          0
        );
        categories[category_name] = categoryTile;
      }

      const itemTile = new DataTile(item.id, item.name, item_weight_value);
      categories[category_name].addChild(itemTile);
    });

    groupTile.addChildren(Object.values(categories));
    tree.addChild(groupTile);
  });

  tree.calcChildrenWeights();
  tree.sortChildren();
  return tree;
};