import { addPreviews } from './photo-renderer.js';
import { addOpenFullPhotoHandler } from './full-photo.js';
import { addOpenFormUploadPhotoHandler, sendValidatedPhotoForm } from './upload-form/photo-form.js';
import { getLoaderPhotos, sendDataNewPhoto } from './api.js';
import { showAlert } from './functions/errors.js';
import { addUpdatePreviewsFilterHandler } from './filters.js';
import { debounce } from './functions/helpers.js';
import { RERENDER_DELAY_FILTERS } from './constants.js';

getLoaderPhotos((data) => {
  addPreviews(data);
  addOpenFullPhotoHandler(data);
  addUpdatePreviewsFilterHandler(data, debounce(addPreviews, RERENDER_DELAY_FILTERS));
}, showAlert);
addOpenFormUploadPhotoHandler();
sendValidatedPhotoForm(sendDataNewPhoto);
