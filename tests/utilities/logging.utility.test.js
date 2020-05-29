import { log } from "../../src/utilities/logging.utility";

// Tests for the Logging Utility.
describe (
  'Logging Utility', 
  () => {

    // Test the log will not output anything when not in development.
    it(
      'log should not output anything outside of the development environment',
      () => {

        // Spy on the console log.
        spyOn(console, 'log');

        // Establish testing variables.
        log('test');

        // Check log not called.
        expect(console.log).not.toHaveBeenCalled();

      }
    );

  }
);
