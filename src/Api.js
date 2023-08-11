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
      return response.json(); // Parseamos la respuesta como JSON
    })
    .then((data) => {
      console.log('Respuesta exitosa:', data); // Muestra la respuesta en la consola
    })
    .catch((error) => {
      console.error('Error en la petición:', error); // Maneja errores de la petición
    });
};

export { AddLike, NewApp };