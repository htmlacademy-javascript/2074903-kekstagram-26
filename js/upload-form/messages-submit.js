import { isEscape } from '../functions/helpers.js';

const bodyPage = document.querySelector('body');

const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const closeSuccessMessage = (message, button) => {
  message.remove();
  button.removeEventListener('click', onClickButtonSuccessMessage(message, button));
  document.removeEventListener('click', onClickDocumentSuccessMessage(message, button));
  document.removeEventListener('keydown', onEscSuccessMessage(message, button));
};

function onClickButtonSuccessMessage (message, button) {
  return () => {
    closeSuccessMessage(message, button);
  };
}

function onClickDocumentSuccessMessage (message, button) {
  return (evt) => {
    if (evt.target !== message) {
      closeSuccessMessage(message, button);
    }
  };
}

function onEscSuccessMessage (message, button) {
  return (evt) => {
    if (isEscape(evt)) {
      evt.preventDefault();
      closeSuccessMessage(message, button);
    }
  };
}

const addSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  const successButton = successMessage.querySelector('.success__button');

  bodyPage.append(successMessage);

  successButton.addEventListener('click', onClickButtonSuccessMessage(successMessage, successButton));
  document.addEventListener('click', onClickDocumentSuccessMessage(successMessage, successButton));
  document.addEventListener('keydown', onEscSuccessMessage(successMessage, successButton));
};

export { addSuccessMessage };
