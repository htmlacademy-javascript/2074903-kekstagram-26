import { dataPhotos } from './data.js';

const photosContainer = document.querySelector('.pictures');

const randomPhotoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const photoElements = dataPhotos;

const photosContainerFragment = document.createDocumentFragment();

photoElements.forEach(({url, likes, comments}) => {
  const photoElement = randomPhotoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photosContainerFragment.append(photoElement);
});

photosContainer.append(photosContainerFragment);

export { photosContainer };
