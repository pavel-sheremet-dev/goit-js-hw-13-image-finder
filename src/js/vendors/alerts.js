import { alert, Stack } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const ALERTS = {
  // MATCH_RESULTS: 'To many matches found',
  // NOT_FOUND: 'This country has not been found. Check country name',
};

const showAlert = (message, title) => {
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
  showAlert(message, title);
};

export { showAlert, showError, ALERTS };
