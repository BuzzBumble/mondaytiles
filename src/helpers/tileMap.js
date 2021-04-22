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

    const categories = mapCategories(group, group_column_id, weight_column_id, weightType);

    groupTile.addChildren(Object.values(categories));
    tree.addChild(groupTile);
  });

  tree.calcChildrenWeights();
  tree.sortChildren();
  return tree;
};

function mapCategories(group, group_column_id, weight_column_id, weightType) {
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
    const affectedCategories = addCategories(categories, item, group.id, group_column_id);
    const cLength = affectedCategories.length;
    if (cLength === 1) {
      const itemTile = new DataTile(item.id, item.name, item_weight_value);
      affectedCategories[0].addChild(itemTile);
    } else if (cLength > 1) {
      const splitValue = item_weight_value / cLength;
      for (let c of affectedCategories) {
        const itemTile = new DataTile(item.id + "-" + c.name, item.name, splitValue);
        if (weightType === 'count') {
          itemTile.value = 1;
        }
        c.addChild(itemTile);
      }
    }
  });

  return categories;
}

function addCategories(categories, item, groupId, group_column_id) {
  const c = [];
  let name = item.values[group_column_id].value;
  if (name === "") {
    name = 'None';
    if (!hasCategory(categories, name)) {
      const tile = new DataTile(
        groupId + '-' + name,
        name,
        0
      );
      categories[name] = tile;
    }
    c.push(categories[name]);
    return c;
  }

  let category_names = name.split(", ");
  for (name of category_names) {
    if (!hasCategory(categories, name)) {
      const tile = new DataTile(
        groupId + '-' + name,
        name,
        0
      );
      categories[name] = tile;
    }
    c.push(categories[name]);
  }
  return c;
}

function hasCategory(categories, name) {
  return Object.keys(categories).includes(name);
}