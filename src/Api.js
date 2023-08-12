/* eslint-disable linebreak-style */
/* eslint-disable camelcase */

const BaseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/0088NMkpXBlVoK5MhX9D';
const getLikes = async () => {
  const response = await fetch(`${BaseUrl}/likes`);
  return response.json();
};
const AddLikes = async (id) => {
  const response = await fetch(`${BaseUrl}/likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item_id: id }),
  });
  return response.text();
};

const LikeBtn = (element, textElement) => {
  element.addEventListener('click', () => {
    getLikes(parseInt(element.id, 10)).then(((value) => {
      if (value === 'Created' || value === '201') {
        textElement.innerText = parseInt(textElement.innerText, 10) + 1;
      }
    }));
  });
};

const UpdateLikes = (itemId, elementDisplay) => {
  getLikes().then((value) => {
    try {
      const itemObject = value.find((item) => item.item_id === itemId);
      if (itemObject) {
        elementDisplay.innerText = itemObject.likes;
      }
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  });
};

export {
  AddLikes, getLikes, LikeBtn, UpdateLikes,
};