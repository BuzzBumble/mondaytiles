export const acceptedTypes = [
  "numeric",
]

export const mapBoard = (board) => {
  let b = {};
  b.columns = {};

  board.columns.forEach((column) => {
    if (isAcceptedType(column.type)) {
      b.columns[column.id] = column.type;
    }
  });

  b.groups = itemsByGroup(board.items);
  
  return b;
}

// Monday Settings object
// column_id: id of the column selected
export const mapSettings = (settings) => {

  const group_column_id = settings.group_column_id ? Object.keys(settings.group_column_id)[0] : null;
  const weight_column_id = settings.weight_column_id ? Object.keys(settings.weight_column_id)[0] : null;
  let s = {
    group_column_id,
    weight_column_id
  };

  return s;
};

function isAcceptedType (type) {
  return acceptedTypes.includes(type);
}

function itemsByGroup(items) {
  const groups = [];
  
  items.forEach((item) => {
      let found = false;
      const itemObj = mapItem(item);
      for (let i = 0; i < groups.length; i++) {
        if (groups[i].id === item.group.id) {
          groups[i].items.push(itemObj);
          for (let [k, v] of Object.entries(itemObj.values)) {
            groups[i].values[k] += v;
          }
          found = true;
        }
      }
      if (!found) {
        groups.push({
          id: item.group.id,
          title: item.group.title,
          values: Object.assign({}, itemObj.values),
          items: [itemObj]
        });
      }
  });
  
  return groups;
}

function mapItem(item) {
  const itemObj = {
    id: item.id,
    name: item.name,
    values: {}
  };
  item.column_values.forEach((cv) => {
    if (isAcceptedType(cv.type)) {
      switch (cv.type) {
        case "numeric":
          itemObj.values[cv.id] = parseInt(cv.text);
          break;
        default:
          itemObj.values[cv.id] = cv.text;
      }
    }
  });

  return itemObj;
}