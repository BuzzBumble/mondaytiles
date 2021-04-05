import './Tile.css';
import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import GroupTile from 'components/GroupTile';
import DataTile from 'classes/DataTile';

const Tile = props => {
  const [zoomed, setZoomed] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // TODO: Figure out weight -> size calculation
  const style = {
    width: 200,
    height: 200,
  };

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
      <div
        style={style}
        className="tile"
        onClick={() => setZoomed(true)}
      >
        <p>Name: {props.name}</p>
        <p>Value: {props.value}</p>
        <p>Weight: {Math.round(props.weight * 100)}</p>
      </div>
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
