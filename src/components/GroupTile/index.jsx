import './GroupTile.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

import { shortName } from 'helpers/util';

import ItemTile from 'components/ItemTile';
import GroupTileHeader from 'components/GroupTileHeader';
import Tile from 'components/Tile';

// GroupTile component
// Container for a group of tiles within a TileMap
const GroupTile = props => {
  const [zoomed, setZoomed] = useState(false);
  const tile = props.tile;

  const style = {
    left: tile.rect.x1,
    top: tile.rect.y1,
    width: tile.rect.getWidth(),
    height: tile.rect.getHeight(),
    backgroundColor: tile.color === null ? 'grey' : tile.color,
    borderColor: tile.color === null ? 'grey' : tile.color,
  };

  const hoverHandler = {
    mouseover: e => {
      e.target.style.backgroundColor = 'blue';
    },
    mouseout: e => {
      e.target.style.backgroundColor = tile.color || 'grey';
    },
  };

  if (zoomed) {
    const tiles = tile.children.map(child => {
      const name = shortName(child.name);
      if (child.children.length > 0) {
        return (
          <GroupTile
            key={child.id}
            tile={child}
            groupStyle={props.groupStyle}
          />
        );
      } else {
        return (
          <ItemTile
            key={child.id}
            id={child.id}
            name={name}
            tile={child}
            weight={child.weight}
            value={child.value}
            parentId={props.id}
          />
        );
      }
    });
    return (
      <div
        className="grouptile"
        id={props.id}
        style={{ ...style, ...props.groupStyle }}
      >
        <GroupTileHeader
          name={tile.name}
          onClick={() => setZoomed(false)}
        />
        {tiles}
      </div>
    );
  } else {
    return (
      <Tile
        id={tile.id}
        name={shortName(tile.name)}
        value={tile.value}
        weight={tile.weight}
        style={style}
        onClick={() => setZoomed(true)}
        hoverHandler={hoverHandler}
      />
    );
  }
};

GroupTile.propTypes = {
  tile: PropTypes.object,
  groupStyle: PropTypes.object,
};

export default GroupTile;
