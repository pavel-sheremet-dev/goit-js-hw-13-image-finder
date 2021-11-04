import { alert, error, Stack } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const ALERTS = {
  NOT_FOUND: 'Images was not found. Please change your search query',
};

const showAlert = (title, message) => {
  alert({
    title,
    text: message,
    delay: 2000,
    sticker: false,
    width: '280px',
    stack: new Stack({
      dir1: 'up',
      dir2: 'left',
      firstpos1: 30,
      firstpos2: 30,
      spacing1: 36,
      spacing2: 36,
      push: 'bottom',
      context: document.body,
    }),
  });
};

const showError = ({ title, message }) => {
  error({
    title,
    text: message,
    delay: 2000,
    sticker: false,
    width: '280px',
    stack: new Stack({
      dir1: 'up',
      dir2: 'left',
      firstpos1: 30,
      firstpos2: 30,
      spacing1: 36,
      spacing2: 36,
      push: 'bottom',
      context: document.body,
    }),
  });
};

export { showAlert, showError, ALERTS };
