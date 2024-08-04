import httpClient from './httpClient';
import constants from '../constants';

const apiClient = {
  /**
   * Get all shortened URLs by page
   * @param {Number} pageNumber
   * @returns {Promise<PagedUrlResponses>}
   */
  getUrls: async (pageNumber) => {
    const response = await httpClient.get(
      `${constants.apiBaseUrl}/urls?pageNumber=${pageNumber}`,
    );

    return response.data;
  },
  /**
   * Shorten a long URL
   * @param {String} longUrl 
   */
  shortenUrl: async (longUrl) => {
    const response = await httpClient.post('/api/v1/urls', { longUrl });

    return response.data;
  },
};

export default apiClient;
