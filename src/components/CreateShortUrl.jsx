import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

const CreateShortUrl = ({
  shortenButtonDisabled: submitButtonDisabled,
  createShortUrl,
}) => {
  const [url, setUrl] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    createShortUrl(url);
  }

  return (
    <>
      <h2 className="mb-4">Enter a long URL... we&apos;ll make it short!</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Control
              type="url"
              pattern="https?://.+\..+"
              placeholder="Enter a long URL..."
              title="The URL must be valid and start with http:// or https://"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mb-1 w-auto"
              autoFocus
              required
            />
          </Col>
          <Col>
            <Button
              variant="primary"
              type="submit"
              disabled={submitButtonDisabled}
            >
              {submitButtonDisabled ? 'Shortening...' : 'Shorten'}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

CreateShortUrl.propTypes = {
  shortenButtonDisabled: PropTypes.bool.isRequired,
  createShortUrl: PropTypes.func.isRequired,
};

export default CreateShortUrl;
