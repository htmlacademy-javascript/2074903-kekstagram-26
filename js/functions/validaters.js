/**
 * Check that a string is no longer than the max length
 * @param checkString The string which us needed to check
 * @param maxLength The max length of string
 * @returns true if length is right, false if not
 */
const isRightLength = function (checkString, maxLength) {
  return checkString.length <= maxLength;
};

isRightLength('Привет', 25);
