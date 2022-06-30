import { EFFECTS } from '../constants.js';

const uploadPhotoForm = document.querySelector('.img-upload__form');
const sliderEffects = uploadPhotoForm.querySelector('.effect-level__slider');
const valueEffect = uploadPhotoForm.querySelector('.effect-level__value');
const effectsContainer = uploadPhotoForm.querySelector('.effects__list');
const previewPhotoForm = uploadPhotoForm.querySelector('.img-upload__preview img');

const addPhotoEffect = (selectedEffect) => {
  const effect = EFFECTS[selectedEffect.value];
  if (previewPhotoForm.className) {
    previewPhotoForm.classList.remove();
    sliderEffects.noUiSlider.destroy();
    previewPhotoForm.style.removeProperty('filter');
  }
  if (selectedEffect.value !== 'none') {
    valueEffect.value = effect.slider.start;

    noUiSlider.create(sliderEffects, effect.slider);

    sliderEffects.noUiSlider.on('update', () => {
      valueEffect.value = sliderEffects.noUiSlider.get();
    });

    previewPhotoForm.classList.add(effect.class);
    previewPhotoForm.style.filter = `${effect.filter}(${valueEffect.value}${effect.typeValue})`;
  } else {
    sliderEffects.classList.add('hidden');
  }
};

const onCLickAddSliderEffect = (evt) => {
  const selectedEffect = evt.target.closest('.effects__radio');
  if (!selectedEffect) {return;}
  if (!effectsContainer.contains(selectedEffect)) {return;}
  sliderEffects.classList.remove('hidden');
  addPhotoEffect(selectedEffect);
};

const addOpenEffectHandler = () => {
  effectsContainer.addEventListener('click', onCLickAddSliderEffect);
};

const cleanPhotoEffects = () => {
  previewPhotoForm.classList.remove();
  sliderEffects.noUiSlider.destroy();
  previewPhotoForm.style.removeProperty('filter');
  sliderEffects.classList.add('hidden');
  effectsContainer.removeEventListener('click', onCLickAddSliderEffect);
};

export { addOpenEffectHandler, cleanPhotoEffects };
