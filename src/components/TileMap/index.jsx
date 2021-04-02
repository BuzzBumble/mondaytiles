import './TileMap.css';
import { useContext, useEffect, useState } from 'react';
import { SettingsContext } from 'contexts/settingsContext';
import { BoardContext } from 'contexts/boardsContext';
import { shortName } from 'helpers/util';
import { boardToTileMap } from 'helpers/tileMap';
// import PropTypes from 'prop-types';

import Tile from 'components/Tile';

const TileMap = () => {
  const board = useContext(BoardContext);
  const settings = useContext(SettingsContext);
  const [tileData, setTileData] = useState({});

  useEffect(() => {
    if (board.items) {
      setTileData(boardToTileMap(board.items, settings.weight_column_id));
    }
  }, [board, settings]);

  useEffect(() => {
    console.log("Tile Data");
    console.log(tileData);
  }, [tileData]);

  if (tileData.tiles) {
    const tiles = tileData.tiles.map((tile) => {
      const name = shortName(tile.name);
      const weight = tile.value / tileData.total;
      return (
        <Tile
          weight={weight}
          name={name}
          value={tile.value}
         />
      );
    });
    return (
      <div className="tilemap">
        {tiles}
      </div>
    )
  } else {
    return (
      <div>No Items</div>
    )
  }

};

export default TileMap;