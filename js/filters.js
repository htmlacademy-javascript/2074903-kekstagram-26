import { shuffle } from './functions/helpers.js';
import { NUMBER_RANDOM_PHOTOS } from './constants.js';

const filterContainer = document.querySelector('.img-filters');
const filterForm = filterContainer.querySelector('.img-filters__form');
const buttonsFilter = filterContainer.querySelectorAll('.img-filters__button');

/**
 * Compare every elements of array to sort it with condition of comment length
 * @param {object} photoA the first element
 * @param {object} photoB the secind element
 * @returns {int} about equlity of these elements or what of them is bigger
 */
const compareCountComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

/**
 * Sorts existing photos from server with chose filter by user
 * @param {object} filter the filter which was chose by user
 * @param {array} photoElements the full array of all existing photos on the server
 * @returns {array} new array to show user with his/her filter
 */
const changePhotosFilter = (filter, photoElements) => {
  if (filter.id === 'filter-default') {
    return photoElements;
  }
  if (filter.id === 'filter-random') {
    return shuffle(photoElements.slice()).slice(0, NUMBER_RANDOM_PHOTOS);
  }
  if (filter.id === 'filter-discussed') {
    return photoElements.slice().sort(compareCountComments);
  }
};

/**
 * Updates photos for user after his/her choosing any filter
 * @param {array} photoElements the full array of all existing photos on the server
 * @param {cb} createNewPreviews the function which fills window new sort array for user
 */
const addUpdatePreviewsFilterHandler = (photoElements, createNewPreviews) => {
  filterContainer.classList.remove('img-filters--inactive');

  filterForm.addEventListener('click', (evt) => {
    const filter = evt.target.closest('.img-filters__button');
    if (!filter) {return photoElements;}
    if (!filterContainer.contains(filter)) {return photoElements;}

    for (let i = 0; i < buttonsFilter.length; i++) {
      buttonsFilter[i].classList.remove('img-filters__button--active');
      if (filter.id === buttonsFilter[i].id) {
        buttonsFilter[i].classList.add('img-filters__button--active');
      }
    }
    createNewPreviews(changePhotosFilter(filter, photoElements));
  });
};

export { addUpdatePreviewsFilterHandler };
