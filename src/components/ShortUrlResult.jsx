import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const ShortUrlResult = ({ shortenedUrl, resetForm }) => {
  return (
    <>
      <h2 className="text-center">
        Your short URL is{' '}
        <a href={shortenedUrl}>{new URL(shortenedUrl).pathname}</a>
      </h2>
      <Button onClick={resetForm} variant="link" className="mt-3">
        ...shorten another URL
      </Button>
    </>
  );
};

ShortUrlResult.propTypes = {
  shortenedUrl: PropTypes.string.isRequired,
  resetForm: PropTypes.func.isRequired,
};

export default ShortUrlResult;
