import { parseISO } from 'date-fns';
import { formatDateRelative } from '../utilities';
import PropTypes from 'prop-types';

const RelativeDateCell = ({ children }) => {
  return (
    <td title={children && parseISO(children)}>
      {formatDateRelative(children)}
    </td>
  );
};

RelativeDateCell.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RelativeDateCell;
