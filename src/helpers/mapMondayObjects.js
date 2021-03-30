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

export const mapSettings = (settings) => {
  // TODO
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
        itemObj.values[cv.id] = cv.text;
      }
    });

    data.push(itemObj);
  });

  return data;
}