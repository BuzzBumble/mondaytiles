import './GroupTileHeader.css';
import Counter from 'monday-ui-react-core/dist/Counter';

import FullScreenIcon from 'monday-ui-react-core/dist/icons/Fullscreen';
import FullScreenCloseIcon from 'monday-ui-react-core/dist/icons/FullscreenClose';

// GroupTileHeader component
// Header for a zoomed/expanded GroupTile
const GroupTileHeader = props => {
  return (
    <div
      className="grouptile-header paragraph-bold"
      onClick={props.onClick}
    >
      <p className="grouptile-label">
        {props.tile.name}
        <span className="grouptile-counter">
          <Counter
            count={props.tile.value}
            size={Counter.sizes.SMALL}
            color={Counter.colors.DARK}
          />
        </span>
      </p>
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
