import './GroupTileHeader.css';
import PropTypes from 'prop-types';

// GroupTileHeader component
// Header for a zoomed/expanded GroupTile
const GroupTileHeader = props => {
  return (
    <div className="grouptile-header" onClick={props.onClick}>
      {props.name}
    </div>
  );
};

export default GroupTileHeader;

GroupTileHeader.propTypes = {
  name: PropTypes.string.isRequired,
};
