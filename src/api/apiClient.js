import httpClient from './httpClient';

const apiClient = {
  /**
   * Get all shortened URLs by page
   * @param {Number} pageNumber
   * @returns {Promise<PagedUrlResponses>}
   */
  getUrls: async (pageNumber) => {
    const response = await httpClient.get(`/urls?pageNumber=${pageNumber}`);

    return response.data;
  },
  /**
   * Shorten a long URL
   * @param {String} longUrl 
   */
  shortenUrl: async (longUrl) => {
    const response = await httpClient.post('/urls', { longUrl });

    return response.data;
  },
};

export default apiClient;
