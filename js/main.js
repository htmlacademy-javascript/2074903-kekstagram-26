/**
 * Get random ceil number between min and max
 * Use reference - https://www.schoolsw3.com/js/js_random.php
 * @param fromInt min number of gap
 * @param toInt max number of gap
 * @return random number between this gap
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
 * @return true if length is right, false if not
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
]

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
 * Get unique number from shuffle limit array
 * @param poolSize max number in created array
 * @return unique number from limit array
 */
const getIndex = function (poolSize) {
  const newArray = Array.from({length: poolSize}, (_, i) => i + 1);
  const shuffle = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return newArray;
  };
  return shuffle(newArray);
};

const newPhotoIds = getIndex(NUMBER_ID_PHOTO);
const newCommentIds = getIndex(NUMBER_ID_COMMENT);

/**
 * Create the random string from elements
 * @param length of new string for random description
 * @return random string
 */
const makeDescription = function (length) {
  let result = '';
  const words = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const wordsLength = words.length;
  for (let i = 0; i < length; i++ ) {
    result += words.charAt(Math.floor(Math.random() * wordsLength));
  }
  return result;
};

/**
 * Create messege for comments from array random join 1 or 2 sentences
 * @return prepared message
 */
const createMessage = function () {
  const messages = [];
  const countSentences = getRndInteger(1, 2);
  for (let i = 0; i < countSentences; i++) {
    messages[i] = [MESSAGES[getRndInteger(0, MESSAGES.length - 1)]];
  }
  const message = messages.join(' ');
  return message;
};

/**
 * Create one of comments for photo
 * @return object of comment
 */
const comment = function () {
  return {
    idComment: newCommentIds.pop(),
    avatar: `img/avatar-${getRndInteger(1, 6)}`,
    message: createMessage(),
    nameUser: USER_NAMES[getRndInteger(0, USER_NAMES.length - 1)]
  };
};

/**
 * Create one of photos for post
 * @return object of photos
 */
const dataPhoto = function () {
  const newId = newPhotoIds.pop();
  return {
    id: newId,
    url: `photos/${newId}.jpg`,
    description: makeDescription(20),
    likes: getRndInteger(15, 200),
    comments: Array.from({length: getRndInteger(1, 6)}, comment)
  };
};

//eslint-disable-next-line
const dataPhotos = Array.from({length: 25}, dataPhoto);
