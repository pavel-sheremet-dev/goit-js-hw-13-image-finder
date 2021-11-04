import './sass/main.scss';
import 'material-icons/iconfont/material-icons.css';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';

import { onSubmit, onLoadMore, onImageClick } from './js/events/events';
import getRefs from './js/data/references';

const refs = getRefs();

console.log(basicLightbox);

refs.form.addEventListener('submit', onSubmit);

refs.loadMoreBtn.addEventListener('click', onLoadMore);

refs.gallery.addEventListener('click', onImageClick);

const btn = document.querySelector('.exe').addEventListener('click', () => {
  const instance = basicLightbox.create(`
    <img src="assets/images/image.png" width="800" height="600">
`);
  instance.show();
});
