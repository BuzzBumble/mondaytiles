import './Tile.css';
import PropTypes from 'prop-types';

// Tile Component
// Basic display component for a Tile
//
// DEPENDENCIES: []
const Tile = props => {
  const style = {
    width: 200,
    height: 200,
  };

  const roundedWeight = Math.round(props.weight * 100);

  return (
    <div style={style} className="tile" onClick={props.onClick}>
      <p>Name: {props.name}</p>
      <p>Value: {props.value}</p>
      <p>Weight: {roundedWeight}</p>
    </div>
  );
};

Tile.propTypes = {
  name: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default Tile;
