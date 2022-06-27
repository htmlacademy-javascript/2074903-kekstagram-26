import { removeAllAddedChildren } from './functions/managers-dom.js';
import { photosContainer } from './photo-renderer.js';
import { isEscape } from './functions/helpers.js';
import { removeEventListeners } from './functions/managers-dom.js';
import { EVERY_PACK_COMMENTS } from './constants.js';

const fullPhoto = document.querySelector('.big-picture');

const commentsContainer = fullPhoto.querySelector('.social__comments');
const defaultComments = commentsContainer.querySelectorAll('.social__comment');
const commentsContainerFragment = document.createDocumentFragment();

const countOpenComments = fullPhoto.querySelector('.social__comment-count');
const buttonLoaderComments = fullPhoto.querySelector('.comments-loader');
const staticPageContent = document.querySelector('body');

const buttonClose = fullPhoto.querySelector('.cancel');

/**
 * Changes classes of some DOM elements when we open overlay view
 */
const changeOpenOverlay = () => {
  defaultComments.forEach((defaultComment) => {
    defaultComment.classList.add('hidden');
  });
  fullPhoto.classList.remove('hidden');
  staticPageContent.classList.add('modal-open');
};

/**
 * Changes classes of some DOM elements when we close overlay view
 */
const changeCloseOverlay = () => {
  defaultComments.forEach((defaultComment) => {
    defaultComment.classList.remove('hidden');
  });
  fullPhoto.classList.add('hidden');
  staticPageContent.classList.remove('modal-open');
  removeAllAddedChildren(commentsContainer, defaultComments.length);
};

/**
 * Close open full photo by press to escape
 * @param {*} evt on event handler
 */
function onEscCloseOverlay (evt) {
  if (isEscape(evt)) {
    evt.preventDefault();
    changeCloseOverlay();
  }
  removeEventListeners(buttonClose, onEscCloseOverlay, onClickCloseOverlay);
}

/**
 * Close open full photo by press to close button
 */
function onClickCloseOverlay () {
  changeCloseOverlay();
  removeEventListeners(buttonClose, onEscCloseOverlay, onClickCloseOverlay);
}

/**
 * Close overlay view by several ways: push escape and click cancel button
 */
const exitFullMode = () => {
  document.addEventListener('keydown', onEscCloseOverlay);
  buttonClose.addEventListener('click', onClickCloseOverlay);
};

/**
 * Fill html layout information from concrete photo which we want to open
 * @param {object} dataPhoto photo element which be needed to open overlay
 */
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

  const allNewComments = commentsContainerFragment.querySelectorAll('.social__comment');

  const loadNewComments = (start) => {
    allNewComments.splice(0, start);
    if (EVERY_PACK_COMMENTS > allNewComments.length) {
      for (let i = 0; i < EVERY_PACK_COMMENTS; i++) {
        commentsContainer.append(allNewComments[i]);
      }
      countOpenComments.textContent = `${start + EVERY_PACK_COMMENTS} из ${fullPhoto.querySelector('.comments-count').textContent} комментариев`;
      return start + EVERY_PACK_COMMENTS;
    }
    for (let i = 0; i < allNewComments.length; i++) {
      commentsContainer.append(allNewComments[i]);
    }
    countOpenComments.textContent = `${start + allNewComments.length} из ${fullPhoto.querySelector('.comments-count').textContent} комментариев`;
    return start + allNewComments.length;
  };

  loadNewComments(0);
  buttonLoaderComments.addEventListener('click', loadNewComments(countOpenComments.textContent));

  exitFullMode();
};

/**
 * Add EventListener parent element of previews
 * @param {array} photoElements information of all photos which we can open
 */
const openFullPhoto = (photoElements) => {
  photosContainer.addEventListener('click', (evt) => {
    const previewPhoto = evt.target.closest('.picture');
    if (!previewPhoto) {return;}
    if (!photosContainer.contains(previewPhoto)) {return;}
    fillFullPhoto(photoElements[previewPhoto.dataset.index]);
  });
};

export { openFullPhoto };
