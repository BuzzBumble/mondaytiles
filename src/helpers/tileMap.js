export const boardToTileMap = (items, column_id) => { 
  let tm = {
    total: 0,
    tiles: []
  }

  items.forEach((item) => {
    const i = {
      id: item.id,
      name: item.name,
      value: item.values[column_id]
    }

    tm.tiles.push(i);
    tm.total += i.value;
  });

  return tm;
}