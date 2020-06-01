import './styles.scss';
import userService from './services/user.service';
import { appConfig } from './config/app-config';

/**
 * Token to parse to replace with city name.
 */
const cityToken = '%CITY%';

/**
 * Token to parse to replace with distance value.
 */
const distanceToken = '%DISTANCE%';

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

    // Add a listener for the nearby users buttons.
    const nearbyUsersButton = document.getElementById('nearby-users');
    nearbyUsersButton.addEventListener(
      'click',
      ()=> {

        // Disable the button then call the method for getting the nearby users.
        nearbyUsersButton.disabled = true;
        nearbyUsersButton.setAttribute('aria-disabled', true);
        showElement(userList, false);
        getNearbyUsers();

      }
    );

    // Sub in values for button.
    nearbyUsersButton.value = subInConfigValues(nearbyUsersButton.value);

    // Sub in values for introduction.
    const introduction = document.getElementById('intro');
    introduction.innerHTML = subInConfigValues(introduction.innerHTML);

    // Show contents.
    const container = document.getElementById('container');
    showElement(container, true);

  }
);

/**
 * Make requests to the API for getting users nearby the supplied city.
 */
function getNearbyUsers () {

  // Make request to the API.
  showSpinner(true);
  return userService.getNearbyUsers(
    appConfig.targetCity,
    appConfig.targetCityLatitude,
    appConfig.targetCityLongitude,
    appConfig.milesFromTargetCity
  )

  // Display the returned users on successful return.
  .then(
    (users) => {
      showSpinner(false);
      displayUsers(users);
    }
  )

  // Display an error on unsuccessful return.
  .catch(
    () => {
      showSpinner(false);
      displayError('Unable to retrieve nearby users');
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

  // Create a div to display the user list heading in.
  const headingDiv = document.createElement('h2');
  headingDiv.innerHTML = `Users in or within ${appConfig.milesFromTargetCity} miles of ${appConfig.targetCity}`;
  headingDiv.className = 'users-heading';
  userList.appendChild(headingDiv);

  // Loop through users.
  for (const user of users) {

    // Create a div to display user information in.
    const userDiv = document.createElement('div');
    userDiv.className = 'user-entry';

    // Create a header to display the user name in.
    const userHeader = document.createElement('h3');
    userHeader.className = 'user-header';
    const userFirstName = user['first_name'] ? user['first_name'] : '?';
    const userLastName = user['last_name'] ? user['last_name'] : '?';
    userHeader.innerHTML = `${userFirstName} ${userLastName}`;

    // Create a span to display the user e-mail in.
    const userSpan = document.createElement('h2');
    userSpan.className = 'user-span';
    const userEmail = user['email'] ? user['email'] : '?';
    userSpan.innerHTML = userEmail;

    // Attach the header and the span to the div.
    userDiv.appendChild(userHeader);
    userDiv.appendChild(userSpan);

    // Attach the div to the user-list div.
    userList.appendChild(userDiv);

  }

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
  showElement(userList, true);
}

/**
 * Substitute value in from config.
 *
 * @param {string} text The text to substitute.
 * @returns {string} The text with the substitution.
 */
function subInConfigValues (text) {

  // Sub in city.
  text = text.split(cityToken).join(appConfig.targetCity);

  // Sub in distance.
  text = text.split(distanceToken).join(appConfig.milesFromTargetCity);

  // Return the text with substitutions.
  return text;

}

/**
 * Control the visibility of the spinner.
 *
 * @param {boolean} show Flag determining whether to show the spinner (if true) or hide it.
 */
function showSpinner (show) {
  showElement(spinner, show);
}

/**
 * Control the visibility of an element.
 *
 * @param {boolean} show Flag determining whether to show the element (if true) or hide it.
 */
function showElement (element, show) {
  if (show) {
    element.classList.remove('hidden');
    element.classList.add('shown');
  } else {
    element.classList.remove('shown');
    element.classList.add('hidden');
  }
}
