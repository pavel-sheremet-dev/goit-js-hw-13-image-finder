import { showAlert, showError, ALERTS } from '../vendors/alerts';
import getRefs from '../data/references';
import openImage from '../vendors/basicligthbox';
import { spinner } from '../vendors/spinner';
import {
  hideLoadMoreBtn,
  disableLoadMoreBtn,
  clearGallery,
  getGallery,
  getElementToScroll,
  scrollToNextPage,
  showBackdrop,
  hideBackdrop,
  hideGallery,
} from '../services/pageServices';
import ApiService from '../services/apiService';

const refs = getRefs();

const api = new ApiService();

const onSubmit = e => {
  e.preventDefault();
  const query = e.currentTarget.elements.query.value;
  if (!query.trim()) {
    showAlert(ALERTS.EMPTY);
    return;
  }

  spinner.spin(refs.searchSpin);
  hideLoadMoreBtn();
  clearGallery().then(() => {
    api.resetPage();
    api
      .fetchPictures(query)
      .then(data => {
        const results = data.hits;
        if (!results.length) {
          showAlert(query, ALERTS.NOT_FOUND);
          spinner.stop();
          return;
        }
        spinner.stop();
        getGallery(data, api);
      })
      .catch(err => {
        hideLoadMoreBtn();
        clearGallery();
        spinner.stop();
        showError(err);
      });
  });
  e.currentTarget.reset();
};

const onLoadMore = () => {
  api.incrementPage();
  showBackdrop();
  disableLoadMoreBtn();
  api
    .fetchPictures(api.query)
    .then(data => {
      hideBackdrop();
      getGallery(data, api);

      api.getFirstFetchedElemetId(data);
      const elemToScroll = getElementToScroll(api.firstFetchedElemetId);
      console.log(elemToScroll);
      scrollToNextPage(elemToScroll);
    })
    .catch(err => {
      hideLoadMoreBtn();
      clearGallery();
      showError(err);
    });
};

const onImageClick = e => {
  if (e.target.tagName !== 'IMG') {
    return;
  }
  showBackdrop();
  openImage(e.target.dataset.src);
};

export { onSubmit, onLoadMore, onImageClick };
