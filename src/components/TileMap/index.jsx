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
        window.innerWidth,
        window.innerHeight,
      );
      console.clear();
      tree.calcRects();
      setTileData(tree);
    }
  }, [board, settings]);

  // useEffect(() => {
  //   console.log('tiles changed');
  //   console.log(tileData);
  // }, [tileData]);

  if (tileData && tileData.children.length > 0) {
    const tiles = tileData.children.map(tile => {
      return <GroupTile key={tile.id} tile={tile} />;
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
