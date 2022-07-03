import { isEscape } from '../functions/helpers.js';
import { removeEventListeners } from '../functions/managers-dom.js';
import { changeScalePhotoHandler, removeScalePhotoHandler } from './scale-control.js';
import { addOpenEffectHandler, cleanPhotoEffects } from './photo-effects.js';
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
import { addErrorMessage, addSuccessMessage } from './messages-submit.js';

const uploadPhotoForm = document.querySelector('.img-upload__form');
const fieldUploadPhoto = uploadPhotoForm.querySelector('#upload-file');
const changePhotoForm = uploadPhotoForm.querySelector('.img-upload__overlay');
const staticPageContent = document.querySelector('body');
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

/**
 * Add different changes during closing the form: add/remove classes,
 * reset the form and pristine
 */
const addChangesFormClose = () => {
  removeEventListeners(buttonClose, onEscCloseForm, onClickCloseForm);
  changePhotoForm.classList.add('hidden');
  staticPageContent.classList.remove('modal-open');
  uploadPhotoForm.reset();
  removeScalePhotoHandler();
  cleanPhotoEffects();
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
  }
}

/**
 * Close open full photo by press to close button
 */
function onClickCloseForm () {
  addChangesFormClose();
}

/**
 * Close overlay view by several ways: push escape and click cancel button
 */
const closeForm = () => {
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
    changeScalePhotoHandler();
    addOpenEffectHandler();
    //addedPhotoPreview.src = fieldUploadPhoto.value;
    closeForm();
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

const addPristineValidatorsFromFields = (sendData) => {
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
    if (pristine.validate()) {
      const formDataUploadPhoto = new FormData(evt.target);
      sendData(
        () => {
          addChangesFormClose();
          addSuccessMessage();
        },
        addErrorMessage,
        formDataUploadPhoto
      );
    }
  });
};

export { addOpenFormUploadPhotoHandler, addPristineValidatorsFromFields };
