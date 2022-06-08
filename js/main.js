/**
 * Get random ceil number between min and max
 * Use reference - https://www.schoolsw3.com/js/js_random.php
 * @param fromInt min number of gap
 * @param toInt max number of gap
 * @return random number between this gap
*/
const getRndInteger = function (fromNum, toNum) {
  const min = Math.ceil(Math.min(fromNum, toNum));
  const max = Math.floor(Math.max(fromNum, toNum));

  return Math.floor(Math.random() * (max - min + 1) ) + min;
};

getRndInteger(0, 5);

/**
 * Check that a string is no longer than the max length
 * @param checkString The string which us needed to check
 * @param maxLength The max length of string
 * @return true if length is right, false if not
 */
const isRightLength = function (checkString, maxLength) {
  return checkString.length <= maxLength;
};

isRightLength('Привет', 25);
