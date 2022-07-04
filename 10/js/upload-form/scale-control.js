import {
  SCALE_PHOTO_MIN,
  SCALE_PHOTO_MAX,
  SCALE_PHOTO_CHANGE
} from '../constants.js';

const uploadPhotoForm = document.querySelector('.img-upload__form');
const scaleControlValue = uploadPhotoForm.querySelector('.scale__control--value');
const previewPhotoForm = uploadPhotoForm.querySelector('.img-upload__preview img');
const buttonScalePhotoBigger = uploadPhotoForm.querySelector('.scale__control--bigger');
const buttonScalePhotoSmaller = uploadPhotoForm.querySelector('.scale__control--smaller');

const onClickButtonScaleBigger = () => {
  let curValue = parseInt(scaleControlValue.value, 10);

  if (curValue < SCALE_PHOTO_MAX) {
    curValue += SCALE_PHOTO_CHANGE;
    scaleControlValue.value = `${curValue}%`;
  }

  previewPhotoForm.style.transform = `scale(${curValue * 0.01})`;
};

const onClickButtonScaleSmaller = () => {
  let curValue = parseInt(scaleControlValue.value, 10);

  if (curValue > SCALE_PHOTO_MIN) {
    curValue -= SCALE_PHOTO_CHANGE;
    scaleControlValue.value = `${curValue}%`;
  }

  previewPhotoForm.style.transform = `scale(${curValue * 0.01})`;
};

const changeScalePhotoHandler = () => {
  buttonScalePhotoBigger.addEventListener('click', onClickButtonScaleBigger);
  buttonScalePhotoSmaller.addEventListener('click', onClickButtonScaleSmaller);
};

const removeScalePhotoHandler = () => {
  buttonScalePhotoBigger.removeEventListener('click', onClickButtonScaleBigger);
  buttonScalePhotoSmaller.removeEventListener('click', onClickButtonScaleSmaller);
  scaleControlValue.value = '100%';
  previewPhotoForm.style.transform = 'scale(1)';
};

export { changeScalePhotoHandler, removeScalePhotoHandler };
