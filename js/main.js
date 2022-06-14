import { NUMBER_PHOTO } from './mocks/generation.js';
import { createDataPhoto, generateDatas } from './mocks/generators.js';

//eslint-disable-next-line
const dataPhotos = generateDatas(NUMBER_PHOTO, (_, i) => createDataPhoto(i + 1));
