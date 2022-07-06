/**
 * Establishes a connection with the server to get existing photos to show to the user
 * @param {cb} onSuccess The function which will be executed with server data
 * if the connection will be successful
 * @param {cb} onError The function which will be executed
 * if the connection will be unsuccessful
 */
const getLoaderPhotos = (onSuccess, onError) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then ((data) => {
      onSuccess(data);
    })
    .catch((error) => {
      onError(error.message);
    });
};

/**
 * Establishes a connection with the server to send new photo from upload form
 * @param {cb} onSuccess The function which will be executed with server data
 * if the connection will be successful
 * @param {cb} onError The function which will be executed
 * if the connection will be unsuccessful
 * @param body Request Body for the server
 */
const sendDataNewPhoto = (onSuccess, onError, body) => {
  fetch(
    'https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};

export { getLoaderPhotos, sendDataNewPhoto };
