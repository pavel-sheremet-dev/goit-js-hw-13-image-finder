export default class ApiService {
  #API_KEY = '24136877-bceaa9033dc460acdc4ccde64';
  #BASE_API_URL = 'https://cors-anywhere.herokuapp.com/https://pixabay.com/api/';

  constructor() {
    this.query = '';
    this.page = 1;
    this.per_page = 12;
    this.orientation = 'horizontal';
    this.image_type = 'photo';
    this.results = null;
    this.firstFetchedElemetId = null;
  }

  fetchPictures = searchQuery => {
    this.query = searchQuery;

    const urlParams = new URLSearchParams({
      image_type: this.image_type,
      orientation: this.orientation,
      q: this.query,
      page: this.page,
      per_page: this.per_page,
      key: this.#API_KEY,
    });

    return fetch(`${this.#BASE_API_URL}?${urlParams}`).then(res => {
      if (res.ok) {
        return res.json();
      }
      console.log(res);
      return Promise.reject({
        title: res.status,
        message: res.statusText,
      });
    });
  };

  incrementPage = () => {
    this.page += 1;
  };

  resetPage = () => {
    this.page = 1;
  };

  countTotalResults = () => {
    return this.page * this.per_page;
  };

  getFirstFetchedElemetId = ({ hits }) => {
    console.log(hits);
    this.firstFetchedElemetId = hits[0].id;
  };
}
