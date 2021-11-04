export default () => {
  return {
    form: document.querySelector('#search-form'),
    input: document.querySelector('[name="query"]'),
    searchBtn: document.querySelector('[data-btn="search"]'),
    gallery: document.querySelector('.js-gallery'),
    loadMoreBtn: document.querySelector('[data-btn="loadMore"]'),
  };
};
