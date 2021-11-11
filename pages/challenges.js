import PageContainer from '../components/PageContainer';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Spinner, Alert, Table } from 'react-bootstrap';
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

  useEffect(() => {
    axios.get('https://api.topcoder.com/v5/challenges?type=CH').then((response) => {
      setRecords(response.data);
      setError('');
      setLoading(false);
    }).catch((err) => {
      setError(err.toString());
      setRecords([]);
      setLoading(false);
    })
  }, [])

  return (
    <PageContainer>

      <h1>Challenges</h1>

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
