import './Tile.css';
import PropTypes from 'prop-types';
import classNames from "classnames";
import { shortName } from 'helpers/util';

// Tile Component
// Basic display component for a Tile
//
// DEPENDENCIES: []
const Tile = props => {
  const roundedWeight = Math.round(props.weight * 100000) / 1000;

  return (
    <div 
      style={props.style} 
      className={classNames({
        'tile': true,
        'done': props.name == 'Done',
        'working': props.name == shortName('Working on it'),
        'stuck': props.name == 'Stuck'
      })}
      onClick={props.onClick}>
      <p className='main-title'>Name: {props.name}</p>
      <p>Value: {props.value}</p>
      <p>Weight: {roundedWeight}</p>
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
