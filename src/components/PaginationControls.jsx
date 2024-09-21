import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import PropTypes from 'prop-types';

const PaginationControls = ({ pageNumber, totalPages, setPageNumber }) => (
  <ButtonGroup className="mt-4 m-auto" hidden={totalPages === 1}>
    <Button
      variant="secondary"
      disabled={pageNumber <= 1}
      onClick={() => setPageNumber(pageNumber - 1)}
    >
      Previous page
    </Button>
    <Button
      variant="secondary"
      disabled={pageNumber >= totalPages - 1}
      onClick={() => setPageNumber(pageNumber + 1)}
    >
      Next page
    </Button>
  </ButtonGroup>
);

PaginationControls.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setPageNumber: PropTypes.func.isRequired,
};

export default PaginationControls;
