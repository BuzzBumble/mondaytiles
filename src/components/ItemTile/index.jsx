import './ItemTile.css';
import PropTypes from 'prop-types';
import Tile from 'components/Tile';

const ItemTile = props => {
  const tile = props.tile;

  const style = {
    left: tile.rect.x1,
    top: tile.rect.y1,
    width: tile.rect.getWidth(),
    height: tile.rect.getHeight(),
  };

  const hoverHandler = {
    mouseover: e => {
      e.target.style.backgroundColor = 'blue';
    },
    mouseout: e => {
      e.target.style.backgroundColor = tile.color || 'grey';
    },
  };

  return (
    <Tile
      style={style}
      name={props.name}
      value={props.value}
      weight={props.weight}
      hoverHandler={hoverHandler}
    />
  );
};

export default ItemTile;

ItemTile.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
