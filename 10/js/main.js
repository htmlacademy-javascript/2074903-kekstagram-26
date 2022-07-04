import { addPreviews } from './photo-renderer.js';
import { addOpenFullPhotoHandler } from './full-photo.js';
import { addOpenFormUploadPhotoHandler, sendValidatedPhotoForm } from './upload-form/photo-form.js';
import { getLoaderPhotos, sendDataNewPhoto } from './api.js';
import { showAlert } from './functions/errors.js';

getLoaderPhotos(addPreviews, showAlert);
getLoaderPhotos(addOpenFullPhotoHandler, showAlert);
addOpenFormUploadPhotoHandler();
sendValidatedPhotoForm(sendDataNewPhoto);
