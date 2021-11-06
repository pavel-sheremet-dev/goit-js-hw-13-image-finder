import getRefs from '../data/references';
import makeImageCards from '../../templating/imageCards';
import CSS from '../data/css';
import { loadSpinner } from '../vendors/spinner';

const refs = getRefs();

const getGallery = (data, totalResults, page) => {
  renderMarkup(data);
  showImages(page);
  if (totalResults > data.totalHits) {
    hideLoadMoreBtn();
    return;
  }
  showLoadMoreBtn();
};

const renderMarkup = ({ hits }) => {
  const markup = makeImageCards(hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  refs.gallery.classList.remove(CSS.IS_HIDDEN);
};

const showImages = page => {
  const images = document.querySelectorAll(`[data-page="${page}"]`);
  images.forEach(image => {
    const liRef = image.closest('li');
    image.addEventListener(
      'load',
      () => {
        image.classList.remove(CSS.IS_HIDDEN);
        liRef.classList.remove(CSS.ACTIVE);
      },
      { once: true },
    );
  });
};

const clearGallery = () => {
  hideGallery();
  const promise = new Promise(res => {
    setTimeout(() => {
      refs.gallery.innerHTML = '';
      res();
    }, 250);
  });
  return promise;
};

const hideGallery = () => {
  refs.gallery.classList.add(CSS.IS_HIDDEN);
};

const showLoadMoreBtn = () => {
  refs.loadMoreBtn.disabled = false;
  refs.loadMoreBtn.classList.remove(CSS.IS_HIDDEN);
};

const hideLoadMoreBtn = () => {
  refs.loadMoreBtn.disabled = true;
  refs.loadMoreBtn.classList.add(CSS.IS_HIDDEN);
};

const disableLoadMoreBtn = () => {
  refs.loadMoreBtn.disabled = true;
};

const getElementToScroll = id => {
  return document.querySelector(`[data-id="${id}"]`);
};

const scrollToNextPage = element => {
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};

const showBackdrop = () => {
  refs.backdrop.classList.remove(CSS.IS_HIDDEN);
  loadSpinner.spin(refs.loadMoreSpinner);
};

const hideBackdrop = () => {
  refs.backdrop.classList.add(CSS.IS_HIDDEN);
  loadSpinner.stop();
};

export {
  renderMarkup,
  showLoadMoreBtn,
  hideLoadMoreBtn,
  disableLoadMoreBtn,
  clearGallery,
  getGallery,
  getElementToScroll,
  scrollToNextPage,
  showBackdrop,
  hideBackdrop,
  hideGallery,
};
