import { addPreviews } from './photo-renderer.js';
import { addOpenFullPhotoHandler } from './full-photo.js';
import { addOpenFormUploadPhotoHandler, addPristineValidatorsFromFields } from './upload-form/photo-form.js';
import { getLoaderPhotos, sendDataNewPhoto } from './api.js';

getLoaderPhotos(addPreviews,err);
getLoaderPhotos(addOpenFullPhotoHandler,err);
addOpenFormUploadPhotoHandler();
addPristineValidatorsFromFields(sendDataNewPhoto);
