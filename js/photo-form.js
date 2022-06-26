import { isEscape } from './functions/helpers.js';
import { removeEventListeners } from './functions/managers-dom.js';
import { isRightLength } from './functions/validaters.js';
import { LENGTH_COMMENT, COUNT_HASHTAGS, MAX_HASHTAG_LENGTH, MIN_HASHTAG_LENGTH } from './constants.js';

const uploadPhotoForm = document.querySelector('.img-upload__form');
const fieldUploadPhoto = uploadPhotoForm.querySelector('#upload-file');
const changePhotoForm = uploadPhotoForm.querySelector('.img-upload__overlay');
const staticPageContent = document.querySelector('body');
//const addedPhotoPreview = changePhotoForm.querySelector('.img-upload__preview');
const buttonClose = uploadPhotoForm.querySelector('#upload-cancel');
const hashtagFiled = changePhotoForm.querySelector('.text__hashtags');
const commentField = changePhotoForm.querySelector('.text__description');

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

function onListenExitClick () {
  buttonClose.addEventListener('click', onClickCloseForm);
  hashtagFiled.removeEventListener('focusin', onListenExitClick);
  hashtagFiled.removeEventListener('focusout', onListenExit);
  commentField.removeEventListener('focusin', onListenExitClick);
  commentField.removeEventListener('focusout', onListenExit);
}

function onListenExit () {
  document.addEventListener('keydown', onEscCloseForm);
  buttonClose.addEventListener('click', onClickCloseForm);
  hashtagFiled.removeEventListener('focusin', onListenExitClick);
  hashtagFiled.removeEventListener('focusout', onListenExit);
  commentField.removeEventListener('focusin', onListenExitClick);
  commentField.removeEventListener('focusout', onListenExit);
}

/**
 * Close overlay view by several ways: push escape and click cancel button
 */
const exitForm = () => {
  hashtagFiled.addEventListener('focusin', onListenExitClick);
  hashtagFiled.addEventListener('focusout', onListenExit);
  commentField.addEventListener('focusin', onListenExitClick);
  commentField.addEventListener('focusout', onListenExit);
};

fieldUploadPhoto.addEventListener('change', () => {
  changePhotoForm.classList.remove('hidden');
  staticPageContent.classList.add('modal-open');
  //addedPhotoPreview.src = fieldUploadPhoto.value;
  exitForm();
});

const regexCheckHashtag = /^[A-Za-zА-Яа-яЁё0-9]$/;

const validateHashtag = (value) => {
  const hashtags = value.split(' ');
  hashtags.forEach((hashtag) => {
    if (!regexCheckHashtag.test(hashtag)) {
      return false;
    }
    if (hashtag.length > MAX_HASHTAG_LENGTH || hashtag.length < MIN_HASHTAG_LENGTH) {
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
  return hashtags.length <= COUNT_HASHTAGS;
};

const getHashtagErrorMessage = (value) => {
  const hashtags = value.split(' ');
  const errorMessages = [];

  hashtags.forEach((hashtag) => {
    if (!regexCheckHashtag.test(hashtag)) {
      errorMessages.push('Cтрока после решётки должна состоять из букв и чисел' +
      ' и не может содержать пробелы, спецсимволы (#, @, $ и т. п.),' +
      ' символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.');
    }
    if (hashtag.length > MAX_HASHTAG_LENGTH || hashtag.length < MIN_HASHTAG_LENGTH) {
      errorMessages.push('Длина хэштега не может быть меньше 2 символов или больше 20');
    }
  });
  for (let i = 0; i < hashtags.length; i++) {
    for (let j = i + 1; j < hashtags.length; j++) {
      if (hashtags[i].toLowerCase() === hashtags[j].toLowerCase()) {
        errorMessages.push('Ваши хэш-теги повторяются, проверьте: хэш-теги нечувствительны к регистру:' +
        ' #ХэшТег и #хэштег считаются одним и тем же тегом');
      }
    }
  }
  if (hashtags.length <= COUNT_HASHTAGS) {
    errorMessages.push('Нельзя указать больше пяти хэш-тегов');
  }
  return errorMessages;
};

const pristine = new Pristine(uploadPhotoForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__error'
});

pristine.addValidator(
  hashtagFiled,
  validateHashtag,
  getHashtagErrorMessage
);

const validateComment = (value) => (isRightLength(value, LENGTH_COMMENT));
const getCommentErrorMessage = (value) =>
  (isRightLength(value, LENGTH_COMMENT) ? null : 'Комментарий не может быть больше 140 символов');

pristine.addValidator(
  commentField,
  validateComment,
  getCommentErrorMessage
);

uploadPhotoForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
