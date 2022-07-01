import { effects } from '../constants.js';

const uploadPhotoForm = document.querySelector('.img-upload__form');
const sliderContainer = uploadPhotoForm.querySelector('.img-upload__effect-level');
const sliderEffects = uploadPhotoForm.querySelector('.effect-level__slider');
const valueEffect = uploadPhotoForm.querySelector('.effect-level__value');
const effectsContainer = uploadPhotoForm.querySelector('.effects__list');
const previewPhotoForm = uploadPhotoForm.querySelector('.img-upload__preview img');

const addPhotoEffect = (selectedEffect) => {
  const effect = effects[selectedEffect.value];
  if (previewPhotoForm.className) {
    previewPhotoForm.classList.remove(previewPhotoForm.className);
    sliderEffects.noUiSlider.destroy();
    previewPhotoForm.style.removeProperty('filter');
  }
  if (selectedEffect.value !== 'none') {
    sliderContainer.classList.remove('hidden');
    valueEffect.value = effect.slider.start;

    noUiSlider.create(sliderEffects, effect.slider);

    sliderEffects.noUiSlider.on('update', () => {
      valueEffect.value = sliderEffects.noUiSlider.get();
      previewPhotoForm.style.filter = `${effect.filter}(${valueEffect.value}${effect.typeValue})`;
    });

    previewPhotoForm.classList.add(effect.class);
  } else {
    sliderContainer.classList.add('hidden');
  }
};

const onCLickAddSliderEffect = (evt) => {
  const selectedEffect = evt.target.closest('.effects__radio');
  if (!selectedEffect) {return;}
  if (!effectsContainer.contains(selectedEffect)) {return;}
  addPhotoEffect(selectedEffect);
};

const addOpenEffectHandler = () => {
  effectsContainer.addEventListener('click', onCLickAddSliderEffect);
};

const cleanPhotoEffects = () => {
  if (previewPhotoForm.className) {
    previewPhotoForm.classList.remove();
    sliderEffects.noUiSlider.destroy();
    previewPhotoForm.style.removeProperty('filter');
  }
  sliderContainer.classList.add('hidden');
  effectsContainer.removeEventListener('click', onCLickAddSliderEffect);
};

export { addOpenEffectHandler, cleanPhotoEffects };
