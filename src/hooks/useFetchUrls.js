import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';

const useFetchUrls = (debouncedSearchText, pageNumber) => {
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      setLoading(true);
      setError('');
      setUrls([]);
      try {
        const { data, paginationMetadata } = await apiClient.getUrls(
          debouncedSearchText,
          pageNumber,
        );

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

  return { urls, totalPages, isLoading, error };
};

export default useFetchUrls;
