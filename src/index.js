import './styles.css';
import showComments from './modules/popup.js';
import { postLike } from './modules/post-get.js';
import countItems from './modules/itemCounter.js';

const apiUrl = 'https://api.tvmaze.com/shows';
const appId = 's14u04tuKMAoE5jNDTZW';
async function fetchItems() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching items:', error);
    return [];
  }
}
async function fetchLikes() {
  try {
    const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/likes`);
    const likesData = await response.json();
    return likesData;
  } catch (error) {
    console.error('Error fetching likes:', error);
    return [];
  }
}
async function handleLikeButtonClick(item, currentLikes) {
  try {
    await postLike(appId, item.id);
    const likeCounter = document.querySelector(`[data-item-id="${item.id}"] .like-counter`);
    if (likeCounter) {
      likeCounter.textContent = currentLikes + 1;
    }
  } catch (error) {
    console.error('Error adding like:', error);
  }
}
async function renderItems() {
  const itemsContainer = document.getElementById('items-container');
  itemsContainer.innerHTML = '';
  const items = await fetchItems();
  const likes = await fetchLikes();
  items.forEach((item) => {
    const itemElement = document.createElement('div');
    itemElement.className = 'item';
    itemElement.dataset.itemId = item.id;
    const likesCount = likes.find((like) => like.item_id === item.id)?.likes || 0;
    itemElement.innerHTML = `
      <img class="poppup__img" src="${item.image.medium}">
      <h2>${item.name}</h2>
      <div class="item-actions">
        <button class="item-like-btn">Like</button>
        <span class="like-counter">${likesCount}</span>
        <button class="comments-btn">Show Comments</button>
      </div>`;
    const likeButton = itemElement.querySelector('.item-like-btn');
    likeButton.addEventListener('click', () => handleLikeButtonClick(item, likesCount));
    const commentsButton = itemElement.querySelector('.comments-btn');
    commentsButton.addEventListener('click', () => showComments(item));
    itemsContainer.appendChild(itemElement);
  });

  const itemsCountElement = document.createElement('p');
  itemsCountElement.textContent = `Total Items: ${countItems()}`;
  itemsContainer.insertAdjacentElement('beforebegin', itemsCountElement);
}
renderItems();