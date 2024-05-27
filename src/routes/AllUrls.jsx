import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, Button, ButtonGroup, Spinner, Table } from 'react-bootstrap';

export default function AllUrls() {
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      setLoading(true);
      setError('');
      setUrls([]);
      try {
        const response = await axios.get(
          `/api/v1/urls?pageNumber=${pageNumber}`,
        );

        const { data, paginationMetadata } = response.data;

        setTotalPages(paginationMetadata.totalPages);
        setUrls(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(
          'Something went wrong when fetching the list of URLs. Please try again later.',
        );
      }
    };

    fetchUrls();
  }, [pageNumber]);

  /**
   * @param {string} str 
   * @returns {string}
   */
  const trimStr = (str) => {
    const maxLen = 50;

    if (str.length <= maxLen) {
      return str;
    }

    return str.substring(0, maxLen - 3) + '...';
  };

  /**
   * 
   * @param {string} url
   * @returns {?string}
   */
  const getPath = (urlStr) => {
    if (!URL.canParse(urlStr)) {
      return null;
    }
  
    const url = new URL(urlStr);

    return url.pathname;
  };

  const getContent = () => {
    if (error !== '') {
      return <Alert variant="danger">{error}</Alert>;
    }

    if (isLoading) {
      return (
        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
          <Spinner className="m-2" />
          <h3>Loading URLs</h3>
        </div>
      );
    }

    if (urls.length === 0) {
      return <h2>No URLs have been shortened yet.</h2>;
    }

    return (
      <>
        <Table striped>
          <thead>
            <tr>
              <th>Created at</th>
              <th>Short URL</th>
              <th>Long URL</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url, index) => (
              <tr key={index}>
                <td>
                  {new Date(url.createdTimestampUtc).toLocaleDateString()} at{' '}
                  {new Date(url.createdTimestampUtc).toLocaleTimeString()}
                </td>
                <td><a href={url.shortenedUrl}>{getPath(url.shortenedUrl)}</a></td>
                <td><a href={url.longUrl}>{trimStr(url.longUrl)}</a></td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ButtonGroup className="mt-4 m-auto" hidden={totalPages === 1}>
          <Button
            variant="secondary"
            disabled={pageNumber < 1}
            onClick={() => setPageNumber(pageNumber - 1)}>
            Previous page
          </Button>
          <Button
            variant="secondary"
            disabled={pageNumber >= totalPages - 1}
            onClick={() => setPageNumber(pageNumber + 1)}>
            Next page
          </Button>
        </ButtonGroup>
      </>
    );
  };

  return <div className="h-100 d-flex flex-column">{getContent()}</div>;
}
