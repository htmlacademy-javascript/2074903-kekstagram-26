const LENGTH_COMMENT = 140;

const COUNT_HASHTAGS = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;

const COUNT_COMMENTS_PER_PAGE = 5;

const SCALE_PHOTO_MIN = 25;
const SCALE_PHOTO_MAX = 100;
const SCALE_PHOTO_CHANGE = 25;

const FORMAT_VALUE_EFFECT = {
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

const EFFECTS = {
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
      format: FORMAT_VALUE_EFFECT,
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
      format: FORMAT_VALUE_EFFECT,
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
      format: FORMAT_VALUE_EFFECT,
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
      format: FORMAT_VALUE_EFFECT,
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
      format: FORMAT_VALUE_EFFECT,
    }
  }
};

export {
  LENGTH_COMMENT,
  COUNT_HASHTAGS,
  MAX_HASHTAG_LENGTH,
  MIN_HASHTAG_LENGTH,
  COUNT_COMMENTS_PER_PAGE,
  SCALE_PHOTO_MIN,
  SCALE_PHOTO_MAX,
  SCALE_PHOTO_CHANGE,
  EFFECTS
};
