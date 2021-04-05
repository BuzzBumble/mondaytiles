import './ItemTile.css';
import PropTypes from 'prop-types';
import Tile from 'components/Tile';

const ItemTile = props => {
  return (
    <Tile
      name={props.name}
      value={props.value}
      weight={props.weight}
    />
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
