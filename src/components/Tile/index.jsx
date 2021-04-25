import './Tile.css';
import PropTypes from 'prop-types';

import { useRef, useEffect, useState } from 'react';
import Tooltip from 'monday-ui-react-core/dist/Tooltip';

// Tile Component
// Basic display component for a Tile
//
// DEPENDENCIES: []
const Tile = props => {
  const [overflowing, setOverflowing] = useState(false);
  const tileRef = useRef();

  useEffect(() => {
    const yOverflowing =
      tileRef.current.scrollHeight > tileRef.current.clientHeight;
    const xOverflowing =
      tileRef.current.scrollWidth > tileRef.current.clientWidth;
    setOverflowing(yOverflowing || xOverflowing);

    tileRef.current.addEventListener(
      'mouseover',
      props.hoverHandler.mouseover,
    );
    tileRef.current.addEventListener(
      'mouseout',
      props.hoverHandler.mouseout,
    );
  }, [props.style, props.hoverHandler, tileRef]);

  return (
    <Tooltip
      content={props.name + ' (' + props.value + ')'}
      moveBy={{
        main:
          tileRef.current !== undefined
            ? tileRef.current.clientHeight / -2
            : 0,
        secondary: 0,
      }}
    >
      <div
        id={props.id}
        ref={tileRef}
        style={props.style}
        className="tile"
        onClick={props.onClick}
      >
        <p className="tile-label">
          {props.name}
          <br />
          {props.value}
        </p>
      </div>
    </Tooltip>
  );
};

Tile.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  style: PropTypes.object,
  hoverHandler: PropTypes.object,
  tooltip: PropTypes.elementType,
};

export default Tile;
