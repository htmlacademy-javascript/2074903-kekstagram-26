/**
 * Check that a string is no longer than the max length
 * @param {string} checkString The string which us needed to check
 * @param {int} maxLength The max length of string
 * @returns {boolean} true if length is right, false if not
 */
const isRightLength = (checkString, maxLength) => (checkString.length <= maxLength);

isRightLength('Привет', 25);
