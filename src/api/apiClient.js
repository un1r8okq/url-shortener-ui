import httpClient from './httpClient';
import constants from '../constants';

const apiClient = {
  /**
   *
   * @param {Number} pageNumber
   * @returns {Promise<PagedUrlResponses>}
   */
  getUrls: async (pageNumber) => {
    const response = await httpClient.get(
      `${constants.apiBaseUrl}/urls?pageNumber=${pageNumber}`,
    );

    return response.data;
  },
};

export default apiClient;
