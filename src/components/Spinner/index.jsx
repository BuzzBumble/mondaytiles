import './Spinner.css';
import Loader from 'monday-ui-react-core/dist/Loader';

const Spinner = () => {
  return (
    <div className="cover-screen">
      <div className="spinner-container">
        <Loader />
      </div>
    </div>
  );
};

export default Spinner;
