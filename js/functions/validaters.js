/**
 * Check that a string/array/ object is no longer than the max length
 * @param {string | array | object} checkedObj The string/array/object which us needed to check
 * @param {int} maxLength The max length
 * @returns {boolean} true if length is right, false if not
 */
const isValidLength = (checkedObj, maxLength) => (checkedObj.length <= maxLength);

/**
 * Check element with needs of conditions by regex
 * @param {array | object} hashtags array or object which we need to check every element in
 * @param {*} rightSymbols regular expressions which contain conditions for this check
 * @returns {boolean} true if contained symbols are right, false if not
 */
const isValidHashtagSymbols = (hashtags, rightSymbols) => (hashtags.every((element) => rightSymbols.test(element)));

/**
 * Check length every elements of array/object to right length with min and max lengthes
 * @param {array | object} hashtags array or object contains checked elements
 * @param {int} maxLength the max length
 * @param {int} minLength the min length
 * @returns {boolean} true if length is right, false if not
 */
const isValidHashtagLength = (hashtags, maxLength, minLength) =>
  (hashtags.every((element) => (element.length <= maxLength && element.length >= minLength)));

/**
 * Check that every element in array or object is unique without registry
 * @param {array | object} hashtags array or object contains checked elements
 * @returns {boolean} true if every element is unique, false if not
 */
const isValidUniqueHashtags = (hashtags) => {
  for (let i = 0; i < hashtags.length; i++) {
    for (let j = i + 1; j < hashtags.length; j++) {
      if (hashtags[i].toLowerCase() === hashtags[j].toLowerCase()) {
        return false;
      }
    }
  }
  return true;
};

export {
  isValidLength,
  isValidHashtagSymbols,
  isValidHashtagLength,
  isValidUniqueHashtags,
};
