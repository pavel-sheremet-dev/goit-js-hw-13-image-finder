import getRefs from '../data/references';
import makeImageCards from '../../templating/imageCards';
import CSS from '../data/css';
import { loadSpinner } from '../vendors/spinner';

const refs = getRefs();

const renderMarkup = ({ hits }) => {
  const markup = makeImageCards(hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  refs.gallery.classList.remove(CSS.IS_HIDDEN);
  showImages();
};

const showImages = () => {
  const images = document.querySelectorAll('img');
  images.forEach(image => {
    image.addEventListener(
      'load',
      () => {
        image.classList.remove(CSS.IS_HIDDEN);
      },
      { once: true },
    );
  });
};

const getGallery = (data, apiService) => {
  renderMarkup(data);
  const totalResults = apiService.countTotalResults();
  if (totalResults > data.totalHits) {
    hideLoadMoreBtn();
    return;
  }
  showLoadMoreBtn();
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

const scrollToNextPage = data => {
  const firstCardId = data.hits[0].id;
  const cardToScroll = document.querySelector(`[data-id="${firstCardId}"]`);
  cardToScroll.scrollIntoView({
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
  scrollToNextPage,
  showBackdrop,
  hideBackdrop,
  hideGallery,
};
