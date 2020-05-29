import { makeApiRequest } from '../utilities/url.utility';
import haversine from 'haversine';

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

  /**
   * Make requests to the API for getting users nearby the supplied city.
   *
   * @param {string} city The city to get users nearby.
   * @param {number} cityLatitude The longitude of the city.
   * @param {number} cityLongitude The longitude of the city.
   * @param {number} distance How close to the city the nearby users must be in miles.
   * @param {function} callback The function to handle the returned users.
   */
  getNearbyUsers (
    city,
    cityLatitude,
    cityLongitude,
    distance,
    callback
  ) {

    // Establish arrays of users from requests.
    let allUsers;
    let cityUsers;

    // Establish function to call on completing a request for finding valid users.
    const onSuccessfulResponse = () => {
      if (allUsers && cityUsers) {
        const relevantNearbyUsers = this.getRelevantUsersNearby(
          cityUsers,
          allUsers,
          cityLatitude,
          cityLongitude,
          distance
        );
        callback(relevantNearbyUsers);
      }
    };

    // Make request to the API for getting city users.
    userService.httpGetCityUsers(
      city,
      (users) => {
        if (users) {
          cityUsers = users;
          onSuccessfulResponse();
        } else {
          callback(false);
        }
      }
    );

    // Make request to the API for getting all users.
    userService.httpGetAllUsers(
      (users) => {
        if (users) {
          allUsers = users;
          onSuccessfulResponse();
        } else {
          callback(false);
        }
      }
    );

  }

  /**
   * Get users not in the city but nearby.
   *
   * @param {object[]} cityUsers Users to discount because they live in the city.
   * @param {object[]} allUsers All the users.
   * @param {number} cityLatitude The longitude of the city.
   * @param {number} cityLongitude The longitude of the city.
   * @param {number} distance How close to the city the nearby users must be in miles.
   * @returns {object[]} All the users nearby but not in the city.
   */
  getRelevantUsersNearby (
    cityUsers,
    allUsers,
    cityLatitude,
    cityLongitude,
    distance
  ) {

    // Filter out users in the city.
    const outsideCityUser = allUsers.filter(
      (user) => {
        return cityUsers.findIndex(
          (cityUser) => cityUser.id === user.id
        ) === -1;
      }
    );

    // Filter out users which are not nearby.
    const relevantNearbyUsers = outsideCityUser.filter(
      (user) => {

        // Get the distance between the co-ordinates using the haversine formula.
        const distanceFromCity = haversine(
          {
            latitude:  user['latitude'],
            longitude: user['longitude']
          },
          {
            latitude:  cityLatitude,
            longitude: cityLongitude
          },
          {
            unit: 'mile'
          }
        );
        return distanceFromCity < distance;
      }
    );

    // Return the relevant nearby users.
    return relevantNearbyUsers;

  }

}

/**
 * The service for managing users.
 */
const userService = new UserService();

// Make the service available.
export default userService;