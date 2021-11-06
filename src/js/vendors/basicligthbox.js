import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import { hideBackdrop } from '../services/pageServices';

const openImage = src => {
  const instance = basicLightbox.create(`
    <img src="${src}" width="800" height="600">
`);

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
