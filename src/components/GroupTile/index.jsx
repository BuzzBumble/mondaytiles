import './GroupTile.css';
import PropTypes from 'prop-types';
import Tile from 'components/Tile';
import DataTile from 'classes/DataTile';

import { useEffect, useState } from 'react';

// GroupTile component
// Container for a group of tiles within a TileMap
//
// DEPENDENCIES: None
const GroupTile = props => {
  const unzoom = props.unzoom;

  useEffect(() => {
    const addUnzoom = e => {
      e.preventDefault();
      unzoom();
    };

    document.addEventListener('contextmenu', addUnzoom);

    return () => {
      document.removeEventListener('contextmenu', addUnzoom);
    };
  }, [unzoom]);

  const tiles = props.children.map(child => {
    return (
      <Tile
        key={child.id}
        id={child.id}
        weight={child.value / props.value}
        name={child.name}
        value={child.value}
        children={child.children}
        parentId={props.id}
      />
    );
  });

  return (
    <div className="grouptile" id={props.id}>
      <p>{props.name}</p>
      {tiles}
    </div>
  );
};

GroupTile.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  children: PropTypes.arrayOf(PropTypes.instanceOf(DataTile)),
  unzoom: PropTypes.func,
};

export default GroupTile;
