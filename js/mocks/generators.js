import { shuffle, getRndInteger } from '../functions/helpers.js';
import {
  DESCRIPTIONS,
  MESSAGES,
  USER_NAMES,
  MIN_INDEX_AVATAR,
  MAX_INDEX_AVATAR,
  MIN_COUNT_COMMENT,
  MAX_COUNT_COMMENT,
  MIN_COUNT_LIKES,
  MAX_COUNT_LIKES
} from './generation.js';

/**
 * Create text from array random join 1 or 2 sentences
 * @param array of sentences to create the text
 * @returns prepared text
 */
const createText = (sentences) => {
  const randomLength = getRndInteger(1, 2);
  return shuffle(sentences).slice(0, randomLength).join(' ');
};

const createId = () => {
  let id = 1;
  const autoAddId = () => (id++);
  return autoAddId;
};
/**
 * Create an array of objects
 * @param {int} lengthDatas length of the future array
 * @param {function} fnData function which create an element in the future array
 * @returns {array} prepared array of add elements with the length
 */

const createCommentId = createId();
const generateDatas = (lengthDatas, fnData) => (Array.from({length: lengthDatas}, fnData));

/**
 * Create one of comments for photo
 * @returns {object} of comment
 */
const createComment = () => ({
  idComment: createCommentId(),
  avatar: `img/avatar-${getRndInteger(MIN_INDEX_AVATAR, MAX_INDEX_AVATAR)}`,
  message: createText(MESSAGES),
  nameUser: USER_NAMES[getRndInteger(0, USER_NAMES.length - 1)]
});

/**
 * Create one of photos for post
 * @param {int} newId take id for photo from generate function
 * @returns {object} of photos
 */
const createDataPhoto = (newId) => ({
  id: newId,
  url: `photos/${newId}.jpg`,
  description: createText(DESCRIPTIONS),
  likes: getRndInteger(MIN_COUNT_LIKES, MAX_COUNT_LIKES),
  comments: generateDatas(getRndInteger(MIN_COUNT_COMMENT, MAX_COUNT_COMMENT), createComment)
});

export { createDataPhoto, generateDatas };
