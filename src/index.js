import 'material-icons/iconfont/material-icons.css';
import './sass/main.scss';

import { onSubmit, onLoadMore, onImageClick } from './js/events/events';
import getRefs from './js/data/references';

const refs = getRefs();

refs.form.addEventListener('submit', onSubmit);

refs.loadMoreBtn.addEventListener('click', onLoadMore);

refs.gallery.addEventListener('click', onImageClick);
