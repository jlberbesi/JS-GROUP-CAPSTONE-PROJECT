/* eslint-disable linebreak-style */
/* eslint-disable no-await-in-loop */
import './styles.css';
import Like from './like.png';
import { AddLike, NewApp, getLikes } from './Api.js';

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

function showComments() {

}

async function renderItems(items) {
  const itemsContainer = document.getElementById('items-container');
  itemsContainer.innerHTML = '';

  // eslint-disable-next-line no-restricted-syntax
  for (const item of items) {
    // eslint-disable-next-line camelcase,
    const app_id = await NewApp();

    const likes = await getLikes(app_id, item.id);

    const itemElement = document.createElement('div');
    itemElement.className = 'item';
    itemElement.innerHTML = `
      <img class="card__img" src="${item.image.medium}">
      <h2>${item.name}</h2>
      <p>${item.summary}</p>
      <p>Likes: ${likes}</p>
      <div class="item-buttons">
        <button class="item-like-btn" data-item-id="${item.id}" aria-label="Like">
          <img class="like" src="${Like}" alt="">
        </button>
      </div>
    `;

    const commentsButton = document.createElement('button');
    commentsButton.innerText = 'Show Comments';
    commentsButton.addEventListener('click', showComments);

    itemElement.appendChild(commentsButton);
    itemsContainer.appendChild(itemElement);

    const username = item.name;
    const comment = item.summary;

    AddLike(app_id, username, comment);
  }
}
fetchItems().then((items) => renderItems(items));