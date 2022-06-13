import { NUMBER_ID_PHOTO } from './constants/generation.js';
import { createId, createDataPhoto } from './functions/generators.js';

const createCommentId = createId();

//eslint-disable-next-line
const dataPhotos = Array.from({length: NUMBER_ID_PHOTO}, (_, i) => createDataPhoto(i + 1));

export { createCommentId };
