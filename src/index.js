import './sass/main.scss';
import 'material-icons/iconfont/material-icons.css';
import { onSubmit, onLoadMore } from './js/events/events';
import getRefs from './js/data/references';

const refs = getRefs();

refs.form.addEventListener('submit', onSubmit);

refs.loadMoreBtn.addEventListener('click', onLoadMore);
