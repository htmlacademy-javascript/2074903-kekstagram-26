import { isEscape } from '../functions/helpers.js';
import { removeEventListeners } from '../functions/managers-dom.js';
import { onClickButtonScaleBigger, onClickButtonScaleSmaller } from './scale-controle.js';
import {
  isValidLength,
  isValidHashtagSymbols,
  isValidHashtagLength,
  isValidUniqueHashtags,
} from '../functions/validaters.js';
import {
  LENGTH_COMMENT,
  COUNT_HASHTAGS,
  MAX_HASHTAG_LENGTH,
  MIN_HASHTAG_LENGTH
} from '../constants.js';

const uploadPhotoForm = document.querySelector('.img-upload__form');
const fieldUploadPhoto = uploadPhotoForm.querySelector('#upload-file');
const changePhotoForm = uploadPhotoForm.querySelector('.img-upload__overlay');
const staticPageContent = document.querySelector('body');
//const addedPhotoPreview = changePhotoForm.querySelector('.img-upload__preview');
const buttonClose = uploadPhotoForm.querySelector('#upload-cancel');
const hashtagFiled = changePhotoForm.querySelector('.text__hashtags');
const commentField = changePhotoForm.querySelector('.text__description');

const buttonScalePhotoBigger = changePhotoForm.querySelector('.scale__control--bigger');
const buttonScalePhotoSmaller = changePhotoForm.querySelector('.scale__control--smaller');

const changeScalePhotoPreview = () => {
  buttonScalePhotoBigger.addEventListener('click', onClickButtonScaleBigger);
  buttonScalePhotoSmaller.addEventListener('click', onClickButtonScaleSmaller);
};

const pristine = new Pristine(uploadPhotoForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__error'
});

/**
 * Add different changes during closing the form: add/remove classes,
 * reset the form and pristine
 */
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
    buttonScalePhotoBigger.removeEventListener('click', onClickButtonScaleBigger);
    buttonScalePhotoSmaller.removeEventListener('click', onClickButtonScaleSmaller);
  }
}

/**
 * Close open full photo by press to close button
 */
function onClickCloseForm () {
  addChangesFormClose();
  removeEventListeners(buttonClose, onEscCloseForm, onClickCloseForm);
  buttonScalePhotoBigger.removeEventListener('click', onClickButtonScaleBigger);
  buttonScalePhotoSmaller.removeEventListener('click', onClickButtonScaleSmaller);
}

/**
 * Close overlay view by several ways: push escape and click cancel button
 */
const exitForm = () => {
  document.addEventListener('keydown', onEscCloseForm);
  buttonClose.addEventListener('click', onClickCloseForm);
};

/**
 * Add different changes during opening the form: add/remove classes
 */
const addOpenFormUploadPhotoHandler = () => {
  fieldUploadPhoto.addEventListener('change', () => {
    changePhotoForm.classList.remove('hidden');
    staticPageContent.classList.add('modal-open');
    changeScalePhotoPreview();
    //addedPhotoPreview.src = fieldUploadPhoto.value;
    exitForm();
  });
};

const regexCheckHashtag = /^#[A-Za-zА-Яа-яЁё0-9]{1,100}$/;

/**
 * Validate all conditions for hashtag field
 * @param {string} value value of hashtag field
 * @returns {boolean} if all validates are successful we receive true and false if not
 */
const validateHashtag = (value) => {
  const hashtags = value.split(' ');
  const validHashtags = [];
  validHashtags.push(isValidHashtagSymbols(hashtags, regexCheckHashtag));
  validHashtags.push(isValidHashtagLength(hashtags, MAX_HASHTAG_LENGTH, MIN_HASHTAG_LENGTH));
  validHashtags.push(isValidUniqueHashtags(hashtags));
  validHashtags.push(isValidLength(hashtags, COUNT_HASHTAGS));
  return !validHashtags.includes(false);
};

/**
 * Create the text of errors for validating conditions of hashtag field
 * @param {string} value value of hashtag field
 * @returns {string} with all actual errors for this field
 */
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
  if (!isValidLength(hashtags, COUNT_HASHTAGS)) {
    errorMessages.push(`Нельзя указать больше ${COUNT_HASHTAGS} хэштегов`);
  }
  return errorMessages.join('<br>');
};

/**
 * Validate all conditions of comment field
 * @param {string} value value of comment field
 * @returns {boolean} if all validates are successful we receive true and false if not
 */
const validateComment = (value) => (isValidLength(value, LENGTH_COMMENT));

/**
 * Create the text of errors for validating conditions of comment field
 * @param {string} value value of comment field
 * @returns {string} with actual error for this field
 */
const getCommentErrorMessage = (value) =>
  (isValidLength(value, LENGTH_COMMENT) ? null : 'Комментарий не может быть больше 140 символов');

const addPristineValidatorsFromFields = () => {
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
};

export { addOpenFormUploadPhotoHandler, addPristineValidatorsFromFields };
