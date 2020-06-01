import { setupMainComponentContent } from '../src';
import { appConfig } from '../src/config/app-config';

// Tests for the Core Component.
describe (
  'Core Component', 
  () => {

    // Before each test set up the contents of the document and set up mock Ajax handling.
    beforeEach (
      () => {
        jasmine.Ajax.install();
        const fixture = `
          <div id="container" class="hidden">

          <h1 class="main-heading">
            Find Nearby Users
          </h1>
      
          <div id="intro" class="introduction">
            This page allows you to find users in and nearby to a specific city.
            Currently it is configured to find users either in %CITY% or living within %DISTANCE% miles of %CITY%.
          </div>
      
          <div class="controls">
      
            <input
            id="nearby-users"
            class="request-button"
            type="button"
            value="Get users in or nearby to %CITY%"
            tabindex="1"/>
      
            <div id="spinner" class="spinner hidden" aria-hidden="true">
              <div class="loader"></div> 
            </div>
      
          </div>
      
          <div id="user-list">
          </div>
      
          <script src="<%= htmlWebpackPlugin.files.chunks.main.entry %>">
          </script>
      
        </div>`;
        document.querySelector('body').innerHTML += fixture;
        appConfig.targetCity = 'Test';
        appConfig.targetCityLatitude = 0;
        appConfig.targetCityLongitude = 0;
        appConfig.milesFromTargetCity = 50;
        setupMainComponentContent();
      }
    );

    // After each test clear the contents of the document and remove mock Ajax handling.
    afterEach(
      () => {
        jasmine.Ajax.uninstall();
        const element = document.querySelector('#container');
        element.parentNode.removeChild(element);
      }
    );

    // Test the use of the showElement function.
    it(
      'should be able to see user results when pressing the request button when there are valid users',
      (done) => {

        // Mock user lists.
        const mockCityUsers = [
          {
            id: 1,
          },
          {
            id: 2
          },
          {
            id: 2
          }
        ];
        const mockAllUsers = [
          {
            id: 1
          },
          {
            id: 4,
            longitude: 0,
            latitude: 0
          },
          {
            id: 5,
            longitude: 0,
            latitude: 0
          },
          {
            id: 6,
            longitude: 0,
            latitude: 0
          }
        ];

        // Establish testing variables.
        const expectedUrlOne = 'http://localhost:8080/api/city/Test/users';
        const expectedUrlTwo = 'http://localhost:8080/api/users';

        // Get the element to test.
        const nearbyUsersButton = document.getElementById('nearby-users');

        // Add listener to wait for change to user list.
        const userList = document.getElementById('user-list');
        const observer = new MutationObserver(
          (mutationsList, observer) => {

            // Check for shown class to be added.
            let hasCompleted = false;
            for (const mutation of mutationsList) {
              if (mutation.attributeName === 'class') {
                if (mutation.target.classList.contains('shown')) {
                  observer.disconnect();
                  hasCompleted = true;
                  break;
                }
              }
            }

            // Check if this needs to be removed now.
            if (hasCompleted) {

              // Check number of user-entries.
              const userEntries = document.getElementsByClassName('user-entry')
              expect(userEntries.length === 6)
              .withContext('should have 6 users returned')
              .toBeTrue();

              // Complete the test.
              done();

            }

          }
        );
        observer.observe(
          userList,
          {
            attributes: true,
            childList: false,
            subtree: false
          }
        );

        // Interact with the element.
        nearbyUsersButton.click();

        // Generate mock responses to requests called in method being tested.
        jasmine.Ajax.requests.first().respondWith(
          {
            'status': 200,
            'contentType': 'application/json',
            'responseText': JSON.stringify(mockCityUsers)
          }
        );
        jasmine.Ajax.requests.mostRecent().respondWith(
          {
            'status': 200,
            'contentType': 'application/json',
            'responseText': JSON.stringify(mockAllUsers)
          }
        );

        // Check URLs match.
        expect(jasmine.Ajax.requests.first().url).toBe(expectedUrlOne);
        expect(jasmine.Ajax.requests.mostRecent().url).toBe(expectedUrlTwo);

      }
    );



    // Test the use of the showElement function.
    it(
      'should be able to see info message when pressing the request button when there are no valid users',
      (done) => {

        // Mock user lists.
        const mockCityUsers = [];
        const mockAllUsers = [
          {
            id: 1
          },
          {
            id: 4,
            longitude: 100,
            latitude: 100
          },
          {
            id: 5,
            longitude: 100,
            latitude: 100
          },
          {
            id: 6,
            longitude: 100,
            latitude: 100
          }
        ];

        // Establish testing variables.
        const expectedUrlOne = 'http://localhost:8080/api/city/Test/users';
        const expectedUrlTwo = 'http://localhost:8080/api/users';

        // Get the element to test.
        const nearbyUsersButton = document.getElementById('nearby-users');

        // Add listener to wait for change to user list.
        const userList = document.getElementById('user-list');
        const observer = new MutationObserver(
          (mutationsList, observer) => {

            // Check for shown class to be added.
            let hasCompleted = false;
            for (const mutation of mutationsList) {
              if (mutation.attributeName === 'class') {
                if (mutation.target.classList.contains('shown')) {
                  observer.disconnect();
                  hasCompleted = true;
                  break;
                }
              }
            }

            // Check if this needs to be removed now.
            if (hasCompleted) {

              // Check if info-message is present.
              const userEntries = document.getElementsByClassName('info-message')
              expect(userEntries.length === 1)
              .withContext('should have 1 info message present')
              .toBeTrue();

              // Complete the test.
              done();

            }

          }
        );
        observer.observe(
          userList,
          {
            attributes: true,
            childList: false,
            subtree: false
          }
        );

        // Interact with the element.
        nearbyUsersButton.click();

        // Generate mock responses to requests called in method being tested.
        jasmine.Ajax.requests.first().respondWith(
          {
            'status': 200,
            'contentType': 'application/json',
            'responseText': JSON.stringify(mockCityUsers)
          }
        );
        jasmine.Ajax.requests.mostRecent().respondWith(
          {
            'status': 200,
            'contentType': 'application/json',
            'responseText': JSON.stringify(mockAllUsers)
          }
        );

        // Check URLs match.
        expect(jasmine.Ajax.requests.first().url).toBe(expectedUrlOne);
        expect(jasmine.Ajax.requests.mostRecent().url).toBe(expectedUrlTwo);

      }
    );

  }
);
