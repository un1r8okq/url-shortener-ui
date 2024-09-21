import { getPathFromUrl, trimStr } from '../utilities';
import PropTypes from 'prop-types';
import RelativeDateCell from '../components/RelativeDateCell';
import Table from 'react-bootstrap/Table';

const UrlTable = ({ urls }) => (
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
            <a href={url.shortenedUrl}>{getPathFromUrl(url.shortenedUrl)}</a>
          </td>
          <td>
            <a href={url.longUrl}>{trimStr(url.longUrl)}</a>
          </td>
          <RelativeDateCell>{url.lastVisitTimestampUtc}</RelativeDateCell>
        </tr>
      ))}
    </tbody>
  </Table>
);

UrlTable.propTypes = {
  urls: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UrlTable;
