import axios from 'axios';

const BASE_URL = 'http://localhost:3002/api/v1';

const nlpApi = {
  getRecommendWords: (query) => {
    const url = `${BASE_URL}/recommend?q=${query}`;
    return axios.get(url);
  }
}

export default nlpApi;