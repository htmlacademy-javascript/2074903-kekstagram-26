import { shuffle } from './functions/helpers.js';
import { NUMBER_RANDOM_PHOTOS } from './constants.js';

const filterContainer = document.querySelector('.img-filters');
const filterForm = filterContainer.querySelector('.img-filters__form');
const buttonsFilter = filterContainer.querySelectorAll('.img-filters__button');

const compareCountComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

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
