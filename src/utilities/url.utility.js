import { appConfig } from '../config/app-config';
import { log } from './logging.utility';

/**
 * Make a request to the API.
 *
 * @param {string} suffix What to append to the API route URL.
 * @param {function} callback Function to call when a response is received which expects JSON.
 */
export function makeApiRequest (suffix, callback) {

  // Build URL to make request to.
  const url = `${getApiURL()}/${suffix}`;

  // Make a request to the API to get the users in the city.
  const request = new XMLHttpRequest();
  request.overrideMimeType('application/json');

  // Add handler for successful requests.
  request.addEventListener(
    'load',
    () => {
      log(`Received successful response from ${url}`);
      const responseJson = JSON.parse(request.responseText);
      log(responseJson);
      callback(responseJson);
    }
  );

  // Add handler for erroneous requests.
  request.addEventListener(
    'error',
    () => {
      log(`Received erroneous response from ${url}`);
      callback(false);
    }
  );

  // Send the request.
  log(`Sending request to ${url}`);
  request.open('GET', url);
  request.send();

}

/**
 * Get the API URL (with proxy prefix if needed.)
 */
function getApiURL () {
  return `${getUrlPrefix()}${appConfig.apiUrl}`;
}

/**
 * Prefix a proxy to the URL is running from a dev environment to avoid local CORS issues.
 */
function getUrlPrefix () {
  const env = process.env.NODE_ENV || 'development';
  if (env !== 'development') {
    return '';
  } else {
    return 'https://cors-anywhere.herokuapp.com/';
  }
}