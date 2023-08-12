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
        return response.text(); // Devolver directamente el texto de la respuesta
      }
      throw new Error('Error creating the app');
    })
    .catch((error) => {
      console.error('An error occurred:', error);
    });
}

// eslint-disable-next-line camelcase
const AddLike = async (item_id, username, comment) => {
  const appId = await NewApp(); // Obtener el identificador único de la aplicación
  const url = baseUrl + appsEndpoint + appId + likesEndpoint;
  await fetch(url, {
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
      console.log('Respuesta exitosa:', response.statusText); // Muestra el mensaje de éxito en la consola
    });
};

export { AddLike, NewApp };
