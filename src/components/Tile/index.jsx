import './Tile.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

const Tile = (props) => {
  const [zoomed, setZoomed] = useState(false);
  // TODO: Figure out weight -> size calculation
  const style = {
    width: 200, 
    height: 200
  }

  if (zoomed && props.children.length > 0) {
    const tiles = props.children.map((tile) => {
      return (
        <Tile
          weight={tile.value / props.value}
          name={tile.name}
          value={tile.value}
          children={tile.children}
        />
      );
    });
    return (
      <div>
        {tiles}
      </div>
    );
  } else {
    return (
      <div style={style} className="tile" onClick={() => setZoomed(!zoomed)}>
        <p>Name: {props.name}</p>
        <p>Value: {props.value}</p>
        <p>Weight: {Math.round(props.weight * 100)}</p>
      </div>
    );
  }
};

Tile.propTypes = {
  name: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  children: PropTypes.array.isRequired
};

export default Tile;