import './Tile.css';
import PropTypes from 'prop-types';

const Tile = (props) => {
  // TODO: Figure out weight -> size calculation
  const style = {
    width: 100,
    height: 100,
  }

  return (
    <div style={style} className="tile">
      <p>Name: {props.name}</p>
      <p>Value: {props.value}</p>
      <p>Weight: {Math.round(props.weight * 100)}</p>
    </div>
  );
};

Tile.propTypes = {
  name: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

export default Tile;