import { NUMBER_ID_COMMENT, NUMBER_ID_PHOTO, DESCRIPTIONS, MESSAGES, USER_NAMES } from './constants/generation.js';
import { getRndInteger, shuffle, getIndex } from './functions/helpers.js';

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
