import {
  SCALE_PHOTO_MIN,
  SCALE_PHOTO_MAX,
  SCALE_PHOTO_CHANGE
} from '../constants.js';

const uploadPhotoForm = document.querySelector('.img-upload__form');
const scaleControlValue = uploadPhotoForm.querySelector('.scale__control--value');
const previewPhotoForm = uploadPhotoForm.querySelector('.img-upload__preview img');

const onClickButtonsScale = (evt) => {
  let curValue = parseInt(scaleControlValue.value, 10);

  if (curValue < SCALE_PHOTO_MAX &&
    evt.target.classList.contains('scale__control--bigger')) {
    curValue += SCALE_PHOTO_CHANGE;
  }
  if (curValue > SCALE_PHOTO_MIN &&
    evt.target.classList.contains('scale__control--smaller')) {
    curValue -= SCALE_PHOTO_CHANGE;
  }

  scaleControlValue.value = `${curValue}%`;
  previewPhotoForm.style.transform = `scale(${curValue * 0.01})`;
};

export { onClickButtonsScale };
