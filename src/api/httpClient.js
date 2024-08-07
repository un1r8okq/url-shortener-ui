import axios from 'axios';
import axiosRetry from 'axios-retry';
import constants from '../constants';
import { sleep } from '../utilities';


const baseUrl = constants.apiBaseUrl;
const client = axios.create();

axiosRetry(client, {
  retries: 6,
  retryCondition: axiosRetry.isNetworkOrIdempotentRequestError,
  retryDelay: axiosRetry.exponentialDelay,
});

const httpClient = {
  /**
   * Sends an HTTP POST request and returns JSON
   * @param {String} path
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  post: async (path, data) => {
    try {
      const csrfResponse = await httpClient.get('/auth/csrf-token');

      const config = {
        headers: { 'X-CSRF-TOKEN': csrfResponse.data.token },
      };

      return await client.post(baseUrl + path, data, config);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw Error(`POST ${path} returned ${error.response.status}`);
      }

      if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest
        throw Error(`POST ${path} received no response`);
      }

      throw Error(
        `An unexpected error occurred setting up the request for POST ${path}`,
      );
    }
  },
  /**
   * Sends an HTTP GET request and returns JSON
   * @param {String} path
   * @returns {Promise<Object>}
   */
  get: async (path) => {
    try {
      await sleep(150);
      return await client.get(baseUrl + path);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw Error(`GET ${path} returned ${error.response.status}`);
      }

      if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest
        throw Error(`GET ${path} received no response`);
      }

      throw Error(
        `An unexpected error occurred setting up the request for GET ${path}`,
      );
    }
  },
};

export default httpClient;
