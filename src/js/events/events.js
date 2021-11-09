import { showAlert, showError, ALERTS } from '../vendors/alerts';
import getRefs from '../data/references';
import openImage from '../vendors/basicligthbox';
import { spinner } from '../vendors/spinner';
import CSS from '../data/css';
import notFoundImageLink from '../../images/broken.png';
import {
  hideLoadMoreBtn,
  disableLoadMoreBtn,
  clearGallery,
  getGallery,
  getElementToScroll,
  scrollToNextPage,
  showBackdrop,
  hideBackdrop,
  getNotFoundPicture,
  showImage,
  enableLoadMoreBtn,
} from '../services/pageServices';
import ApiService from '../services/apiService';
import makeImage from '../../templating/image';

const refs = getRefs();

const api = new ApiService();

const onSubmit = e => {
  e.preventDefault();
  const form = e.currentTarget;
  const query = form.elements.query.value.toLowerCase().trim();
  if (!query) {
    showAlert(ALERTS.EMPTY);
    return;
  }
  getNotFoundPicture(notFoundImageLink);
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
        form.classList.add(CSS.TRANSPARENT);

        refs.input.blur();
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
        showAlert(query, ALERTS.NOT_RESPONDING);
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
      hideBackdrop();
      disableLoadMoreBtn();
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
  refs.form.classList.remove(CSS.TRANSPARENT);
  e.target.addEventListener('blur', () => {
    refs.form.classList.add(CSS.TRANSPARENT);
  });
};

const onStatusOnline = () => {
  enableLoadMoreBtn();
  refs.gallery.addEventListener('click', onImageClick);

  const notFoundImages = document.querySelectorAll('img[alt="Not found"]');
  notFoundImages.forEach(notFoundImage => {
    const container = notFoundImage.closest('div');
    const liRef = notFoundImage.closest('li');
    liRef.classList.add(CSS.ACTIVE);
    api
      .fetchByID(notFoundImage.dataset.id)
      .then(data => {
        container.innerHTML = makeImage(data.hits[0]);
      })
      .then(() => {
        const newImage = container.querySelector('.photo-card__img');
        showImage(newImage, liRef);
      });
  });
};

export { onSubmit, onLoadMore, onImageClick, onStatusOnline };
