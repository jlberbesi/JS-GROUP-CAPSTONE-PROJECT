// eslint-disable-next-line import/extensions, import/no-unresolved
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
    itemElement.innerHTML = `<img class="poppup__img" src="${item.image.medium}"><h2>${item.name}</h2>`;

    const commentsButton = document.createElement('button');
    commentsButton.innerText = 'Show Comments';
    commentsButton.addEventListener('click', () => showComments(item));

    itemElement.appendChild(commentsButton);
    itemsContainer.appendChild(itemElement);
  });
}

fetchItems().then((items) => renderItems(items));