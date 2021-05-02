import './GroupTile.css';
import { useState } from 'react';

import { shortName } from 'helpers/util';

import ItemTile from 'components/ItemTile';
import GroupTileHeader from 'components/GroupTileHeader';
import Tile from 'components/Tile';

import { getColorVariant } from 'helpers/colors';

// GroupTile component
// Container for a group of tiles within a TileMap
const GroupTile = props => {
  const [zoomed, setZoomed] = useState(false);
  const tile = props.tile;

  let style = {
    left: tile.rect.x1,
    top: tile.rect.y1,
    width: tile.rect.getWidth(),
    height: tile.rect.getHeight(),
    backgroundColor: tile.color,
    borderColor: tile.color,
  };

  let zoomedStyle = {
    ...style,
    ...props.groupStyle,
  };

  const hoverHandler = {
    mouseover: e => {
      e.target.style.backgroundColor = getColorVariant(
        tile.color,
        0.7,
      );
    },
    mouseout: e => {
      e.target.style.backgroundColor = tile.color;
      e.target.style.opacity = 1;
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
            zoomGroup={props.zoomGroup}
            isFullscreen={false}
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
      <div className="grouptile" id={props.id} style={zoomedStyle}>
        <GroupTileHeader
          counterColor={tile.color}
          onClick={() => setZoomed(false)}
          zoomGroup={props.zoomGroup}
          tile={props.tile}
          isFullscreen={props.isFullscreen}
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

export default GroupTile;
