/**
 * Get random ceil number between min and max
 * Use reference - https://www.schoolsw3.com/js/js_random.php
 * @param fromInt min number of gap
 * @param toInt max number of gap
 * @returns random number between this gap
*/
const getRndInteger = function (fromNum, toNum) {
  const min = Math.ceil(Math.min(fromNum, toNum));
  const max = Math.floor(Math.max(fromNum, toNum));

  return Math.floor(Math.random() * (max - min + 1) ) + min;
};

getRndInteger(0, 5);

/**
 * Check that a string is no longer than the max length
 * @param checkString The string which us needed to check
 * @param maxLength The max length of string
 * @returns true if length is right, false if not
 */
const isRightLength = function (checkString, maxLength) {
  return checkString.length <= maxLength;
};

isRightLength('Привет', 25);

const NUMBER_ID_PHOTO = 25;
const NUMBER_ID_COMMENT = 1000;

const DESCRIPTIONS = [
  'Превосходные детали!',
  'Настоящее единение.',
  'Что у него с лицом?',
  'Лучше бы пошёл домой.',
  'Лучший вид из окна сегодня.',
  'Всегда знал, что чёрный мне к лицу.',
  'Вклад в будущее, раз Тинькофф не разрешает.',
  'Как неожиданно и приятно. Очень приятно!'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const USER_NAMES = [
  'Андрей',
  'Анна',
  'Анастасия',
  'Евгений',
  'Федор',
  'Максим',
  'Татьяна',
  'Сергей',
  'Петр',
  'Вячеслав',
  'Марьяна'
];

/**
 * Shuffle indexes of some array
 * @param indexes array with indexes
 * @returns new array with shuffle indexes
 */
const shuffle = function (indexes) {
  for (let i = indexes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }
  return indexes;
};

/**
 * Get unique number from shuffle limit array
 * @param poolSize max number in created array
 * @returns unique number from limit array
 */
const getIndex = function (poolSize) {
  const newIndexes = Array.from({length: poolSize}, (_, i) => i + 1);
  return shuffle(newIndexes);
};

const newPhotoIds = getIndex(NUMBER_ID_PHOTO);
const newCommentIds = getIndex(NUMBER_ID_COMMENT);

/**
 * Create text from array random join 1 or 2 sentences
 * @param array of sentences to create the text
 * @returns prepared text
 */
const createText = function (sentences) {
  const randomLength = getRndInteger(1, 2);
  return shuffle(sentences).slice(0, randomLength).join(' ');
};

/**
 * Create one of comments for photo
 * @returns object of comment
 */
const createComment = function () {
  return {
    idComment: newCommentIds.pop(),
    avatar: `img/avatar-${getRndInteger(1, 6)}`,
    message: createText(MESSAGES),
    nameUser: USER_NAMES[getRndInteger(0, USER_NAMES.length - 1)]
  };
};

/**
 * Create one of photos for post
 * @returns object of photos
 */
const createDataPhoto = function () {
  const newId = newPhotoIds.pop();
  return {
    id: newId,
    url: `photos/${newId}.jpg`,
    description: createText(DESCRIPTIONS),
    likes: getRndInteger(15, 200),
    comments: Array.from({length: getRndInteger(1, 6)}, createComment)
  };
};

//eslint-disable-next-line
const dataPhotos = Array.from({length: 25}, createDataPhoto);
