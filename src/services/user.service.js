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
   * @returns A promise to make the request to the API.
   */
  httpGetCityUsers (city) {
    return makeApiRequest(`city/${city}/users`);
  }

  /**
   * Get the list of all the users from the API.
   *
   * @returns A promise to make the request to the API.
   */
  httpGetAllUsers () {
    return makeApiRequest(`users`);
  }

  /**
   * Make requests to the API for getting users nearby the supplied city.
   *
   * @param {string} city The city to get users nearby.
   * @param {number} cityLatitude The longitude of the city.
   * @param {number} cityLongitude The longitude of the city.
   * @param {number} distance How close to the city the nearby users must be in miles.
   * @returns A promise to get all the relevant nearby users.
   */
  getNearbyUsers (
    city,
    cityLatitude,
    cityLongitude,
    distance
  ) {

    // Build array for holding promises.
    const promises = [];

    // Establish arrays of users from requests.
    let allUsers;
    let cityUsers;

    // Make a promise to request city users.
    promises.push(
      userService.httpGetCityUsers(city)
      .then(
        (users) => cityUsers = users
      )
    );

    // Make a promise to request all users.
    promises.push(
      userService.httpGetAllUsers()
      .then(
        (users) => allUsers = users
      )
    );

    // Execute both the promises.
    return Promise.all(promises)

    // Process the returned promises.
    .then(
      () => {

        // Return all the relevant users nearby.
        return this.getRelevantUsersNearby(
          cityUsers,
          allUsers,
          cityLatitude,
          cityLongitude,
          distance
        );

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

    // Combine lists of users (flagging if they are in the city or just nearby).
    const nearbyUsers = [];
    for (const user of cityUsers) {
      user['inCity'] = true;
      nearbyUsers.push(user);
    }
    for (const user of relevantNearbyUsers) {
      user['inCity'] = false;
      nearbyUsers.push(user);
    }

    // Return the nearby users.
    return nearbyUsers;

  }

}

/**
 * The service for managing users.
 */
const userService = new UserService();

// Make the service available.
export default userService;