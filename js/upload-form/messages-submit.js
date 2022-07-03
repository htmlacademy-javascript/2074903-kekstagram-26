import { isEscape } from '../functions/helpers.js';

const bodyPage = document.querySelector('body');

const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const closeSubmitMessage = (message, button) => {
  message.remove();
  button.removeEventListener('click', onClickButtonSubmitMessage(message, button));
  document.removeEventListener('click', onClickDocumentSubmitMessage(message, button));
  document.removeEventListener('keydown', onEscSubmitMessage(message, button));
};

function onClickButtonSubmitMessage (message, button) {
  return () => {
    closeSubmitMessage(message, button);
  };
}

function onClickDocumentSubmitMessage (message, button) {
  return (evt) => {
    if (evt.target !== message) {
      closeSubmitMessage(message, button);
    }
  };
}

function onEscSubmitMessage (message, button) {
  return (evt) => {
    if (isEscape(evt)) {
      evt.preventDefault();
      closeSubmitMessage(message, button);
    }
  };
}

const addSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  const successButton = successMessage.querySelector('.success__button');

  bodyPage.append(successMessage);

  successButton.addEventListener('click', onClickButtonSubmitMessage(successMessage, successButton));
  document.addEventListener('click', onClickDocumentSubmitMessage(successMessage, successButton));
  document.addEventListener('keydown', onEscSubmitMessage(successMessage, successButton));
};

const addErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');

  bodyPage.append(errorMessage);

  errorButton.addEventListener('click', onClickButtonSubmitMessage(errorMessage, errorButton));
  document.addEventListener('click', onClickDocumentSubmitMessage(errorMessage, errorButton));
  document.addEventListener('keydown', onEscSubmitMessage(errorMessage, errorButton));
};

export { addSuccessMessage, addErrorMessage };
