import './Tile.css';
import PropTypes from 'prop-types';

// Tile Component
// Basic display component for a Tile
//
// DEPENDENCIES: []
const Tile = props => {
  const roundedWeight = Math.round(props.weight * 100000) / 1000;

  return (
    <div style={props.style} className="tile" onClick={props.onClick}>
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
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object,
};

export default Tile;
