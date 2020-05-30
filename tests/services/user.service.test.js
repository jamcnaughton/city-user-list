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
        const expectedUrl = 'http://localhost:8080/api/city/Test/users';

        // Call the method being tested.
        userService.httpGetCityUsers('Test');

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

      }
    );

    // Test the use of the httpGetAllUsers function.
    it(
      'httpGetAllUsers should correctly build the request URL',
      () => {

        // Establish testing variables.
        const expectedUrl = 'http://localhost:8080/api/users';

        // Call the method being tested.
        userService.httpGetAllUsers();

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

      }
    );

    // Test the use of the getNearbyUsers function.
    it(
      'getNearbyUsers should list all city users and those nearby',
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
        const expectedResultsLength = 6;

        // Call the method being tested.
        userService.getNearbyUsers (
          'Test',
          0,
          0,
          50
        )
        .then(
          (users) => {

            // Check the expected number of users are returned.
            expect(users.length === expectedResultsLength)
            .withContext('should have returned 6 users')
            .toBeTrue();

            // Inform that test is done.
            done();

          }
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

      }
    );

  }
);
