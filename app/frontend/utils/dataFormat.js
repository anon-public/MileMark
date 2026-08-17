import daysjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

daysjs.extend(relativeTime);

export const FormatStandardDate = (dateString) => {
    if (!dateString) return '';
    return daysjs(dateString).format('MMM D, YYYY');
};

export const FormatRelativeDate = (dateString) => {
    if (!dateString) return '';
    return daysjs(dateString).fromNow();
}