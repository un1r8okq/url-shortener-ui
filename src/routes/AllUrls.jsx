import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Table from 'react-bootstrap/Table';

import apiClient from '../api/apiClient';
import { getPathFromUrl, trimStr } from '../utilities';
import RelativeDateCell from '../components/RelativeDateCell';
import LoadingMessage from '../components/LoadingMessage';

export default function AllUrls() {
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      setLoading(true);
      setError('');
      setUrls([]);
      try {
        const { data, paginationMetadata } =
          await apiClient.getUrls(pageNumber);

        setTotalPages(paginationMetadata.totalPages);
        setUrls(data);
        setLoading(false);
      } catch (error) {
        setError(
          'Something went wrong when fetching the list of URLs. Please try again later.',
        );
      }
    };

    fetchUrls();
  }, [pageNumber]);

  const centerContent = (jsx) => {
    return (
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        {jsx}
      </div>
    );
  };

  const getContent = () => {
    if (error !== '') {
      return centerContent(<Alert variant="danger">{error}</Alert>);
    }

    if (isLoading) {
      return <LoadingMessage message='Loading URLs' />;
    }

    if (urls.length === 0) {
      return centerContent(<h2>No URLs have been shortened yet.</h2>);
    }

    return (
      <>
        <Table striped>
          <thead>
            <tr>
              <th>Created</th>
              <th>Short URL</th>
              <th>Long URL</th>
              <th>Last visited</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url, index) => (
              <tr key={index}>
                <RelativeDateCell>{url.createdTimestampUtc}</RelativeDateCell>
                <td>
                  <a href={url.shortenedUrl}>
                    {getPathFromUrl(url.shortenedUrl)}
                  </a>
                </td>
                <td>
                  <a href={url.longUrl}>{trimStr(url.longUrl)}</a>
                </td>
                <RelativeDateCell>{url.lastVisitTimestampUtc}</RelativeDateCell>
              </tr>
            ))}
          </tbody>
        </Table>
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
      </>
    );
  };

  return <div className="h-100 d-flex flex-column">{getContent()}</div>;
}
