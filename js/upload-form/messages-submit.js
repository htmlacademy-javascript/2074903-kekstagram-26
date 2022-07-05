import { isEscape } from '../functions/helpers.js';

const bodyPage = document.querySelector('body');
const changePhotoForm = bodyPage.querySelector('.img-upload__overlay');

const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

/**
 * Opens the success message if the data from upload new photo form
 * were sent successful
 */
const addSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  const successButton = successMessage.querySelector('.success__button');

  bodyPage.append(successMessage);

  /**
   * Performs a set of actions required when closing the pop-up
   * about the successful submission of the form
   */
  const closeSuccessMessage = () => {
    successMessage.remove();
    successButton.removeEventListener('click', onClickSuccessButton);
    document.removeEventListener('click', onClickOutSuccessMessage);
    document.removeEventListener('keydown', onEscCloseSuccessMessage);
  };

  /**
   * The function of the event handler for closing the successful pop-up
   * when the button is clicked
   */
  function onClickSuccessButton () {
    closeSuccessMessage();
  }

  /**
   * The function of the event handler for closing the successful pop-up
   * when user clicks any place except this message
   */
  function onClickOutSuccessMessage (evt) {
    if (evt.target.matches('.success')) {
      closeSuccessMessage();
    }
  }

  /**
   * The function of the event handler for closing the successful pop-up
   * when user pushes key 'Escape'
   */
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

/**
 * Opens the error message if the data from upload new photo form
 * weren't sent to the server
 */
const addErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');
  changePhotoForm.classList.add('hidden');
  bodyPage.append(errorMessage);

  /**
   * Performs a set of actions required when closing the pop-up
   * about the unsuccessful submission of the form
   */
  const closeErrorMessage = () => {
    changePhotoForm.classList.remove('hidden');
    errorMessage.remove();
    errorButton.removeEventListener('click', onClickErrorButton);
    document.removeEventListener('click', onClickOutErrorMessage);
    document.removeEventListener('keydown', onEscCloseErrorMessage);
  };

  /**
   * The function of the event handler for closing the error pop-up
   * when the button is clicked
   */
  function onClickErrorButton () {
    closeErrorMessage();
  }

  /**
   * The function of the event handler for closing the error pop-up
   * when user clicks any place except this message
   */
  function onClickOutErrorMessage (evt) {
    if (evt.target.matches('.error')) {
      closeErrorMessage();
    }
  }

  /**
   * The function of the event handler for closing the error pop-up
   * when user pushes key 'Escape'
   */
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
