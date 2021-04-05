import './TileMap.css';
import { useContext, useEffect, useState } from 'react';
import { SettingsContext } from 'contexts/settingsContext';
import { BoardContext } from 'contexts/boardsContext';

import { newTileTree } from 'helpers/tileMap';

import GroupTile from 'components/GroupTile';

// TileMap Component
// Container component for rendering tiles within
//
// DEPENDENCIES: [ board, settings ]
const TileMap = () => {
  const board = useContext(BoardContext);
  const settings = useContext(SettingsContext);
  const [tileData, setTileData] = useState(undefined);

  useEffect(() => {
    if (Object.keys(board).length > 0) {
      const tree = newTileTree(
        board,
        settings.weight_column_id,
        settings.group_column_id,
      );
      setTileData(tree);
    }
  }, [board, settings]);

  if (tileData && tileData.children) {
    const tiles = tileData.children.map(tile => {
      return (
        <GroupTile
          key={tile.id}
          id={tile.id}
          weight={tile.weight}
          name={tile.name}
          value={tile.value}
          children={tile.children}
          parentId={tileData.id}
        />
      );
    });
    return (
      <div className="tilemap" id="tilemap-container">
        {tiles}
      </div>
    );
  } else {
    return <div>No Items</div>;
  }
};

export default TileMap;
