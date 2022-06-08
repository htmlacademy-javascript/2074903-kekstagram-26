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

