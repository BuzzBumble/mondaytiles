import './GroupTileHeader.css';

import FullScreenIcon from 'monday-ui-react-core/dist/icons/Fullscreen';
import FullScreenCloseIcon from 'monday-ui-react-core/dist/icons/FullscreenClose';

// GroupTileHeader component
// Header for a zoomed/expanded GroupTile
const GroupTileHeader = props => {
  return (
    <div
      className="grouptile-header paragraph"
      onClick={props.onClick}
    >
      <p className="grouptile-label">{props.tile.name}</p>
      {props.isFullscreen ? (
        <FullScreenCloseIcon
          onClick={() => props.zoomGroup(undefined)}
        />
      ) : (
        <FullScreenIcon onClick={() => props.zoomGroup(props.tile)} />
      )}
    </div>
  );
};

export default GroupTileHeader;
