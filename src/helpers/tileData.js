
export const itemsByColumn = (items, column) => {
  let data = {};
  let data_items = [];

  let total = 0;
  items.forEach((item) => {
    let data_item = {
      name: item.name,
      value: getValueByColumn(item, column)
    }

    total += data_item.value;

    data_items.push(data_item);
  });

  data = {
    total: total,
    items: data_items
  }

  return data;
};

const getValueByColumn = (item, column) => {
  let res = 0;
  item.column_values.forEach((value) => {
    if (value.id === column) res = parseInt(value.text);
  });
  return res;
};