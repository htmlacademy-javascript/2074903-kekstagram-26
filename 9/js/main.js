import { createDataPhotos } from './mocks/generators.js';
import { NUMBER_PHOTO } from './mocks/generation.js';
import { addPreviews } from './photo-renderer.js';
import { addOpenFullPhotoHandler } from './full-photo.js';
import { addOpenFormUploadPhotoHandler, addPristineValidatorsFromFields } from './upload-form/photo-form.js';

const dataPhotos = createDataPhotos(NUMBER_PHOTO);
addPreviews(dataPhotos);
addOpenFullPhotoHandler(dataPhotos);
addOpenFormUploadPhotoHandler();
addPristineValidatorsFromFields();
