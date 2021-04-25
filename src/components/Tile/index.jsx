import './Tile.css';
import PropTypes from 'prop-types';

import { useRef, useEffect, useState } from 'react';

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
  }, [props.style, props.hoverHandler]);

  return (
    <div
      ref={tileRef}
      style={props.style}
      className="tile"
      onClick={props.onClick}
    >
      {overflowing ? '' : <p>{props.name}</p>}
    </div>
  );
};

Tile.propTypes = {
  name: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  style: PropTypes.object,
  hoverHandler: PropTypes.object,
};

export default Tile;
