import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import CreateShortUrl from '../components/CreateShortUrl';
import ShortUrlResult from '../components/ShortUrlResult';
import apiClient from '../api/apiClient';
import { useState } from 'react';

export default function ShortenUrl() {
  const [shortenButtonDisabled, setShortenButtonDisabled] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [error, setError] = useState('');

  async function createShortUrl(longUrl) {
    setShortenButtonDisabled(true);
    setError('');

    try {
      const result = await apiClient.shortenUrl(longUrl);
      setShortenedUrl(result.shortenedUrl);
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        setError('Unable to contact server. Please try again later.');
      } else if (error.code === 'ERR_BAD_RESPONSE') {
        setError(
          'The server was unable to shorten the URL. Please try again later.',
        );
      } else {
        setError(error.message);
      }
    } finally {
      setShortenButtonDisabled(false);
    }
  }

  function resetForm() {
    setShortenButtonDisabled(false);
    setError('');
    setShortenedUrl('');
  }

  const shortenUrlForm = (
    <CreateShortUrl
      shortenButtonDisabled={shortenButtonDisabled}
      createShortUrl={createShortUrl}
    />
  );
  const shortenUrlResult = (
    <ShortUrlResult resetForm={resetForm} shortenedUrl={shortenedUrl} />
  );

  return (
    <div className="d-flex flex-column align-items-center">
      {shortenedUrl === '' ? shortenUrlForm : shortenUrlResult}
      {error && (
        <Alert className="w-50 mt-3" variant="danger">
          {error}
        </Alert>
      )}
    </div>
  );
}
