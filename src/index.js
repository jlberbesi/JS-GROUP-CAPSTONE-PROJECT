/* eslint-disable linebreak-style */
import './styles.css';
import showComments from './modules/popup.js';

const apiUrl = 'https://api.tvmaze.com/shows';

async function fetchItems() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
}

function renderItems(items) {
  const itemsContainer = document.getElementById('items-container');
  itemsContainer.innerHTML = '';

  items.forEach((item) => {
    const itemElement = document.createElement('div');
    itemElement.className = 'item';
    itemElement.innerHTML = `
      <h2>${item.name}</h2>
      <p>${item.summary}</p>
      <button class="comments-button">Show Comments</button>`;

    const commentsButton = itemElement.querySelector('.comments-button');
    commentsButton.addEventListener('click', () => showComments(item));

    itemsContainer.appendChild(itemElement);
  });
}

fetchItems().then((items) => renderItems(items));
