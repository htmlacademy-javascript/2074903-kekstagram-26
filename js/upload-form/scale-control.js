import {
  SCALE_PHOTO_MIN,
  SCALE_PHOTO_MAX,
  SCALE_PHOTO_CHANGE,
  START_VALUE_SCALE,
  COEFFICIENT_STYLE_TRANSFORM_SCALE
} from '../constants.js';

const uploadPhotoForm = document.querySelector('.img-upload__form');
const scaleControlValue = uploadPhotoForm.querySelector('.scale__control--value');
const previewPhotoForm = uploadPhotoForm.querySelector('.img-upload__preview img');
const buttonScalePhotoBigger = uploadPhotoForm.querySelector('.scale__control--bigger');
const buttonScalePhotoSmaller = uploadPhotoForm.querySelector('.scale__control--smaller');

/**
 * The function of the event handler to enlarge the photo
 * when the bigger button is clicked
 */
const onClickButtonScaleBigger = () => {
  let curValue = parseInt(scaleControlValue.value, 10);

  if (curValue < SCALE_PHOTO_MAX) {
    curValue += SCALE_PHOTO_CHANGE;
    scaleControlValue.value = `${curValue}%`;
  }

  previewPhotoForm.style.transform = `scale(${curValue * COEFFICIENT_STYLE_TRANSFORM_SCALE})`;
};

/**
 * The function of the event handler to reduce the photo
 * when the smaller button is clicked
 */
const onClickButtonScaleSmaller = () => {
  let curValue = parseInt(scaleControlValue.value, 10);

  if (curValue > SCALE_PHOTO_MIN) {
    curValue -= SCALE_PHOTO_CHANGE;
    scaleControlValue.value = `${curValue}%`;
  }

  previewPhotoForm.style.transform = `scale(${curValue * COEFFICIENT_STYLE_TRANSFORM_SCALE})`;
};

/**
 * The function starts the work of the hadler to change photo scale
 */
const changeScalePhotoHandler = () => {
  buttonScalePhotoBigger.addEventListener('click', onClickButtonScaleBigger);
  buttonScalePhotoSmaller.addEventListener('click', onClickButtonScaleSmaller);
};

/**
 * The function finishes the work of the handler to change photo scale
 */
const removeScalePhotoHandler = () => {
  buttonScalePhotoBigger.removeEventListener('click', onClickButtonScaleBigger);
  buttonScalePhotoSmaller.removeEventListener('click', onClickButtonScaleSmaller);
  scaleControlValue.value = START_VALUE_SCALE;
  previewPhotoForm.style.transform = 'scale(1)';
};

export { changeScalePhotoHandler, removeScalePhotoHandler };
