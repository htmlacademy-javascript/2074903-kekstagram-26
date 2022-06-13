import {
  NUMBER_ID_COMMENT,
  NUMBER_ID_PHOTO,
  DESCRIPTIONS,
  MESSAGES,
  USER_NAMES,
  MIN_INDEX_AVATAR,
  MAX_INDEX_AVATAR,
  MIN_COUNT_COMMENT,
  MAX_COUNT_COMMENT,
  MIN_COUNT_LIKES,
  MAX_COUNT_LIKES
} from './constants/generation.js';
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
    avatar: `img/avatar-${getRndInteger(MIN_INDEX_AVATAR, MAX_INDEX_AVATAR)}`,
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
    likes: getRndInteger(MIN_COUNT_LIKES, MAX_COUNT_LIKES),
    comments: Array.from({length: getRndInteger(MIN_COUNT_COMMENT, MAX_COUNT_COMMENT)}, createComment)
  };
};

//eslint-disable-next-line
const dataPhotos = Array.from({length: 25}, createDataPhoto);
