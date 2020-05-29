import { makeApiRequest } from '../utilities/url.utility';

/**
 * Class for managing user-related requests.
 */
class UserService {

  /**
   * Get the list of users in a city from the API.
   *
   * @param {string} city The city to get users for.
   * @param {function} callback The function to handle the returned users.
   */
  httpGetCityUsers (city, callback) {

    // Use the URL utility to make the request.
    makeApiRequest(
      `city/${city}/users`,
      callback
    );

  }

  /**
   * Get the list of all the users from the API.
   *
   * @param {function} callback The function to handle the returned users.
   */
  httpGetAllUsers ( callback) {

    // Use the URL utility to make the request.
    makeApiRequest(
      `users`,
      callback
    );

  }

  // TODO Function for getting users with X-miles of supplied co-ordinates.

}

/**
 * The service for managing users.
 */
const userService = new UserService();

// Make the service available.
export default userService;