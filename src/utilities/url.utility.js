import { appConfig } from '../config/app-config';
import { log } from './logging.utility';

/**
 * Make a request to the API.
 *
 * @param {string} suffix What to append to the API route URL.
 * @returns A promise to make the request to the API.
 */
export function makeApiRequest (suffix) {

  // Return as a promise.  
  return new Promise(
    (resolve, reject) => {

      // Build URL to make request to.
      const url = `${appConfig.apiUrl}/${suffix}`;

      // Make a request to the API to get the users in the city.
      const request = new XMLHttpRequest();
      request.overrideMimeType('application/json');

      // Add handler for successful requests.
      request.addEventListener(
        'load',
        () => {

          // Check if successful response received.
          if (request.status >= 200 && request.status < 300) {

            // Handle successful response.
            log(`Received successful response from ${url}`);
            const responseJson = JSON.parse(request.responseText);
            log(responseJson);
            resolve(responseJson);
            
          } else {

            // Handle unsuccessful response.
            log(`Received unsuccessful response from ${url}`);
            reject(false);

          }

        }
      );

      // Add handler for erroneous requests.
      request.addEventListener(
        'error',
        () => {
          log(`Received erroneous response from ${url}`);
          reject(false);
        }
      );

      // Send the request.
      log(`Sending request to ${url}`);
      request.open('GET', url);
      request.send();

    }
  );

}
