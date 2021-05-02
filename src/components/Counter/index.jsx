import './Counter.css';
import PropTypes from 'prop-types';
import { getColorVariant } from 'helpers/colors';

const Counter = ({count, color}) => {
  const countText = count?.toString().length > 3 ? `${10 ** 3 - 1}+` : count;
  const counterColor = getColorVariant(color, 0.6)
  return (
    <span>
      <div className='counter' style={{backgroundColor: counterColor}}>
        <span className='counter-text'>{countText}</span>
      </div>
    </span>
  );
}

Counter.propTypes = {
  count: PropTypes.number,
}

export default Counter;