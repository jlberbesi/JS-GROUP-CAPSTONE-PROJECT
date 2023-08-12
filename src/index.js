/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
import './styles.css';
import Like from './like.png';
import showComments from './modules/popup.js';
import { LikeBtn, UpdateLikes } from './Api.js';

const apiUrl = 'https://api.tvmaze.com/shows';
const ShowsID = [];
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
    itemElement.innerHTML = `<img class="poppup__img" src="${item.image.medium}"><h2>${item.name}</h2>
    <div class="item-buttons">
    <button class="item-like-btn" data-item-id="${item.id}" aria-label="Like"><img class="like" src="${Like}" alt=""></button>
  </div>`;
    ShowsID.push(item.id);

    const likesCount = document.createElement('span');
    likesCount.className = 'likes_count';
    likesCount.innerText = '0';
    itemElement.appendChild(likesCount);

    LikeBtn(itemElement.querySelector('.item-like-btn'), likesCount);

    const commentsButton = document.createElement('button');
    commentsButton.innerText = 'Show Comments';
    commentsButton.addEventListener('click', () => showComments(item));
    itemElement.appendChild(commentsButton);
    itemsContainer.appendChild(itemElement);
  });
}

fetchItems().then((items) => renderItems(items));
