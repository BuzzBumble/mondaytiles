import './TileMap.css';
import { useContext, useEffect, useState, useMemo } from 'react';
import { SettingsContext } from 'contexts/settingsContext';
import { BoardContext } from 'contexts/boardsContext';
import Loader from 'monday-ui-react-core/dist/Loader';

import { newTileTree } from 'helpers/tileMap';

import GroupTile from 'components/GroupTile';
import _ from 'lodash';

// TileMap Component
// Container component for rendering tiles within
//
// DEPENDENCIES: [ board, settings ]
const TileMap = () => {
  const board = useContext(BoardContext);
  const settings = useContext(SettingsContext);
  const [tileData, setTileData] = useState(undefined);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [loading, setLoading] = useState(true);

  const groupBorder = useMemo(() => {
    return {
      borderTopWidth: 5,
      borderRightWidth: 10,
      borderBottomWidth: 5,
      borderLeftWidth: 3,
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
        groupBorder['borderRightWidth'] +
        groupBorder['borderLeftWidth'] +
        groupPadding.right,
      bottom:
        groupBorder['borderBottomWidth'] +
        groupBorder['borderTopWidth'] +
        groupPadding.bottom,
      left: groupPadding.left,
    };
  }, [groupBorder, groupPadding]);

  const resize = _.debounce(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 500);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setLoading(true);
      resize();
    });
    return () => {
      window.removeEventListener('resize', () => {
        setLoading(true);
        resize();
      });
    };
  }, [resize]);

  useEffect(() => {
    if (Object.keys(board).length > 0) {
      const tree = newTileTree(
        board,
        settings.weight_column_id,
        settings.group_column_id,
        windowSize.width,
        windowSize.height,
      );
      tree.calcRects(tilePadding);
      setTileData(tree);
      setLoading(false);
    }
  }, [board, settings, tilePadding, windowSize, setLoading]);

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
        {loading ? (
          <div class="cover-screen">
            <div class="spinner-container">
              <Loader />
            </div>
          </div>
        ) : (
          ''
        )}
        {tiles}
      </div>
    );
  } else {
    if (loading) {
      return (
        <div class="cover-screen">
          <div class="spinner-container">
            <Loader />
          </div>
        </div>
      );
    } else {
      return <div>No Items</div>;
    }
  }
};

export default TileMap;
