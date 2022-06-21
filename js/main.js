import { createDataPhotos } from './mocks/generators.js';
import { NUMBER_PHOTO } from './mocks/generation.js';
import { addPreviews } from './photo-renderer.js';
import { openFullPhoto } from './full-photo.js';

const dataPhotos = createDataPhotos(NUMBER_PHOTO);
addPreviews(dataPhotos);
openFullPhoto(dataPhotos);
