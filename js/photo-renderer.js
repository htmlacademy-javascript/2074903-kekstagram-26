const photosContainer = document.querySelector('.pictures');

const randomPhotoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

/**
 * Add photos from db to page
 * @param {array} photoElements array with photos which need to be added
 */
const addPreviews = (photoElements) => {
  const childrenPhotosContainer = photosContainer.children;
  while (childrenPhotosContainer[childrenPhotosContainer.length - 1].matches('.picture')) {
    photosContainer.lastChild.remove();
  }
  const photosContainerFragment = document.createDocumentFragment();

  photoElements.forEach(({id, url, likes, comments}) => {
    const photoElement = randomPhotoTemplate.cloneNode(true);
    photoElement.dataset.index = id;
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photosContainerFragment.append(photoElement);
  });

  photosContainer.append(photosContainerFragment);
};

export { addPreviews, photosContainer };
