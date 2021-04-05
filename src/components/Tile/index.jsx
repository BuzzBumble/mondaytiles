import './Tile.css';
import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import GroupTile from 'components/GroupTile';
import ItemTile from 'components/ItemTile';
import DataTile from 'classes/DataTile';

const Tile = props => {
  const [zoomed, setZoomed] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // TODO: Figure out weight -> size calculation

  if (zoomed && props.children.length > 0) {
    return (
      <GroupTile
        id={props.id}
        name={props.name}
        children={props.children}
        value={props.value}
        unzoom={() => {
          setZoomed(false);
        }}
      />
    );
  } else {
    return (
      <ItemTile
        id={props.id}
        name={props.name}
        weight={props.weight}
        value={props.value}
        parentId={props.parentId}
      />
    );
  }
};

Tile.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  children: PropTypes.arrayOf(PropTypes.instanceOf(DataTile)),
  parentId: PropTypes.string.isRequired,
};

export default Tile;
