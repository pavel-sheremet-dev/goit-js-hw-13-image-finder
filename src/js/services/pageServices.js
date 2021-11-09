// const options = {
//   url: NOT_FOUND_IMG_LINK,
//   css: CSS,
//   refs: refs,
//   makeImageCards: makeImageCards,
//   imageModal: basicLightbox,
//   loadSpinner: loadSpinner,
// };

import ApiService from './apiServices';

export default class PageServices extends ApiService {
  constructor({
    not_fnd_img_url,
    css,
    refs,
    makeImageCards,
    makeImage,
    imageModal,
    loadSpinner,
    inputLoadSpinner,
  }) {
    super(not_fnd_img_url);
    // this._imageNotFoundLink = url;
    this._css = css;
    this._refs = refs;
    this.makeImage = makeImage;
    this.makeImageCards = makeImageCards;
    this.imageModal = imageModal;
    this.loadSpinner = loadSpinner;
    this.inputLoadSpinner = inputLoadSpinner;
  }

  getNotFoundPicture = () => {
    const img = new Image();
    img.src = this._imageNotFoundLink;
    img.dataset.src = this._imageNotFoundLink;
    img.alt = 'Not found';
    img.classList.add(this._css.IMG, this._css.NOT_FOUND);
    return img;
  };

  getGallery = (data, totalResults, page) => {
    this.renderMarkup(data);
    this.showImages(page);
    if (totalResults > data.totalHits) {
      this.hideLoadMoreBtn();
      return;
    }
    this.showLoadMoreBtn();
  };

  renderMarkup = ({ hits }) => {
    const markup = this.makeImageCards(hits);

    this._refs.gallery.insertAdjacentHTML('beforeend', markup);
    this._refs.gallery.classList.remove(this._css.IS_HIDDEN);
  };

  showImages = page => {
    const images = document.querySelectorAll(`[data-page="${page}"]`);

    images.forEach(image => {
      const liRef = image.closest('li');

      this.showImage(image, liRef);

      image.onerror = () => {
        const notFoundImage = this.getNotFoundPicture(this._imageNotFoundLink);
        notFoundImage.dataset.id = liRef.dataset.id;
        image.replaceWith(notFoundImage);
        setTimeout(() => {
          liRef.classList.remove(this._css.ACTIVE);
        }, 2000);
      };
    });
  };

  showImage = (image, liRef) => {
    image.addEventListener(
      'load',
      () => {
        image.classList.remove(this._css.IS_HIDDEN);
        liRef.classList.remove(this._css.ACTIVE);
      },
      { once: true },
    );
  };

  getOpenImageOptions = () => {
    return {
      onShow: () => {
        document.body.classList.add(this._css.LOCK);
      },
      onClose: () => {
        document.body.classList.remove(this._css.LOCK);
      },
    };
  };

  openImage = src => {
    const options = {
      onShow: () => {
        document.body.classList.add(this._css.LOCK);
      },
      onClose: () => {
        document.body.classList.remove(this._css.LOCK);
      },
    };

    const instance = this.imageModal.create(
      `
    <img src="${src}">
`,
      options,
    );

    const imageRef = instance.element().querySelector('img');

    imageRef.addEventListener(
      'load',
      () => {
        instance.show();
        this.hideBackdrop();
      },
      { once: true },
    );
  };

  clearGallery = () => {
    this.hideGallery();
    const promise = new Promise(res => {
      setTimeout(() => {
        this._refs.gallery.innerHTML = '';
        res(true);
      }, 250);
    });
    return promise;
  };

  hideGallery = () => {
    this._refs.gallery.classList.add(this._css.IS_HIDDEN);
  };

  showLoadMoreBtn = () => {
    this._refs.loadMoreBtn.disabled = false;
    this._refs.loadMoreBtn.classList.remove(this._css.IS_HIDDEN);
  };

  hideLoadMoreBtn = () => {
    this._refs.loadMoreBtn.disabled = true;
    this._refs.loadMoreBtn.classList.add(this._css.IS_HIDDEN);
  };

  disableLoadMoreBtn = () => {
    this._refs.loadMoreBtn.disabled = true;
  };

  enableLoadMoreBtn = () => {
    this._refs.loadMoreBtn.disabled = false;
  };

  getElementToScroll = id => {
    return document.querySelector(`[data-id="${id}"]`);
  };

  scrollToNextPage = element => {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  showBackdrop = () => {
    this._refs.backdrop.classList.remove(this._css.IS_HIDDEN);
    this.loadSpinner.spin(this._refs.loadMoreSpinner);
  };

  hideBackdrop = () => {
    this._refs.backdrop.classList.add(this._css.IS_HIDDEN);
    this.loadSpinner.stop();
  };
}

export { PageServices };
