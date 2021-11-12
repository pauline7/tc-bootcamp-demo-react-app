import PageContainer from '../components/PageContainer';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Spinner, Alert, Table, ButtonToolbar, ButtonGroup, Button, Stack } from 'react-bootstrap';
import moment from 'moment';

/**
 * Format challenge prizes
 *
 * @param {Object} prizeSets challenge prize sets
 * @returns comma separated list of prizes
 */
function formatPrizes(prizeSets) {
  const placementPrizeSet = prizeSets && prizeSets.find((prizeSet) =>
    prizeSet.type === 'placement'
  )

  if (!placementPrizeSet || !placementPrizeSet.prizes) {
    return '-'
  }

  return placementPrizeSet.prizes.map((prize) => '$' + prize.value).join(', ')
}

/**
 * Format date
 *
 * @param {String} dateString date
 * @returns formatted date
 */
function formatDate(dateString) {
  return moment(dateString).format('DD MMM, YYYY, HH:mm')
}

/**
 * Challenges page which is accessible by "/challenges" route.
 */
export default function Challenges() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    // any time when we reload data, show loading indicator first
    setLoading(true);

    axios.get(`https://api.topcoder.com/v5/challenges?type=CH&sortOrder=asc&sortBy=${sortBy}`).then((response) => {
      setRecords(response.data);
      setError('');
      setLoading(false);
    }).catch((err) => {
      setError(err.toString());
      setRecords([]);
      setLoading(false);
    })
  },
    [sortBy] // every time when any variable in this array changes the code in `useEffect` would be executed again
  )

  return (
    <PageContainer>

      <h1>Challenges</h1>

      <Stack direction="horizontal" gap={3}>
        Sort by:
        <ButtonGroup className="me-2" aria-label="First group">
          <Button onClick={() => setSortBy('name')} disabled={sortBy === 'name'}>Name</Button>
          <Button onClick={() => setSortBy('startDate')} disabled={sortBy === 'startDate'}>Start Date</Button>
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
              <th>Prizes</th>
              <th>Registration Start Date</th>
              <th>Submission End Date</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>
                  <a
                    href={`https://www.topcoder.com/challenges/${record.id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {record.name}
                  </a>
                </td>
                <td>{formatPrizes(record.prizeSets)}</td>
                <td>{formatDate(record.registrationStartDate)}</td>
                <td>{formatDate(record.submissionEndDate)}</td>
              </tr>
          ))}
          </tbody>
        </Table>
      )}
    </PageContainer>
  )
}
