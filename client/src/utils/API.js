import axios from 'axios';

const BASEURL = process.env.REACT_APP_BASEURL;
const APIKEY = process.env.REACT_APP_APIKEY;

export default {
  search(query) {
    return axios.get(`${BASEURL}${query}${APIKEY}&rating=pg`);
  },
};
