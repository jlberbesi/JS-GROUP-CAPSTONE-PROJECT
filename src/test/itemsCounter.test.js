import countItems from '../modules/itemCounter.js';

test('counts items correctly', () => {
  // Create a mock DOM structure for testing
  document.body.innerHTML = `
    <div id="items-container">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
  `;
  const itemCount = countItems();
  expect(itemCount).toBe(3);
});