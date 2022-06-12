import { shuffle } from './helpers.js';
import { getRndInteger } from './helpers';

/**
 * Create text from array random join 1 or 2 sentences
 * @param array of sentences to create the text
 * @returns prepared text
 */
const createText = function (sentences) {
  const randomLength = getRndInteger(1, 2);
  return shuffle(sentences).slice(0, randomLength).join(' ');
};

export { createText };
