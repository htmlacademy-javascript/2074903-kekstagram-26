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
  MAX_COUNT_LIKES,
  MIN_SENTENCES,
  MAX_SENTENCES
} from './generation.js';

/**
 * Create text from array random join 1 or 2 sentences
 * @param {array} sentences - array of sentences to create the text
 * @param {int} maxSentences max amount sentences in the single element
 * @param {int} minSentences min amount sentences in the single element
 * @returns prepared text
 */
const createText = (sentences, minSentences, maxSentences) => {
  const randomLength = getRndInteger(minSentences, maxSentences);
  return shuffle(sentences).slice(0, randomLength).join(' ');
};

const createId = () => {
  let id = 1;
  const getNextId = () => (id++);
  return getNextId;
};

const createCommentId = createId();

/**
 * Create an array of objects with the concrete length
 * @param {int} sumElements length of the future array
 * @param {function} creatorSingleElement function which create an element in the future array
 * @returns {array} prepared array of added elements with the length
 */
const createNewArray = (sumElements, creatorSingleElement) =>
  (Array.from({length: sumElements}, creatorSingleElement));

/**
 * Create one of comments for photo
 * @returns {object} of comment
 */
const createComment = () => ({
  idComment: createCommentId(),
  avatar: `img/avatar-${getRndInteger(MIN_INDEX_AVATAR, MAX_INDEX_AVATAR)}.svg`,
  message: createText(MESSAGES, MIN_SENTENCES, MAX_SENTENCES),
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
  description: createText(DESCRIPTIONS, MIN_SENTENCES, MAX_SENTENCES),
  likes: getRndInteger(MIN_COUNT_LIKES, MAX_COUNT_LIKES),
  comments: createNewArray(getRndInteger(MIN_COUNT_COMMENT, MAX_COUNT_COMMENT), createComment)
});

const createDataPhotos = (sumElements) =>
  (createNewArray(sumElements, (_, i) => createDataPhoto(i + 1)));

export { createDataPhotos };
