/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';
const appsEndpoint = 'apps/';
const likesEndpoint = '/likes';

function NewApp() {
  return fetch(baseUrl + appsEndpoint, {
    method: 'POST',
  })
    .then((response) => {
      if (response.status === 201) {
        return response.text();
      }
      throw new Error('Error creating the app');
    })
    .catch((error) => {
      console.error('An error occurred:', error);
    });
}

// eslint-disable-next-line camelcase
const AddLike = async (item_id) => {
  const appId = await NewApp();
  const url = baseUrl + appsEndpoint + appId + likesEndpoint;
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    });
};

const getLikes = async (app_id) => {
  try {
    const url = `${baseUrl + appsEndpoint + app_id}/likes`;
    const response = await fetch(url);

    if (response.ok) {
      const data = response;
      return data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching likes:', error);
    return [];
  }
};

const updateLikes = async (app_id) => {
  try {
    const url = `${baseUrl + appsEndpoint + app_id}/likes`;
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Likes updated successfully');
  } catch (error) {
    console.error('Error updating likes:', error);
  }
};

export { AddLike, NewApp, getLikes, updateLikes};
