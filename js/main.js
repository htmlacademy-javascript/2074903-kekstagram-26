/**
 * Get random ceil number between min and max
 * Use reference - https://www.schoolsw3.com/js/js_random.php
 * @param min min number of gap
 * @param max max number of gap
 * @return random number between this gap
*/
const getRndInteger = function (min, max) {
  if (Math.sign(min) === -1 || Math.sign(max) === -1) {
    return 'Диапазон может быть только положительный, включая ноль';
  }
  if (min >= max) {
    return 'Максимальное число диапазона должно быть больше минимального';
  }
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
