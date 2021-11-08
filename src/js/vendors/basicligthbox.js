import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import { hideBackdrop } from '../services/pageServices';
import CSS from '../data/css';

const options = {
  onShow: () => {
    document.body.classList.add(CSS.LOCK);
  },
  onClose: () => {
    document.body.classList.remove(CSS.LOCK);
  },
};

const openImage = src => {
  const instance = basicLightbox.create(
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
      hideBackdrop();
    },
    { once: true },
  );
};

export default openImage;
