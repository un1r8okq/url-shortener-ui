import constants from '../constants';
import httpClient from './httpClient';

/**
 * @typedef {Object} AuditLogResponse
 * @property {Number} id
 * @property {String} createdTimestampUtc
 * @property {String} logType
 * @property {String} message
 */

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
 * @typedef {Object} PagedAuditLogResponses
 * @property {Array<AuditLogResponse>} data
 * @property {?PaginationMetadata} paginationMetadata
 */

/**
 * @typedef {Object} PagedUrlResponses
 * @property {Array<UrlResponse>} data
 * @property {?PaginationMetadata} paginationMetadata
 */

/**
 * @typedef {Object} UserResponse
 * @property {String} name
 * @property {String} email
 */

const baseUrl = constants.apiBaseUrl;

const apiClient = {
  /**
   * Get all audit logs by page
   * @param {Number} pageNumber
   * @returns {Promise<AuditLogResponse>}
   */
  getAuditLogs: async (pageNumber) => {
    const response = await httpClient.get(`${baseUrl}/audit-logs?pageNumber=${pageNumber}`);

    return response.data;
  },
  /**
   * Get all shortened URLs by page
   * @param {Number} pageNumber
   * @returns {Promise<PagedUrlResponses>}
   */
  getUrls: async (pageNumber) => {
    const response = await httpClient.get(`${baseUrl}/urls?pageNumber=${pageNumber}`);

    return response.data;
  },
  /**
   * Get currently authenticated user
   * @returns {Promise<?UserResponse>}
   */
  getAuthenticatedUser: async () => {
    const response = await httpClient.get(`${baseUrl}/auth/user`);

    return response.data;
  },
  logout: async () => {
    await httpClient.post('/logout', null);
  },
  /**
   * Shorten a long URL
   * @param {String} longUrl 
   */
  shortenUrl: async (longUrl) => {
    const response = await httpClient.post(`${baseUrl}/urls`, { longUrl });

    return response.data;
  },
};

export default apiClient;
