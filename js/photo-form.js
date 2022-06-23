import { isEscape } from './functions/helpers.js';
import { removeEventListeners } from './functions/managers-dom.js';

const uploadPhotoForm = document.querySelector('.img-upload__form');
const fieldUploadPhoto = uploadPhotoForm.querySelector('#upload-file');
const changePhotoForm = uploadPhotoForm.querySelector('.img-upload__overlay');
const staticPageContent = document.querySelector('body');
//const addedPhotoPreview = changePhotoForm.querySelector('.img-upload__preview');
const buttonClose = uploadPhotoForm.querySelector('#upload-cancel');

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

/**
 * Close overlay view by several ways: push escape and click cancel button
 */
const exitForm = () => {
  document.addEventListener('keydown', onEscCloseForm);
  buttonClose.addEventListener('click', onClickCloseForm);
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
