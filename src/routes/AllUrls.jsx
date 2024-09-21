import Alert from 'react-bootstrap/Alert';
import FormControl from 'react-bootstrap/FormControl';
import FormLabel from 'react-bootstrap/FormLabel';
import LoadingMessage from '../components/LoadingMessage';
import PaginationControls from '../components/PaginationControls';
import UrlTable from '../components/UrlTable';
import useDebouncedValue from '../hooks/useDebouncedValue';
import useFetchUrls from '../hooks/useFetchUrls';
import { useState } from 'react';

export default function AllUrls() {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearchText] = useState('');

  const debouncedSearchText = useDebouncedValue(searchText, 500);
  const { urls, totalPages, isLoading, error } = useFetchUrls(debouncedSearchText, pageNumber);

  const centerContent = (jsx) => {
    return (
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        {jsx}
      </div>
    );
  };

  const getBody = () => {
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
      <UrlTable urls={urls} />
      <PaginationControls
        pageNumber={pageNumber}
        totalPages={totalPages}
        setPageNumber={setPageNumber}
      />
    </>;
  };

  return (
    <div className="h-100 w-100 d-flex flex-column">
      {
        error ? (
          centerContent(<Alert variant="danger">{error}</Alert>)
        ) : (
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
            {getBody()}
          </>
        )
      }
    </div>
  );
}
