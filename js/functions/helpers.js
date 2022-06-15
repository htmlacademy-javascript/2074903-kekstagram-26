/**
 * Get random ceil number between min and max
 * Use reference - https://www.schoolsw3.com/js/js_random.php
 * @param {int} fromInt min number of gap
 * @param {int} toInt max number of gap
 * @returns random number between this gap
*/
const getRndInteger = (fromNum, toNum) => {
  const min = Math.ceil(Math.min(fromNum, toNum));
  const max = Math.floor(Math.max(fromNum, toNum));

  return Math.floor(Math.random() * (max - min + 1) ) + min;
};

/**
 * Shuffle some array
 * @param {array} items any array (for example, with indexes)
 * @returns {array} new array with shuffle elements
 */
const shuffle = (items) => {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
};

export { getRndInteger, shuffle };
