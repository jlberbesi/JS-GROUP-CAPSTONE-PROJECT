/* eslint-disable linebreak-style */
import './styles.css';
import Like from './like.png';
import { AddLike, NewApp, getLikes, updateLikes} from './Api.js';

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

function renderItems(items) {
  const itemsContainer = document.getElementById('items-container');
  itemsContainer.innerHTML = '';

  items.forEach(async (item) => {
    const itemElement = document.createElement('div');
    itemElement.className = 'item';
    itemElement.innerHTML = `<img class="card__img" src="${item.image.medium}">
    <h2>${item.name}</h2>
    <p>${item.summary}</p>
    <h4 id="likes-${item.id}">Likes: 0</h4>

    <div class="item-buttons">
      <button class="item-like-btn" data-item-id="${item.id}" aria-label="Like"><img class="like" src="${Like}" alt=""></button>
    </div>
  `;

    const commentsButton = document.createElement('button');
    commentsButton.innerText = 'Show Comments';
    commentsButton.addEventListener('click', showComments);

    itemElement.appendChild(commentsButton);
    itemsContainer.appendChild(itemElement);
    const likeButton = itemElement.querySelector('.item-like-btn');
    likeButton.addEventListener('click', async (event) => {
      // eslint-disable-next-line prefer-destructuring
      const itemId = event.target.dataset.itemId; // Obtener el item_id del atributo data-item-id
      if (itemId) {
        NewApp()
          .then((appId) => {
            AddLike(item.id);
            updateLikes(appId, itemId); // Llamar a la función para incrementar los likes
            getLikes(appId).then((likesData) => {
              const likesElement = document.getElementById(`likes-${item.id}`);
              if (likesData.length > 0) {
                // eslint-disable-next-line prefer-destructuring
                const likes = likesData[itemId].likes;
                likesElement.innerText = `Likes: ${likes}`;
              }
            });
          });
      }
    });
  });
}
fetchItems().then((items) => renderItems(items));