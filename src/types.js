/**
 * @typedef {Object} UrlResponse
 * @property {String} longUrl
 * @property {String} shortenedUrl
 * @property {String} createdTimestampUtc
 * @property {?String} lastVisitTimestampUtc
 */

/**
 * @typedef {Object} PaginationMetadata
 * @property {Number} pageNumber
 * @property {Number} totalPages
 * @property {Number} pageSize
 */

/**
 * @typedef {Object} PagedUrlResponses
 * @property {Array<UrlResponse>} data
 * @property {?PaginationMetadata} paginationMetadata
 */

export const Types = {};
