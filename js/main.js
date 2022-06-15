import { NUMBER_PHOTO } from './mocks/generation.js';
import { createDataPhoto, createNewArray } from './mocks/generators.js';

//eslint-disable-next-line
const dataPhotos = createNewArray(NUMBER_PHOTO, (_, i) => createDataPhoto(i + 1));
