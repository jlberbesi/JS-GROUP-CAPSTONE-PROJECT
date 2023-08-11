/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';
const appsEndpoint = 'apps/';
const likesEndpoint = 'likes';

function NewApp(AppID) {
  fetch(baseUrl + appsEndpoint, {
    method: 'POST',
  })
    .then((response) => {
      if (response.status === 201) {
        return response.text();
      }
      throw new Error('Error creating the app');
    })
    .then((appId) => {
      AppID = appId.trim();
    })
    .catch((error) => {
      console.error('An error occurred:', error);
    });
  return AppID;
}

const AddLike = async (item_id, username, comment) => {
  await fetch(baseUrl + appsEndpoint + item_id + likesEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id,
      username,
      comment,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Parseamos la respuesta como JSON
    })
    .then((data) => {
      console.log('Respuesta exitosa:', data); // Muestra la respuesta en la consola
    })
    .catch((error) => {
      console.error('Error en la petición:', error); // Maneja errores de la petición
    });
};

const item_id = NewApp();
const username = 'lost';
const comment = 'lorem';

AddLike(item_id, username, comment);

export default NewApp;