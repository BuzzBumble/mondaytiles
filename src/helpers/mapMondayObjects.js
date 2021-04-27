export const acceptedTypes = [
  "numeric",
  "multiple-person",
  "color"
]

export const mapBoard = (board, users, slug) => {
  let b = {};
  b.columns = {};
  b.users = mapUsers(users);
  b.url = `https://${slug}.monday.com/boards/${board.id}`

  board.columns.forEach((column) => {
    if (isAcceptedType(column.type)) {
      b.columns[column.id] = {
        type: column.type,
        title: column.title,
        settings: {}
      };
      const settings = JSON.parse(column.settings_str);
      let tempSettings = null
      if (column.type === "color") {
        tempSettings = {};
        for (const [key, value] of Object.entries(settings.labels)) {
          tempSettings[value] = settings.labels_colors[key];
        }
      }
      b.columns[column.id].settings = tempSettings;
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
          found = true;
        }
      }
      if (!found) {
        groups.push({
          id: item.group.id,
          title: item.group.title,
          items: [itemObj],
          color: item.group.color
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
          itemObj.values[cv.id] = cv.text === "" ? 0 : parseInt(cv.text);
          break;
        default:
          itemObj.values[cv.id] = cv.text;
          break;
      }
    }
  });

  return itemObj;
}

function mapUsers(users) {
  let colorIndex = 0;
  const colors = ['#FFCB00','#E2445C', '#a25ddc', '#0086c0', '#7e3b8a', '#225091', '#ff642e', '#9cd326', '#ff7575', '#4eccc6'];
  const obj = {};
  for (let user of users) {
    obj[user.name] = {
      id: user.id,
      name: user.name,
      color: colors[colorIndex++]
    }
    if (colorIndex >= colors.length) colorIndex = 0;
  }
  return obj;
}