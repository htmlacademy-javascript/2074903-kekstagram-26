/**
 * Check that a string is no longer than the max length
 * @param {string} checkString The string which us needed to check
 * @param {int} maxLength The max length of string
 * @returns {boolean} true if length is right, false if not
 */
const isValidLengthStr = (checkString, maxLength) => (checkString.length <= maxLength);

const isValidHashtagSymbols = (hashtags, rightSymbols) => (hashtags.every((element) => rightSymbols.test(element)));

const isValidHashtagLength = (hashtags, maxLength, minLength) =>
  (hashtags.every((element) => (element.length <= maxLength && element.length >= minLength)));


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

const isValidCountHashtags = (hashtags, maxLength) => (hashtags.length <= maxLength);

export {
  isValidLengthStr,
  isValidHashtagSymbols,
  isValidHashtagLength,
  isValidUniqueHashtags,
  isValidCountHashtags
};
