import './Tile.css';
import PropTypes from 'prop-types';

const Tile = (props) => {
  const style = {
    width: props.weight,
    height: props.weight,
  }

  return (
    <div style={style} className="tile">
      <p>{props.name}:{props.value}</p>
    </div>
  );
};

Tile.propTypes = {
  name: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

export default Tile