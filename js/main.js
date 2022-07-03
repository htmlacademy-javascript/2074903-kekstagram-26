import { addPreviews } from './photo-renderer.js';
import { addOpenFullPhotoHandler } from './full-photo.js';
import { addOpenFormUploadPhotoHandler, addPristineValidatorsFromFields } from './upload-form/photo-form.js';
import { getLoaderPhotos } from './api.js';

getLoaderPhotos(addPreviews);
getLoaderPhotos(addOpenFullPhotoHandler);
addOpenFormUploadPhotoHandler();
addPristineValidatorsFromFields();
