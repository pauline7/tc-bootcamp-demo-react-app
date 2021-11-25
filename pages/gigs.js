import PageContainer from '../components/PageContainer';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Spinner, Alert, Table, ButtonGroup, Button, Stack } from 'react-bootstrap';


/**
 * Gigs page which is accessible by "/gigs" route.
 */
export default function Gigs() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pages, setPages] = useState('10');

  useEffect(() => {
    // any time when we reload data, show loading indicator first
    setLoading(true);

    axios.get(`https://platform.topcoder.com/gigs-app/api/my-gigs/jobs?sortBy=createdAt&sortOrder=desc&isApplicationPageActive=true&rcrmStatus=Open&perPage=${pages}`).then((response) => {
      setRecords(response.data);
      setError('');
      setLoading(false);
    }).catch((err) => {
      setError(err.toString());
      setRecords([]);
      setLoading(false);
    })
  },
    [pages] // every time when any variable in this array changes the code in `useEffect` would be executed again
  )

  return (
    <PageContainer>

      <h1>Gigs</h1>

      <Stack direction="horizontal" gap={3}>
        Per page:
        <ButtonGroup className="me-2" aria-label="First group">
          <Button onClick={() => setPages('10')} disabled={pages === '10'}>10</Button>
          <Button onClick={() => setPages('25')} disabled={pages === '25'}>25</Button>
          <Button onClick={() => setPages('50')} disabled={pages === '50'}>50</Button>
        </ButtonGroup>
      </Stack>

      {loading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      {!loading && !!error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <Table striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Weekly Payment</th>
              <th>Location</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>
                  <a
                    href={`https://www.topcoder.com/gigs/${record.jobExternalId}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {record.title}
                  </a>
                </td>
                <td>{record.payment.currency}{record.payment.min} - {record.payment.currency}{record.payment.max}</td>
                <td>{record.location}</td>
                <td>{record.duration} weeks</td>
              </tr>
          ))}
          </tbody>
        </Table>
      )}
    </PageContainer>
  )
}
