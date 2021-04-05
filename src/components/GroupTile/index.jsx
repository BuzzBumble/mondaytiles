import './GroupTile.css';
import PropTypes from 'prop-types';
import DataTile from 'classes/DataTile';
import ItemTile from 'components/ItemTile';
import Tile from 'components/Tile';
import { shortName } from 'helpers/util';

import { useState } from 'react';

// GroupTile component
// Container for a group of tiles within a TileMap
//
// DEPENDENCIES: None
const GroupTile = props => {
  const [zoomed, setZoomed] = useState(false);

  if (zoomed) {
    const tiles = props.children.map(child => {
      const name = shortName(child.name);
      if (child.children.length > 0) {
        return (
          <GroupTile
            key={child.id}
            id={child.id}
            name={name}
            weight={child.weight}
            children={child.children}
            value={child.value}
            parentId={props.id}
          />
        );
      } else {
        return (
          <ItemTile
            key={child.id}
            id={child.id}
            name={name}
            weight={child.weight}
            value={child.value}
            parentId={props.id}
          />
        );
      }
    });
    return (
      <div className="grouptile" id={props.id}>
        <p>{shortName(props.name)}</p>
        {tiles}
      </div>
    );
  } else {
    return (
      <Tile
        name={shortName(props.name)}
        value={props.value}
        weight={props.weight}
        onClick={() => setZoomed(true)}
      />
    );
  }
};

GroupTile.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  weight: PropTypes.number.isRequired,
  children: PropTypes.arrayOf(PropTypes.instanceOf(DataTile)),
  unzoom: PropTypes.func,
};

export default GroupTile;
