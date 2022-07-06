const uploadPhotoForm = document.querySelector('.img-upload__form');
const sliderContainer = uploadPhotoForm.querySelector('.img-upload__effect-level');
const sliderEffects = uploadPhotoForm.querySelector('.effect-level__slider');
const valueEffect = uploadPhotoForm.querySelector('.effect-level__value');
const effectsContainer = uploadPhotoForm.querySelector('.effects__list');
const previewPhotoForm = uploadPhotoForm.querySelector('.img-upload__preview img');

const formatValueEffect = {
  to: function (value) {
    if (Number.isInteger(value)) {
      return value.toFixed(0);
    }
    return value.toFixed(1);
  },
  from: function (value) {
    return parseFloat(value);
  },
};

const effects = {
  'chrome': {
    filter: 'grayscale',
    class: 'effects__preview--chrome',
    typeValue: '',
    slider: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
      format: formatValueEffect,
    }
  },
  'sepia': {
    filter: 'sepia',
    class: 'effects__preview--sepia',
    typeValue: '',
    slider: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
      format: formatValueEffect,
    }
  },
  'marvin': {
    filter: 'invert',
    class: 'effects__preview--marvin',
    typeValue: '%',
    slider: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
      connect: 'lower',
      format: formatValueEffect,
    }
  },
  'phobos': {
    filter: 'blur',
    class: 'effects__preview--phobos',
    typeValue: 'px',
    slider: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
      connect: 'lower',
      format: formatValueEffect,
    }
  },
  'heat': {
    filter: 'brightness',
    class: 'effects__preview--heat',
    typeValue: '',
    slider: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
      connect: 'lower',
      format: formatValueEffect,
    }
  }
};

/**
 * Performs a set of actions required when user needs to change effect
 * but there is any previous effect now
 */
const cleanPreviousClass = () => {
  if (previewPhotoForm.className) {
    previewPhotoForm.classList.remove(previewPhotoForm.className);
    sliderEffects.noUiSlider.destroy();
    previewPhotoForm.style.removeProperty('filter');
  }
};

/**
 * Adds new effect to upload new photo with slider rate when user chooses it
 * @param {object} selectedEffect The effect which was chose by user
 */
const addPhotoEffect = (selectedEffect) => {
  const effect = effects[selectedEffect.value];
  cleanPreviousClass();
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

/**
 * The function of the event handler for closing the successful pop-up
 * when the button is clicked
 * @param {object} evt The context which user connects with
 * @returns Break the handler if user connect diff elements
 */
const onCLickAddSliderEffect = (evt) => {
  const selectedEffect = evt.target.closest('.effects__radio');
  if (!selectedEffect) {return;}
  if (!effectsContainer.contains(selectedEffect)) {return;}
  addPhotoEffect(selectedEffect);
};

/**
 * The function starts the work of the hadler to change photo effects
 */
const addOpenEffectHandler = () => {
  effectsContainer.addEventListener('click', onCLickAddSliderEffect);
};

/**
 * The function finishes the work of the handler to change photo effects
 */
const cleanPhotoEffects = () => {
  cleanPreviousClass();
  sliderContainer.classList.add('hidden');
  effectsContainer.removeEventListener('click', onCLickAddSliderEffect);
};

export { addOpenEffectHandler, cleanPhotoEffects };
