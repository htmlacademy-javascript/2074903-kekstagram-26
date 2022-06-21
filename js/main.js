import { NUMBER_PHOTO } from './mocks/generation.js';
import { createDataPhoto, createNewArray } from './mocks/generators.js';
import { addPreviews, photosContainer } from './photo-renderer.js';
import { openFullPhoto } from './full-photo.js';

const dataPhotos = createNewArray(NUMBER_PHOTO, (_, i) => createDataPhoto(i + 1));
addPreviews(dataPhotos);
openFullPhoto(photosContainer,dataPhotos);
