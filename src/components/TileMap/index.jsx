import './TileMap.css';
import { useContext, useEffect, useState } from 'react';
import { SettingsContext } from 'contexts/settingsContext';
import { BoardContext } from 'contexts/boardsContext';
import { shortName } from 'helpers/util';
import { newTileTree } from 'helpers/tileMap';
// import PropTypes from 'prop-types';

import Tile from 'components/Tile';

// TODO:
// Extract the board-specific stuff into a new component
// Make the TileMap component reusable
// Make the Tiles stay within the TileMap

const TileMap = () => {
  const board = useContext(BoardContext);
  const settings = useContext(SettingsContext);
  const [tileData, setTileData] = useState({});

  const id = "tile-root";

  useEffect(() => {
    if (Object.keys(board).length > 0) {
      const tree = newTileTree(board, settings.weight_column_id, settings.group_column_id)
      setTileData(tree);
    }
  }, [board, settings]);

  if (tileData.children) {
    const tiles = tileData.children.map((tile) => {
      const name = shortName(tile.name);
      const weight = tile.value / tileData.value;
      return (
        <Tile
          key={tile.id}
          weight={weight}
          name={name}
          value={tile.value}
          children={tile.children}
          parentId={id}
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