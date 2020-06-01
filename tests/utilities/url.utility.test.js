import { makeApiRequest } from '../../src/utilities/url.utility';

// Tests for the URL Utility.
describe (
  'URL Utility', 
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

    // Test the successful use of the makeApiRequest function.
    it(
      'makeApiRequest should correctly handle successful requests',
      () => {

        // Establish testing variables.
        const expectedUrl = 'http://localhost:8080/api/test';

        // Call the method being tested.
        makeApiRequest('test');

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

    // Test the unsuccessful use of the makeApiRequest function.
    it(
      'makeApiRequest should correctly handle unsuccessful requests',
      () => {

        // Establish testing variables.
        const expectedUrl = 'http://localhost:8080/api/test'; 

        // Call the method being tested.
        makeApiRequest('test');

        // Generate a mock response to request called in method being tested.
        jasmine.Ajax.requests.mostRecent().respondWith(
          {
            'status': 404,
            'contentType': 'application/json',
            'responseText': 'false'
          }
        );

        // Check URLs match.
        expect(jasmine.Ajax.requests.mostRecent().url).toBe(expectedUrl);

      }
    );

  }
);
