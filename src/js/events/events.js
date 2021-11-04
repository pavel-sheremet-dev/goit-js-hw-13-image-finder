import { showAlert, showError, ALERTS } from '../vendors/alerts';
import getRefs from '../data/references';

const refs = getRefs();

import {
  renderMarkup,
  showLoadMoreBtn,
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

const normalizeDate = ({ hits }) => {
  hits.map(hit => {
    return {
      ...hit,
    };
  });
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

// const getGallery = (data, api) => {
//   renderMarkup(data);
//   const totalResults = api.countTotalResults();
//   if (totalResults > data.totalHits) {
//     hideLoadMoreBtn();
//     console.log('last results');
//     return;
//   }
//   showLoadMoreBtn();
// };

export { onSubmit, onLoadMore, api };
