import './styles.scss';
import userService from './services/user.service';
import { appConfig } from './config/app-config';

// Wait for DOM content to load.
document.addEventListener(
  'DOMContentLoaded',
  () => {

    // Add a listener for the city users buttons.
    const cityUsersButton = document.getElementById('city-users');
    cityUsersButton.addEventListener('click', getCityUsers);

    // Add a listener for the nearby users buttons.
    const nearbyUsersButton = document.getElementById('nearby-users');
    nearbyUsersButton.addEventListener('click', getNearbyUsers);

  }
);

/**
 * Make a request to the API for getting users in the supplied city.
 */
function getCityUsers () {

  // Make request to the API for city users.
  userService.httpGetCityUsers(
    appConfig.targetCity,
    (users) => {
      if (users) {
        // TODO Display users on page.
      } else {
        // TODO Display error to user.
      }
    }
  );

}

/**
 * Make requests to the API for getting users nearby the supplied city.
 */
function getNearbyUsers () {

  // Establish arrays of users from requests.

  // Make request to the API.
  userService.getNearbyUsers(
    appConfig.targetCity,
    appConfig.targetCityLatitude,
    appConfig.targetCityLongitude,
    appConfig.milesFromTargetCity,
    (users) => {
      if (users) {
        // TODO Display users on page.
      } else {
        // TODO Display error to user.
      }
    }
  );

}

// TODO Function for populating the user list.

// TODO Function for showing an error.
