import './ItemTile.css';
import PropTypes from 'prop-types';

const ItemTile = props => {
  const style = {
    width: 200,
    height: 200,
  };

  return (
    <div style={style} className="tile">
      <p>Name: {props.name}</p>
      <p>Value: {props.value}</p>
      <p>Weight: {Math.round(props.weight * 100)}</p>
    </div>
  );
};

export default ItemTile;

ItemTile.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  parentId: PropTypes.string.isRequired,
};
