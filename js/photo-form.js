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
