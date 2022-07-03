const getLoaderPhotos = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then ((data) => {
      onSuccess(data);
    });
};

export { getLoaderPhotos };
