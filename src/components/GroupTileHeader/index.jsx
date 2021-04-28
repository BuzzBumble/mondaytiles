import './GroupTileHeader.css';
import PropTypes from 'prop-types';
import Counter from 'monday-ui-react-core/dist/Counter';

// GroupTileHeader component
// Header for a zoomed/expanded GroupTile
const GroupTileHeader = props => {
  return (
    <div className="grouptile-header paragraph-bold" onClick={props.onClick}>
      {props.name}
      <span className="grouptile-counter">
        <Counter
          count={props.value}
          size={Counter.sizes.SMALL}
          color={Counter.colors.DARK}
        />
      </span>
    </div>
  );
};

export default GroupTileHeader;

GroupTileHeader.propTypes = {
  name: PropTypes.string.isRequired,
};
