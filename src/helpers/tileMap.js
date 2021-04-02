import Tile from 'classes/Tile';

export const itemTileMap = (items, weight_column_id) => { 
  let tm = {
    total: 0,
    tiles: []
  }

  items.forEach((item) => {
    const tile = new Tile(item.id, item.name, item.values[weight_column_id]);

    tm.tiles.push(tile);
    tm.total += tile.value;
  });

  return tm;
}

export const groupTileMap = (board, weight_column_id) => {
  let tm = {
    total: 0,
    tiles: [],
  }

  board.groups.forEach((group) => {
    const sum = group.items.reduce((sum, item) => {
      return sum + item.values[weight_column_id];
    }, 0);

    const tile = new Tile(group.id, group.title, sum);

    group.items.forEach((item) => {
      const itile = new Tile(item.id, item.name, item.values[weight_column_id]);

      tile.addChild(itile);
    });

    tm.tiles.push(tile);
    tm.total += tile.value;
  });

  return tm;
};