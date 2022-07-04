import { isEscape } from '../functions/helpers.js';

const bodyPage = document.querySelector('body');
const changePhotoForm = bodyPage.querySelector('.img-upload__overlay');

const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const addSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  const successButton = successMessage.querySelector('.success__button');

  bodyPage.append(successMessage);

  const closeSuccessMessage = () => {
    successMessage.remove();
    successButton.removeEventListener('click', onClickSuccessButton);
    document.removeEventListener('click', onClickOutSuccessMessage);
    document.removeEventListener('keydown', onEscCloseSuccessMessage);
  };

  function onClickSuccessButton () {
    closeSuccessMessage();
  }

  function onClickOutSuccessMessage (evt) {
    if (evt.target.matches('.success')) {
      closeSuccessMessage();
    }
  }

  function onEscCloseSuccessMessage (evt) {
    if (isEscape(evt) && changePhotoForm.classList.contains('hidden')) {
      evt.preventDefault();
      closeSuccessMessage();
    }
  }

  successButton.addEventListener('click', onClickSuccessButton);
  document.addEventListener('click', onClickOutSuccessMessage);
  document.addEventListener('keydown', onEscCloseSuccessMessage);
};

const addErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');
  changePhotoForm.classList.add('hidden');
  bodyPage.append(errorMessage);

  const closeErrorMessage = () => {
    changePhotoForm.classList.remove('hidden');
    errorMessage.remove();
    errorButton.removeEventListener('click', onClickErrorButton);
    document.removeEventListener('click', onClickOutErrorMessage);
    document.removeEventListener('keydown', onEscCloseErrorMessage);
  };

  function onClickErrorButton () {
    closeErrorMessage();
  }

  function onClickOutErrorMessage (evt) {
    if (evt.target.matches('.error')) {
      closeErrorMessage();
    }
  }

  function onEscCloseErrorMessage (evt) {
    if (isEscape(evt) && changePhotoForm.classList.contains('hidden')) {
      evt.preventDefault();
      closeErrorMessage();
    }
  }

  errorButton.addEventListener('click', onClickErrorButton);
  document.addEventListener('click', onClickOutErrorMessage);
  document.addEventListener('keydown', onEscCloseErrorMessage);
};

export { addSuccessMessage, addErrorMessage };
