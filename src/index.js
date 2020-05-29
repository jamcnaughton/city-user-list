import './styles.scss';
import userService from './services/user.service';
import { appConfig } from './config/app-config';

/**
 * The user-list element to manipulate.
 */
let userList;

/**
 * The spinner element to manipulate.
 */
let spinner;

// Wait for DOM content to load.
document.addEventListener(
  'DOMContentLoaded',
  () => {

    // Get the elements to manipulate.
    userList = document.getElementById('user-list');
    spinner = document.getElementById('spinner');

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
  showSpinner(true);
  userService.httpGetCityUsers(
    appConfig.targetCity,
    (users) => {
      showSpinner(false);
      if (users) {
        displayUsers(users);
      } else {
        displayError('Unable to retrieve users in the city');
      }
    }
  );

}

/**
 * Make requests to the API for getting users nearby the supplied city.
 */
function getNearbyUsers () {

  // Make request to the API.
  showSpinner(true);
  userService.getNearbyUsers(
    appConfig.targetCity,
    appConfig.targetCityLatitude,
    appConfig.targetCityLongitude,
    appConfig.milesFromTargetCity,
    (users) => {
      showSpinner(false);
      if (users) {
        displayUsers(users);
      } else {
        displayError('Unable to retrieve users nearby to the city');
      }
    }
  );

}

/**
 * Display the list of users in the main component.
 *
 * @param {{}[]} users An array of users
 */
function displayUsers (users) {

  // Clear user-list.
  clearUserList();

  // TODO Display the list of users in the user list (handle empty lists too).

}

/**
 * Show an error message in the main component.
 *
 * @param {string} message The message to show the user.
 */
function displayError (message) {

  // Clear user-list.
  clearUserList();

  // Display an error message in the user list.
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.innerHTML = message;
  userList.appendChild(errorDiv);

}

/**
 * Clear the contents of the user list.
 */
function clearUserList () {
  for (const child of userList.children) {
    userList.removeChild(child);
  }
}

/**
 * Control the visibility of the spinner.
 *
 * @param {boolean} show Flag determining whether to show the spinner (if true) or hide it.
 */
function showSpinner (show) {
  if (show) {
    spinner.classList.remove('hidden');
  } else {
    spinner.classList.add('hidden');
  }
}
