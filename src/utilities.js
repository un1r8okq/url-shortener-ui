import { formatRelative, parseISO } from 'date-fns';

/**
 * Capitalize the first letter of a string
 * 
 * @param {string} str 
 * @returns {string}
 */
export const capitalizeFirstLetter = (str) => {
    if (str.length === 0) {
        return str;
    }

    return str.charAt(0).toUpperCase() + str.slice(1)
};

/**
 * Take an ISO8601 date time string and return it as a human readable string 
 * relative to now.
 * 
 * @param {string?} isoDateTimeStr 
 * @returns {string}
 */
export const formatDateRelative = (isoDateTimeStr) => {
    if (isoDateTimeStr == null) {
        return 'Never';
    }

    const then = parseISO(isoDateTimeStr);
    const now = new Date();

    return capitalizeFirstLetter(formatRelative(then, now));
}

/**
 * Get the path component of a URL
 * 
 * @param {string} url
 * @returns {?string}
 */
export const getPathFromUrl = (urlStr) => {
    if (!URL.canParse(urlStr)) {
        return null;
    }

    const url = new URL(urlStr);

    return url.pathname;
};

/**
 * Shorten string to a specified length, adding ellipses
 * 
 * @param {string} str 
 * @returns {string}
 */
export const trimStr = (str) => {
    const maxLen = 50;

    if (str.length <= maxLen) {
        return str;
    }

    return str.substring(0, maxLen - 3) + '...';
};
