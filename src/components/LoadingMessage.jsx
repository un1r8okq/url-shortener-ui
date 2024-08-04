import Spinner from 'react-bootstrap/Spinner';
import PropTypes from 'prop-types';


const LoadingMessage = ({ message }) => {
  return (
    <div className="flex-grow-1 d-flex justify-content-center align-items-center">
      <Spinner className="m-2" />
      <h3>{message}</h3>
    </div>
  );
};

LoadingMessage.propTypes = {
    message: PropTypes.string.isRequired,
};

export default LoadingMessage;
