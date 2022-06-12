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

export { getRndInteger, shuffle, getIndex };
