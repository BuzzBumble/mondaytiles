import './TileMap.css';
import { useContext, useEffect, useState, useMemo } from 'react';
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

  const groupBorder = useMemo(() => {
    return {
      'border-top-width': 5,
      'border-right-width': 10,
      'border-bottom-width': 5,
      'border-left-width': 3,
    };
  }, []);

  const groupPadding = useMemo(() => {
    return {
      top: 20,
      right: 0,
      bottom: 0,
      left: 0,
    };
  }, []);

  const tilePadding = useMemo(() => {
    return {
      top: groupPadding.top,
      right:
        groupBorder['border-right-width'] +
        groupBorder['border-left-width'] +
        groupPadding.right,
      bottom:
        groupBorder['border-bottom-width'] +
        groupBorder['border-top-width'] +
        groupPadding.bottom,
      left: groupPadding.left,
    };
  }, [groupBorder, groupPadding]);

  useEffect(() => {
    if (Object.keys(board).length > 0) {
      const tree = newTileTree(
        board,
        settings.weight_column_id,
        settings.group_column_id,
        window.innerWidth,
        window.innerHeight,
      );
      tree.calcRects(tilePadding);
      setTileData(tree);
    }
  }, [board, settings, tilePadding]);

  // useEffect(() => {
  //   console.log('tiles changed');
  //   console.log(tileData);
  // }, [tileData]);

  if (tileData && tileData.children.length > 0) {
    const tiles = tileData.children.map(tile => {
      return (
        <GroupTile
          key={tile.id}
          tile={tile}
          groupStyle={groupBorder}
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
