// Tests for the Core Component.
describe (
  'Core Component', 
  () => {

    // Before each test set up the contents of the document.
    beforeEach (
      () => {
        const fixture = `
          <div class="test">
            Test
          </div>`;
        document.querySelector('body').innerHTML += fixture;
      }
    );

    // After each test clear the contents of the document.
    afterEach(
      () => {
        const element = document.querySelector('.test');
        element.parentNode.removeChild(element);
      }
    );

    // Test the use of the click function.
    it(
      'should be able to click test area',
      () => {

        // Get the element to test.
        const testDiv = document.querySelector('.test');

        // Interact with the element.
        testDiv.click();

        // Check the element has the expected classes.
        expect(testDiv.classList.contains('test'))
        .withContext('should have test class on test div')
        .toBeTrue();

      }
    );

  }
);
