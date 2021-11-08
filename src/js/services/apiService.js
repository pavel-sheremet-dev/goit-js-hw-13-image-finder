import notFoundImageLink from '../../images/broken.png';

export default class ApiService {
  #API_KEY = '24136877-bceaa9033dc460acdc4ccde64';
  #BASE_API_URL = 'https://pixabay.com/api/';

  constructor() {
    this.query = '';
    this.page = 1;
    this.per_page = 12;
    this.orientation = 'horizontal';
    this.image_type = 'photo';
    this.resultsCounter = null;
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
    this.resultsCounter = this.page * this.per_page;
  };

  getFirstFetchedElemetId = ({ hits }) => {
    this.firstFetchedElemetId = hits[0].id;
  };

  getNormalizeData = data => {
    const results = data.hits;
    const normalizeHits = results.map(result => {
      return {
        ...result,
        page: this.page,
        // webformatURL: 'https://cdn.pixabay.com/photo/2015/10/30/20/13/sunrise-101_____4712_150.jpg',
      };
    });
    return {
      ...data,
      hits: normalizeHits,
    };
  };
}
