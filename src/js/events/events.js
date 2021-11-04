import { showAlert, showError, ALERTS } from '../vendors/alerts';
import getRefs from '../data/references';
import openImage from '../vendors/basicligthbox';

const refs = getRefs();

import {
  hideLoadMoreBtn,
  disableLoadMoreBtn,
  clearGallery,
  getGallery,
  scrollToNextPage,
} from '../services/pageServices';

import ApiService from '../services/apiService';
const api = new ApiService();

const onSubmit = e => {
  e.preventDefault();
  const query = e.currentTarget.elements.query.value;

  if (!query.trim()) {
    showAlert(ALERTS.EMPTY);
    return;
  }

  api.resetPage();
  api
    .fetchPictures(query)
    .then(data => {
      const results = data.hits;
      if (!results.length) {
        showAlert(query, ALERTS.NOT_FOUND);
        return;
      }

      clearGallery();
      getGallery(data, api);
    })
    .catch(err => {
      hideLoadMoreBtn();
      clearGallery();
      showError(err);
    });

  e.currentTarget.reset();
};

const onLoadMore = () => {
  api.incrementPage();
  disableLoadMoreBtn();
  api
    .fetchPictures(api.query)
    .then(data => {
      getGallery(data, api);
      scrollToNextPage(data);
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
  openImage(e.target.dataset.src);
};

export { onSubmit, onLoadMore, onImageClick };
