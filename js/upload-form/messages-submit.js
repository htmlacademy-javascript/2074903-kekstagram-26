import { isEscape } from '../functions/helpers.js';

const bodyPage = document.querySelector('body');

const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const closeSubmitMessage = (message, button, form) => {
  if (message.classList.contains('error')) {
    form.classList.remove('hidden');
  }
  message.remove();
  button.removeEventListener('click', onClickButtonSubmitMessage(message, button, form));
  document.removeEventListener('click', onClickDocumentSubmitMessage(message, button, form));
  document.removeEventListener('keydown', onEscSubmitMessage(message, button, form));
  console.log('я выполнился');
};

function onClickButtonSubmitMessage (message, button, form) {
  return () => {
    closeSubmitMessage(message, button, form);
  };
}

function onClickDocumentSubmitMessage (message, button, form) {
  return (evt) => {
    if (evt.target.matches('.success') || evt.target.matches('.error')) {
      closeSubmitMessage(message, button, form);
    }
  };
}

function onEscSubmitMessage (message, button, form) {
  return (evt) => {
    if (isEscape(evt) && form.classList.contains('hidden')) {
      console.log(form.classList.contains('hidden'));
      evt.preventDefault();
      closeSubmitMessage(message, button, form);
    }
  };
}

const addSuccessMessage = (form) => {
  const successMessage = successMessageTemplate.cloneNode(true);
  const successButton = successMessage.querySelector('.success__button');

  bodyPage.append(successMessage);

  successButton.addEventListener('click', onClickButtonSubmitMessage(successMessage, successButton, form));
  document.addEventListener('click', onClickDocumentSubmitMessage(successMessage, successButton, form));
  document.addEventListener('keydown', onEscSubmitMessage(successMessage, successButton, form));
};

const addErrorMessage = (form) => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');
  form.classList.add('hidden');
  bodyPage.append(errorMessage);

  errorButton.addEventListener('click', onClickButtonSubmitMessage(errorMessage, errorButton, form));
  document.addEventListener('click', onClickDocumentSubmitMessage(errorMessage, errorButton, form));
  document.addEventListener('keydown', onEscSubmitMessage(errorMessage, errorButton, form));
};

export { addSuccessMessage, addErrorMessage };
