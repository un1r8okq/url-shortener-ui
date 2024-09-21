import { getPathFromUrl, trimStr } from '../utilities';
import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import FormControl from 'react-bootstrap/FormControl';
import FormLabel from 'react-bootstrap/FormLabel';
import LoadingMessage from '../components/LoadingMessage';
import RelativeDateCell from '../components/RelativeDateCell';
import Table from 'react-bootstrap/Table';
import apiClient from '../api/apiClient';

export default function AllUrls() {
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
  const [totalPages, setTotalPages] = useState(1);
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  useEffect(() => {
    const fetchUrls = async () => {
      setLoading(true);
      setError('');
      setUrls([]);
      try {
        const { data, paginationMetadata } =
          await apiClient.getUrls(debouncedSearchText, pageNumber);

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
  }, [debouncedSearchText, pageNumber]);

  const centerContent = (jsx) => {
    return (
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        {jsx}
      </div>
    );
  };

  const getFormattedResults = () => {
    if (isLoading) {
      return <LoadingMessage message='Loading URLs' />;
    }

    if (urls.length === 0) {
      if (searchText) {
        return centerContent(<h2>No URLs matched your search.</h2>);  
      }

      return centerContent(<h2>No URLs have been shortened yet.</h2>);
    }

    return <>
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
    </>;
  };

  const getContent = () => {
    if (error !== '') {
      return centerContent(<Alert variant="danger">{error}</Alert>);
    }

    return (
      <>
        <div className="d-flex align-items-center mt-4 mb-1">
          <FormLabel className="my-0 me-2" htmlFor="search">Search:</FormLabel>
          <FormControl
            id="search"
            type="text"
            placeholder="Start typing any field..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            disabled={isLoading}
            autoFocus
          />
        </div>
        {getFormattedResults()}
      </>
    );
  };

  return <div className="h-100 w-100 d-flex flex-column">{getContent()}</div>;
}
