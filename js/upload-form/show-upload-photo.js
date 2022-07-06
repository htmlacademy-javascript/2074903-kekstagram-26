import { FILE_TYPES } from '../constants.js';

const uploadPhotoForm = document.querySelector('.img-upload__form');
const photoChooser = uploadPhotoForm.querySelector('.img-upload__start input[type=file]');
const previewField = uploadPhotoForm.querySelector('.img-upload__preview img');

/**
 * The function of the event handler to show the upload new photo
 * when user adds it by upload form
 */
const addUploadPhotoPreviewHandler = () => {
  photoChooser.addEventListener('change', () => {
    const uploadPhoto = photoChooser.files[0];
    const photoName = uploadPhoto.name.toLowerCase();

    const validateFormat = FILE_TYPES.some((it) => photoName.endsWith(it));

    if (validateFormat) {
      previewField.src = URL.createObjectURL(uploadPhoto);
    }
  });
};

export { addUploadPhotoPreviewHandler };
