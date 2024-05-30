import { parseISO } from 'date-fns';
import { formatDateRelative } from '../utilities';

export default function RelativeDateCell({ children }) {
    return (
        <td title={children && parseISO(children)}>
            {formatDateRelative(children)}
        </td>
    );
}
