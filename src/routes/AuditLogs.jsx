import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, Button, ButtonGroup, Spinner, Table } from 'react-bootstrap';

import RelativeDateCell from '../components/RelativeDateCell';

export default function AuditLogs() {
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      setLoading(true);
      setError('');
      setLogs([]);
      try {
        const response = await axios.get(
          `/api/v1/audit-logs?pageNumber=${pageNumber}`,
        );

        const { data, paginationMetadata } = response.data;

        setTotalPages(paginationMetadata.totalPages);
        setLogs(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(
          'Something went wrong when fetching the audit logs. Please try again later.',
        );
      }
    };

    fetchUrls();
  }, [pageNumber]);

  const translateLogType = (type) => ({
    url_visited: 'Visited',
    url_shortened: 'Shortened',
  }[type])

  const getContent = () => {
    if (error !== '') {
      return <Alert variant="danger">{error}</Alert>;
    }

    if (isLoading) {
      return (
        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
          <Spinner className="m-2" />
          <h3>Loading audit logs</h3>
        </div>
      );
    }

    if (logs.length === 0) {
      return <h2>No audit logs have been written yet.</h2>;
    }

    return (
      <>
        <Table striped>
          <thead>
            <tr>
              <th>Written</th>
              <th>Log Type</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index}>
                <RelativeDateCell>{log.createdTimestampUtc}</RelativeDateCell>
                <td>{translateLogType(log.logType)}</td>
                <td>{log.message}</td>
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
