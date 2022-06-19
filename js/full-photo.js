import { dataPhotos } from './data.js';
import { photosContainer } from './photo-renderer.js';

const fullPhoto = document.querySelector('.big-picture');
const previewPhotos = photosContainer.querySelectorAll('a.picture');

const addComment = (avatar, nameUser, message) => {
  const commentContainerTemplate = document.createElement('li');
  commentContainerTemplate.classList.add('social__comment');
  const commentImg = document.createElement('img');
  commentContainerTemplate.append(commentImg);
  commentImg.classList.add('social__picture');
  commentImg.src = avatar;
  commentImg.alt = nameUser;
  commentImg.wigth = '35';
  commentImg.height = '35';
  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentContainerTemplate.append(commentText);
  commentText.textContent = message;
};

const addPreviewClickHandler = function (previewPhoto, dataPhoto) {
  previewPhoto.addEventListener('click', () => {
    fullPhoto.remove('hidden');
    fullPhoto.querySelector('.big-picture__img img').src = dataPhoto.url;
    fullPhoto.querySelector('.big-picture__img img').alt = 'Авторская фотография';
    fullPhoto.querySelector('.social__caption').textContent = dataPhoto.description;
    fullPhoto.querySelector('.likes-count').textContent = dataPhoto.likes;
    fullPhoto.querySelector('.comments-count').textContent = dataPhoto.comments.length;
    const commentsContainer = fullPhoto.querySelector('.social__comments');
    const defaultComments = commentsContainer.querySelectorAll('.social__comment');
    for (let i = 0; i < defaultComments.length; i++) {
      commentsContainer.removeChild(defaultComments[i]);
    }
    const commentsContainerFragment = document.createDocumentFragment();
    dataPhoto.comments.forEach(({avatar, nameUser, message}) => {
      const commentElement = addComment(avatar, nameUser, message);
      commentsContainerFragment.append(commentElement);
    });
    commentsContainer.append(commentsContainerFragment);
  });
};

for (let i = 0; i < previewPhotos.length; i++) {
  addPreviewClickHandler(previewPhotos[i], dataPhotos[i]);
}

const hiddenCountComments = fullPhoto.querySelector('.social__comment-count');
const hiddenLoaderComments = fullPhoto.querySelector('.comments-loader');
const staticPageContent = document.querySelector('body');

if (!fullPhoto.classList.contains('hidden')) {
  hiddenCountComments.classList.add('hidden');
  hiddenLoaderComments.classList.add('hidden');
  staticPageContent.classList.add('modal-open');
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      fullPhoto.classList.add('hidden');
      hiddenCountComments.remove('hidden');
      hiddenLoaderComments.remove('hidden');
      staticPageContent.remove('modal-open');
    }
  });
}
