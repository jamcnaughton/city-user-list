import userService from '../../src/services/user.service';

// Tests for the User Service.
describe (
  'User Service', 
  () => {

    // Before each test set up mock Ajax handling.
    beforeEach(
      () => {
        jasmine.Ajax.install();
      }
    );    

    // After each test set up mock Ajax handling.
    afterEach(
      () => {
        jasmine.Ajax.uninstall();
      }
    );

    // Test the use of the httpGetCityUsers function.
    it(
      'httpGetCityUsers should correctly build the request URL',
      () => {

        // Establish testing variables.
        const expectedUrl = 'https://bpdts-test-app.herokuapp.com/city/Test/users';
        const onLoad = jasmine.createSpy();  

        // Call the method being tested.
        userService.httpGetCityUsers(
          'Test',
          onLoad
        );

        // Generate a mock response to request called in method being tested.
        jasmine.Ajax.requests.mostRecent().respondWith(
          {
            'status': 200,
            'contentType': 'application/json',
            'responseText': '[]'
          }
        );

        // Check URLs match.
        expect(jasmine.Ajax.requests.mostRecent().url).toBe(expectedUrl);

        // Check callback called.
        expect(onLoad).toHaveBeenCalled();

      }
    );

    // Test the use of the httpGetCityUsers function.
    it(
      'httpGetCityUsers should correctly build the request URL',
      () => {

        // Establish testing variables.
        const expectedUrl = 'https://bpdts-test-app.herokuapp.com/users';
        const onLoad = jasmine.createSpy();  

        // Call the method being tested.
        userService.httpGetAllUsers(
          onLoad
        );

        // Generate a mock response to request called in method being tested.
        jasmine.Ajax.requests.mostRecent().respondWith(
          {
            'status': 200,
            'contentType': 'application/json',
            'responseText': '[]'
          }
        );

        // Check URLs match.
        expect(jasmine.Ajax.requests.mostRecent().url).toBe(expectedUrl);

        // Check callback called.
        expect(onLoad).toHaveBeenCalled();

      }
    );

    // Test the use of the getNearbyUsers function.
    it(
      'getNearbyUsers should list no users from the city',
      () => {

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
            id: 2
          },
          {
            id: 3
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
        const expectedUrlOne = 'https://bpdts-test-app.herokuapp.com/city/Test/users';
        const expectedUrlTwo = 'https://bpdts-test-app.herokuapp.com/users';
        const expectedResultsLength = 3;
        let resultsLength = 0;
        const onLoad = (users) => {
          resultsLength = users.length;
        }

        // Call the method being tested.
        userService.getNearbyUsers (
          'Test',
          0,
          0,
          50,
          onLoad
        );

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

        // Check the expected number of users are returned.
        expect(resultsLength === expectedResultsLength)
        .withContext('should have returned 3 users')
        .toBeTrue();

      }
    );

  }
);
