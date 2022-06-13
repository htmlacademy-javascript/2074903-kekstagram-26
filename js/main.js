import { NUMBER_PHOTO } from './mocks/generation.js';
import { createId, createDataPhoto, generateDatas } from './mocks/generators.js';

const createCommentId = createId();

//eslint-disable-next-line
const dataPhotos = generateDatas(NUMBER_PHOTO, (_, i) => createDataPhoto(i + 1));

export { createCommentId };
debugger;
