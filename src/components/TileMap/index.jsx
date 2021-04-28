import './TileMap.css';
import {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { SettingsContext } from 'contexts/settingsContext';
import { BoardContext } from 'contexts/boardsContext';

import { newTileTree } from 'helpers/tileMap';

import GroupTile from 'components/GroupTile';
import Spinner from 'components/Spinner';
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
      borderTopWidth: 2,
      borderRightWidth: 2,
      borderBottomWidth: 2,
      borderLeftWidth: 2,
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

  const resizeCallback = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  const resize = _.debounce(resizeCallback, 500);

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
        window.innerWidth,
        window.innerHeight,
      );
      tree.calcRects(tilePadding);
      setTileData(tree);
      setLoading(false);
    }
  }, [board, settings, tilePadding]);

  useEffect(() => {
    setTileData(td => {
      if (td === undefined) return;
      td.resize(windowSize.width, windowSize.height);
      td.calcRects(tilePadding);
      return td;
    });
    setLoading(false);
  }, [windowSize, tilePadding]);

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
        {loading ? <Spinner /> : ''}
        {tiles}
      </div>
    );
  } else {
    if (loading) {
      return <Spinner />;
    } else {
      return <div>No Items</div>;
    }
  }
};

export default TileMap;
