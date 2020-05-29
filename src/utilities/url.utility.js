import { appConfig } from '../config/app-config';

/**
 * Make a request to the API.
 *
 * @param {string} suffix What to append to the API route URL.
 * @param {function} callback Function to call when a response is received which expects JSON.
 */
export function makeApiRequest (suffix, callback) {

  // Make a request to the API to get the users in the city.
  const request = new XMLHttpRequest();
  request.overrideMimeType('application/json');

  // Add handler for successful requests.
  request.addEventListener(
    'load',
    () => {
      callback(JSON.parse(request.responseText));
    }
  );

  // Add handler for erroneous requests.
  request.addEventListener(
    'error',
    () => {
      callback(false);
    }
  );

  // Send the request.
  request.open('GET', `${getApiURL()}/${suffix}`);
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