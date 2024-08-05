import PropTypes from 'prop-types';
import { formatDateRelative } from '../utilities';
import { parseISO } from 'date-fns';

const RelativeDateCell = ({ children }) => {
  return (
    <td title={children && parseISO(children)}>
      {formatDateRelative(children)}
    </td>
  );
};

RelativeDateCell.propTypes = {
  children: PropTypes.string,
};

export default RelativeDateCell;
