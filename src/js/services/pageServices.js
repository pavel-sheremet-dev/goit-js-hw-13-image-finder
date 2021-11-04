import getRefs from '../data/references';
import makeImageCards from '../../templating/imageCards';

const refs = getRefs();

const renderMarkup = ({ hits }) => {
  const markup = makeImageCards(hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
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
  refs.gallery.innerHTML = '';
};

const showLoadMoreBtn = () => {
  refs.loadMoreBtn.disabled = false;
  refs.loadMoreBtn.classList.remove('is-hidden');
};

const hideLoadMoreBtn = () => {
  refs.loadMoreBtn.disabled = true;
  refs.loadMoreBtn.classList.add('is-hidden');
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

export {
  renderMarkup,
  showLoadMoreBtn,
  hideLoadMoreBtn,
  disableLoadMoreBtn,
  clearGallery,
  getGallery,
  scrollToNextPage,
};
