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

  b.items = itemsByColumn(board.items);
  
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

function itemsByColumn(items) {
  let data = [];

  items.forEach((item) => {
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

    data.push(itemObj);
  });

  return data;
}