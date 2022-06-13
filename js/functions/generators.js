import { shuffle, getRndInteger } from './helpers.js';

/**
 * Create text from array random join 1 or 2 sentences
 * @param array of sentences to create the text
 * @returns prepared text
 */
const createText = function (sentences) {
  const randomLength = getRndInteger(1, 2);
  return shuffle(sentences).slice(0, randomLength).join(' ');
};

const createId = function () {
  let id = 1;
  const autoAddId = function () {
    return id++;
  };
  return autoAddId;
};

export { createText, createId };
