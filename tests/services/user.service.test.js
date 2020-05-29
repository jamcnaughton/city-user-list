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
            'status':200,
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

  }
);
