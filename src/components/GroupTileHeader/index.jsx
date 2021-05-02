import './GroupTileHeader.css';
import PropTypes from 'prop-types';
import Counter from '../Counter/index';
import { useRef, useEffect, useState } from 'react';

// GroupTileHeader component
// Header for a zoomed/expanded GroupTile
const GroupTileHeader = props => {
  const [overflowing, setOverflowing] = useState(false);
  const tileRef = useRef();

  useEffect(() => {
    const yOverflowing =
      tileRef.current.scrollHeight > tileRef.clientHeight;
    const xOverflowing =
      tileRef.current.scrollWidth > tileRef.clientWidth;
    setOverflowing(yOverflowing || xOverflowing);
  }, []);

  return (
    <div 
      className="grouptile-header paragraph-bold" 
      onClick={props.onClick} 
      ref={tileRef}
    >
      {overflowing ? (
        <div>Hi</div>
      ) : (
        <div>
          {props.name}
          <span className="grouptile-counter">
            <Counter
              count={props.value}
              color={props.counterColor}
            />
          </span>
        </div>
      )}
    </div>
  );
};

export default GroupTileHeader;

GroupTileHeader.propTypes = {
  name: PropTypes.string.isRequired,
};
