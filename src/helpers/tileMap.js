import DataTile from 'classes/DataTile';
import Rectangle from 'classes/Rectangle';

export const newTileTree = (board, weight_column_id, group_column_id, width, height) => {
  let weightType;
  if (weight_column_id === null) {
    weightType = 'count';
  } else {
    weightType = board.columns[weight_column_id].type;
  }

  let tree = new DataTile("Root", "Root", 0);
  const rect = new Rectangle(0, 0, width, height);
  const displayRect = rect.getCopy();

  tree.setRect(rect);
  tree.setDisplayRect(displayRect);

  board.groups.forEach((group) => {
    const groupTile = new DataTile(group.id, group.title, 0);
    groupTile.color = group.color;

    const categories = mapCategories(group, group_column_id, weight_column_id, weightType, board.columns, board.users);

    groupTile.addChildren(Object.values(categories));
    tree.addChild(groupTile);
  });

  tree.calcChildrenWeights();
  tree.sortChildren();
  tree.calcChildrenColors();
  return tree;
};

function mapCategories(group, group_column_id, weight_column_id, weightType, columns, users) {
  const categories = {};
  group.items.forEach((item) => {
    let category_name = item.values[group_column_id];
    if (category_name === "") category_name = "None";
    let item_weight_value;
    if (weightType === 'numeric') {
      item_weight_value = item.values[weight_column_id];
    } else if (weightType === 'count') {
      item_weight_value = 1;
    }
    const affectedCategories = addCategories(categories, item, group.id, group_column_id, columns, users);
    const cLength = affectedCategories.length;
    if (cLength === 1) {
      const itemTile = new DataTile(item.id, item.name, item_weight_value);
      itemTile.color = affectedCategories[0].color;
      affectedCategories[0].addChild(itemTile);
    } else if (cLength > 1) {
      const splitValue = item_weight_value / cLength;
      for (let c of affectedCategories) {
        const itemTile = new DataTile(item.id + "-" + c.name, item.name, splitValue);
        itemTile.fullValue = item_weight_value;
        itemTile.color = c.color;
        if (weightType === 'count') {
          itemTile.value = 1;
        }
        c.addChild(itemTile);
      }
    }
  });

  return categories;
}

function addCategories(categories, item, groupId, group_column_id, columns, users) {
  const c = [];
  let name = item.values[group_column_id];
  if (name === "") {
    name = 'None';
    if (!hasCategory(categories, name)) {
      const tile = new DataTile(
        groupId + '-' + name,
        name,
        0
      );
      tile.color = '#adadad';
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
      tile.color = '#adadad';
      if (columns[group_column_id].type === "color") {
        tile.color = columns[group_column_id].settings[name].color;
      } else if (columns[group_column_id].type === 'multiple-person') {
        tile.color = users[name].color;
      }
      categories[name] = tile;
    }
    c.push(categories[name]);
  }
  return c;
}

function hasCategory(categories, name) {
  return Object.keys(categories).includes(name);
}