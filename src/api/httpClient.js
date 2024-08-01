import axios from 'axios';
import axiosRetry from 'axios-retry';

const client = axios.create();

axiosRetry(client, {
  retries: 6,
  retryCondition: axiosRetry.isNetworkOrIdempotentRequestError,
  retryDelay: axiosRetry.exponentialDelay,
});

const httpClient = {
  /**
   * Sends an HTTP get request and returns JSON
   * @param {string} path
   * @returns {Promise<Object>}
   */
  get: async (path) => {
    try {
      return await client.get(path);
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

      console.log(error);
      throw Error(
        `An unexpected error occurred setting up the request for GET ${path}`,
      );
    }
  },
};

export default httpClient;