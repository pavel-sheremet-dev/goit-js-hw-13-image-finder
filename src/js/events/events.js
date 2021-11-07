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
} from '../services/pageServices';
import ApiService from '../services/apiService';

const refs = getRefs();

const api = new ApiService();

// const getNormalizeData = data => {
//   const results = data.hits;
//   const hits = results.map(result => {
//     return {
//       ...result,
//       page: api.page,
//     };
//   });
//   return {
//     ...data,
//     hits,
//   };
// };

const onSubmit = e => {
  e.preventDefault();
  const form = e.currentTarget;
  const query = form.elements.query.value;
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
        const normalizeData = api.getNormalizeData(data);
        api.countTotalResults();
        getGallery(normalizeData, api.resultsCounter, api.page);
        spinner.stop();
        form.classList.add('transparent');

        refs.input.addEventListener('focus', onInputFocus);
      })
      .catch(err => {
        hideLoadMoreBtn();
        clearGallery();
        showError(err);
        spinner.stop();
      });
  });
  e.currentTarget.reset();
  refs.input.blur();
};

const onLoadMore = () => {
  api.incrementPage();
  showBackdrop();
  disableLoadMoreBtn();
  api
    .fetchPictures(api.query)
    .then(data => {
      hideBackdrop();

      const results = data.hits;
      if (!results.length) {
        showAlert(query, 'Server is not responding. Try again later);
        spinner.stop();
        return;
      }

      const normalizeData = api.getNormalizeData(data);
      api.countTotalResults();
      getGallery(normalizeData, api.resultsCounter, api.page);

      api.getFirstFetchedElemetId(normalizeData);
      const elemToScroll = getElementToScroll(api.firstFetchedElemetId);
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

const onInputFocus = e => {
  refs.form.classList.remove('transparent');
  e.target.addEventListener('blur', () => {
    refs.form.classList.add('transparent');
  });
};

export { onSubmit, onLoadMore, onImageClick };
