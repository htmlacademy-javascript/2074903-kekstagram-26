import { NUMBER_ID_COMMENT, NUMBER_ID_PHOTO, DESCRIPTIONS, MESSAGES, USER_NAMES } from './constants/generation.js';
import { getRndInteger, getIndex } from './functions/helpers.js';
import { createText } from './functions/generators.js';

const newPhotoIds = getIndex(NUMBER_ID_PHOTO);
const newCommentIds = getIndex(NUMBER_ID_COMMENT);

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
