import countComment from '../modules/counter_comments.js';

test('counts comments correctly', () => {
  document.body.innerHTML = `
    <div>
      <p class="comment">Comment 1</p>
      <p class="comment">Comment 2</p>
      <p class="comment">Comment 3</p>
    </div>
  `;
  const commentCount = countComment();
  expect(commentCount).toBe(3);
});