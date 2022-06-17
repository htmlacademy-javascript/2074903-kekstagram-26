import { NUMBER_PHOTO } from './mocks/generation.js';
import { createDataPhoto, createNewArray } from './mocks/generators.js';

const dataPhotos = createNewArray(NUMBER_PHOTO, (_, i) => createDataPhoto(i + 1));

export { dataPhotos };
