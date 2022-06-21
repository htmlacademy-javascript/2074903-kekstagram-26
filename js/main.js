import { createDataPhotos } from './mocks/generators.js';
import { addPreviews } from './photo-renderer.js';
import { openFullPhoto } from './full-photo.js';

const dataPhotos = createDataPhotos();
addPreviews(dataPhotos);
openFullPhoto(dataPhotos);
