import { dataPhotos } from './data.js';
import { photosContainer } from './photo-renderer.js';
import { removeAllAddedChildren } from './functions/managers-dom.js';

const fullPhoto = document.querySelector('.big-picture');

const commentsContainer = fullPhoto.querySelector('.social__comments');
const defaultComments = commentsContainer.querySelectorAll('.social__comment');
const commentsContainerFragment = document.createDocumentFragment();

const hiddenCountComments = fullPhoto.querySelector('.social__comment-count');
const hiddenLoaderComments = fullPhoto.querySelector('.comments-loader');
const staticPageContent = document.querySelector('body');

const buttonClose = fullPhoto.querySelector('.cancel');

const changeOpenOverlay = () => {
  for (let i = 0; i < defaultComments.length; i++) {
    defaultComments[i].classList.add('hidden');
  }
  fullPhoto.classList.remove('hidden');
  hiddenCountComments.classList.add('hidden');
  hiddenLoaderComments.classList.add('hidden');
  staticPageContent.classList.add('modal-open');
};

const changeCloseOverlay = () => {
  for (let i = 0; i < defaultComments.length; i++) {
    defaultComments[i].classList.remove('hidden');
  }
  fullPhoto.classList.add('hidden');
  hiddenCountComments.classList.remove('hidden');
  hiddenLoaderComments.classList.remove('hidden');
  staticPageContent.classList.remove('modal-open');
  removeAllAddedChildren(commentsContainer, defaultComments.length);
};

const exitFullMode = () => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      changeCloseOverlay();
    }
  });
  buttonClose.addEventListener('click', () => {
    changeCloseOverlay();
  });
};

const fillFullPhoto = (dataPhoto) => {
  changeOpenOverlay();

  fullPhoto.querySelector('.big-picture__img img').src = dataPhoto.url;
  fullPhoto.querySelector('.big-picture__img img').alt = 'Авторская фотография';
  fullPhoto.querySelector('.social__caption').textContent = dataPhoto.description;
  fullPhoto.querySelector('.likes-count').textContent = dataPhoto.likes;
  fullPhoto.querySelector('.comments-count').textContent = dataPhoto.comments.length;

  dataPhoto.comments.forEach(({avatar, nameUser, message}) => {
    const commentElement = defaultComments[0].cloneNode(true);
    commentElement.classList.remove('hidden');
    commentElement.querySelector('img').src = avatar;
    commentElement.querySelector('img').alt = nameUser;
    commentElement.querySelector('p').textContent = message;
    commentsContainerFragment.append(commentElement);
  });
  commentsContainer.append(commentsContainerFragment);

  exitFullMode();
};

photosContainer.addEventListener('click', (evt) => {
  const previewPhoto = evt.target.closest('.picture');
  if (!previewPhoto) {return;}
  if (!photosContainer.contains(previewPhoto)) {return;}
  fillFullPhoto(dataPhotos[previewPhoto.dataset.index]);
});
