import { NUMBER_PHOTO } from './constants/generation.js';
import { createId, createDataPhoto, generateDatas } from './functions/generators.js';

const createCommentId = createId();

//eslint-disable-next-line
const dataPhotos = generateDatas(NUMBER_PHOTO, (_, i) => createDataPhoto(i + 1));

export { createCommentId };
