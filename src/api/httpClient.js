import axios from 'axios';
import axiosRetry from 'axios-retry';
import constants from '../constants';
import { sleep } from '../utilities';

const axiosInstance = axios.create();

axiosRetry(axiosInstance, {
  retries: 6,
  retryCondition: axiosRetry.isNetworkOrIdempotentRequestError,
  retryDelay: axiosRetry.exponentialDelay,
});

/**
 * Register a function to be called when the httpclient returns 403 Forbidden.
 * Call this from within an Effect.
 * @param {Function} logoutFn 
 * @returns {Function}
 */
const interceptForbidden = (logoutFn) => {
  const interceptor = axiosInstance.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === axios.HttpStatusCode.Forbidden) {
        logoutFn();
      }

      return Promise.reject(error);
    },
  );

  return () => {
    axiosInstance.interceptors.response.eject(interceptor);
  };
};

const httpClient = {
  /**
   * Sends an HTTP POST request and returns JSON
   * @param {String} path
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  post: async (path, data) => {
    try {
      const csrfResponse = await httpClient.get(`${constants.apiBaseUrl}/auth/csrf-token`);

      const config = {
        headers: { 'X-CSRF-TOKEN': csrfResponse.data.token },
      };

      return await axiosInstance.post(path, data, config);
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
      return await axiosInstance.get(path);
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
export { interceptForbidden };
