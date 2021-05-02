import './GroupTileHeader.css';
import Counter from '../Counter/index';
import { useRef, useEffect, useState } from 'react';

import FullScreenIcon from 'monday-ui-react-core/dist/icons/Fullscreen';
import FullScreenCloseIcon from 'monday-ui-react-core/dist/icons/FullscreenClose';

// GroupTileHeader component
// Header for a zoomed/expanded GroupTile
const GroupTileHeader = props => {
  const [overflowing, setOverflowing] = useState(false);
  const tileRef = useRef();

  useEffect(() => {
    const yOverflowing =
      tileRef.current.scrollHeight > tileRef.current.clientHeight;
    const xOverflowing =
      tileRef.current.scrollWidth > tileRef.current.clientWidth;
    setOverflowing(yOverflowing || xOverflowing);
  }, []);

  return (
    <div
      className="grouptile-header paragraph-bold"
      onClick={props.onClick}
      ref={tileRef}
    >
      {overflowing ? "" : (
        <p className="grouptile-label">
          {props.tile.name}
          <Counter
            count={props.tile.value}
            color={props.counterColor}
          />
        </p>
      )}
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
