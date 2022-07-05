import { shuffle } from '../functions/helpers.js';
import { NUMBER_RANDOM_PHOTOS } from './constants.js';

const filterContainer = document.querySelector('.img-filters');
const buttonsFilter = filterContainer.querySelectorAll('.img-filters__button');

const compareCountComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const changePhotosFilter = (filter, photoElements) => {
  buttonsFilter.forEach((element) => {
    element.classList.remove('img-filters__button--active');
    if (filter.id === element.id) {
      element.classList.add('img-filters__button--active');
    }
    if (filter.id === 'default') {
      return photoElements;
    }
    if (filter.id === 'random') {
      return shuffle(photoElements.slice()).slice(0, NUMBER_RANDOM_PHOTOS);
    }
    if (filter.id === 'filter-discussed') {
      return photoElements.slice().sort(compareCountComments);
    }
  });
};

const addUpdatePreviewsFilterHandler = (photoElements) => {
  filterContainer.classList.remove('img-filters--inactive');

  filterContainer.addEventListener('click', (evt) => {
    const filter = evt.target('.img-filters__button');
    if (!filter) {return;}
    if (!filterContainer.contains(filter)) {return;}
    changePhotosFilter(filter, photoElements);
  });
};

export { addUpdatePreviewsFilterHandler };
