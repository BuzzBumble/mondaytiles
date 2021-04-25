import './Tile.css';
import PropTypes from 'prop-types';
import classNames from "classnames";
import ReactHover, { Trigger, Hover } from 'react-hover';
import { shortName } from 'helpers/util';

const optionsCursorTrueWithMargin = {
  followCursor: true,
  shiftX: 0,
  shiftY: 0
}

// Tile Component
// Basic display component for a Tile
//
// DEPENDENCIES: []
const Tile = props => {
  const roundedWeight = Math.round(props.weight * 100000) / 1000;

  return (
    <div onClick={props.onClick}>
      <ReactHover options={optionsCursorTrueWithMargin}>
        <Trigger type='trigger'>
        <div 
          style={props.style} 
          className={classNames({
            'tile': true,
            'done': props.name == 'Done',
            'working': props.name == shortName('Working on it'),
            'stuck': props.name == 'Stuck'
          })}
          >
            <div className='tile-label'>
              <p className='tile-label-text paragraph-bold'>{props.name}</p>
            </div>
          </div>
        </Trigger>
        <Hover type='hover'>
          <div className='tile-info input'>
            <p>Name: {props.name}</p>
            <p>Value: {props.value}</p>
            <p>Weight: {roundedWeight}</p>
          </div>
        </Hover>
      </ReactHover>
    </div>
  );
};

Tile.propTypes = {
  name: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object,
};

export default Tile;
