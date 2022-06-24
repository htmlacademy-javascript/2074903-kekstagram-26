import { isEscape } from './functions/helpers.js';
import { removeEventListeners } from './functions/managers-dom.js';
import { isRightLength } from './functions/validaters.js';

const uploadPhotoForm = document.querySelector('.img-upload__form');
const fieldUploadPhoto = uploadPhotoForm.querySelector('#upload-file');
const changePhotoForm = uploadPhotoForm.querySelector('.img-upload__overlay');
const staticPageContent = document.querySelector('body');
//const addedPhotoPreview = changePhotoForm.querySelector('.img-upload__preview');
const buttonClose = uploadPhotoForm.querySelector('#upload-cancel');
const hashtagFiled = changePhotoForm.querySelector('.text__hashtags');
const lengthComment = 140;
const commentField = changePhotoForm.querySelector('.text__description');

/*const pristine = new Pristine(orderForm, {
  classTo: 'form__item',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'form__item',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});*/

const addChangesFormClose = () => {
  changePhotoForm.classList.add('hidden');
  staticPageContent.classList.remove('modal-open');
  uploadPhotoForm.reset();
};
/**
 * Close open full photo by press to escape
 * @param {*} evt on event handler
 */
function onEscCloseForm (evt) {
  if (isEscape(evt)) {
    evt.preventDefault();
    addChangesFormClose();
  }
  removeEventListeners(buttonClose, onEscCloseForm, onClickCloseForm);
}

/**
 * Close open full photo by press to close button
 */
function onClickCloseForm () {
  addChangesFormClose();
  removeEventListeners(buttonClose, onEscCloseForm, onClickCloseForm);
}

function listenExitClick () {
  buttonClose.addEventListener('click', onClickCloseForm);
  hashtagFiled.removeEventListener('focusin', listenExitClick);
  hashtagFiled.removeEventListener('focusout', listenExit);
  commentField.removeEventListener('focusin', listenExitClick);
  commentField.removeEventListener('focusout', listenExit);
}

function listenExit () {
  document.addEventListener('keydown', onEscCloseForm);
  buttonClose.addEventListener('click', onClickCloseForm);
  hashtagFiled.removeEventListener('focusin', listenExitClick);
  hashtagFiled.removeEventListener('focusout', listenExit);
  commentField.removeEventListener('focusin', listenExitClick);
  commentField.removeEventListener('focusout', listenExit);
}

/**
 * Close overlay view by several ways: push escape and click cancel button
 */
const exitForm = () => {
  hashtagFiled.addEventListener('focusin', listenExitClick);
  hashtagFiled.addEventListener('focusout', listenExit);
  commentField.addEventListener('focusin', listenExitClick);
  commentField.addEventListener('focusout', listenExit);
};

fieldUploadPhoto.addEventListener('change', () => {
  changePhotoForm.classList.remove('hidden');
  staticPageContent.classList.add('modal-open');
  //addedPhotoPreview.src = fieldUploadPhoto.value;
  exitForm();
});

const regexCheckHashtag = /^[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const validateHashtag = (value) => {
  const hashtags = value.split(' ');
  hashtags.forEach((hashtag) => {
    if (!regexCheckHashtag.test(hashtag)) {
      return false;
    }
  });
  for (let i = 0; i < hashtags.length; i++) {
    for (let j = i + 1; j < hashtags.length; j++) {
      if (hashtags[i].toLowerCase() === hashtags[j].toLowerCase()) {
        return false;
      }
    }
  }
  return hashtags.length <= 5;
};

const getHashtagErrorMessage = (value) => {
  const hashtags = value.split(' ');
  hashtags.forEach((hashtag) => {
    if (!regexCheckHashtag.test(hashtag)) {
      return 'Cтрока после решётки должна состоять из букв и чисел' +
      ' и не может содержать пробелы, спецсимволы (#, @, $ и т. п.),' +
      ' символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.';
    }
  });
  for (let i = 0; i < hashtags.length; i++) {
    for (let j = i + 1; j < hashtags.length; j++) {
      if (hashtags[i].toLowerCase() === hashtags[j].toLowerCase()) {
        return 'Ваши хэш-теги повторяются, проверьте: хэш-теги нечувствительны к регистру:' +
        ' #ХэшТег и #хэштег считаются одним и тем же тегом';
      }
    }
  }
  return hashtags.length <= 5 ? null : 'Нельзя указать больше пяти хэш-тегов';
};

pristine.addValidator(
  hashtagFiled,
  validateHashtag,
  getHashtagErrorMessage
);

const validateComment = (value) => (isRightLength(value, lengthComment));
const getCommentErrorMessage = (value) =>
  (isRightLength(value, lengthComment) ? null : 'Комментарий не может быть больше 140 символов');

pristine.addValidator(
  commentField,
  validateComment,
  getCommentErrorMessage
);

/*orderForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});*/
