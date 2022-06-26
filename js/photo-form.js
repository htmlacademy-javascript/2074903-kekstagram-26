import { isEscape } from './functions/helpers.js';
import { removeEventListeners } from './functions/managers-dom.js';
import {
  isValidLengthStr,
  isValidHashtagSymbols,
  isValidHashtagLength,
  isValidUniqueHashtags,
  isValidCountHashtags
} from './functions/validaters.js';
import {
  LENGTH_COMMENT,
  COUNT_HASHTAGS,
  MAX_HASHTAG_LENGTH,
  MIN_HASHTAG_LENGTH
} from './constants.js';

const uploadPhotoForm = document.querySelector('.img-upload__form');
const fieldUploadPhoto = uploadPhotoForm.querySelector('#upload-file');
const changePhotoForm = uploadPhotoForm.querySelector('.img-upload__overlay');
const staticPageContent = document.querySelector('body');
//const addedPhotoPreview = changePhotoForm.querySelector('.img-upload__preview');
const buttonClose = uploadPhotoForm.querySelector('#upload-cancel');
const hashtagFiled = changePhotoForm.querySelector('.text__hashtags');
const commentField = changePhotoForm.querySelector('.text__description');

const pristine = new Pristine(uploadPhotoForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__error'
});

const addChangesFormClose = () => {
  changePhotoForm.classList.add('hidden');
  staticPageContent.classList.remove('modal-open');
  uploadPhotoForm.reset();
  pristine.reset();
};
/**
 * Close open full photo by press to escape
 * @param {*} evt on event handler
 */
function onEscCloseForm (evt) {
  if (isEscape(evt) &&
    document.activeElement !== hashtagFiled &&
    document.activeElement !== commentField) {
    evt.preventDefault();
    addChangesFormClose();
    removeEventListeners(buttonClose, onEscCloseForm, onClickCloseForm);
  }
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

const regexCheckHashtag = /^#[A-Za-zА-Яа-яЁё0-9]{1,100}$/;

const validateHashtag = (value) => {
  const hashtags = value.split(' ');
  const validHashtags = [];
  validHashtags.push(isValidHashtagSymbols(hashtags, regexCheckHashtag));
  validHashtags.push(isValidHashtagLength(hashtags, MAX_HASHTAG_LENGTH, MIN_HASHTAG_LENGTH));
  validHashtags.push(isValidUniqueHashtags(hashtags));
  validHashtags.push(isValidCountHashtags(hashtags, COUNT_HASHTAGS));
  return !validHashtags.includes(false);
};

const getHashtagErrorMessage = (value) => {
  const hashtags = value.split(' ');
  const errorMessages = [];
  if (!isValidHashtagSymbols(hashtags, regexCheckHashtag)) {
    errorMessages.push('Хэштег может состоять только из букв и цифр');
  }
  if (!isValidHashtagLength(hashtags,MAX_HASHTAG_LENGTH, MIN_HASHTAG_LENGTH)) {
    errorMessages.push(`Длина хэштега не может быть меньше ${MIN_HASHTAG_LENGTH} символов или больше ${MAX_HASHTAG_LENGTH}`);
  }
  if (!isValidUniqueHashtags(hashtags)) {
    errorMessages.push('Ваши хэштеги повторяются, проверьте: хэштеги нечувствительны к регистру');
  }
  if (!isValidCountHashtags(hashtags, COUNT_HASHTAGS)) {
    errorMessages.push(`Нельзя указать больше ${COUNT_HASHTAGS} хэштегов`);
  }
  return errorMessages.join('<br>');
};

const validateComment = (value) => (isValidLengthStr(value, LENGTH_COMMENT));
const getCommentErrorMessage = (value) =>
  (isValidLengthStr(value, LENGTH_COMMENT) ? null : 'Комментарий не может быть больше 140 символов');

pristine.addValidator(
  hashtagFiled,
  validateHashtag,
  getHashtagErrorMessage
);

pristine.addValidator(
  commentField,
  validateComment,
  getCommentErrorMessage
);

uploadPhotoForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
