import './styles.scss';
import userService from './services/user.service';
import { appConfig } from './config/app-config';

/**
 * Make a request to the API for getting users in London.
 */
function getLondonUsers () {

  // Make request to the API.
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

  // TODO Add a function for getting users outside London but within 50 miles.

}
