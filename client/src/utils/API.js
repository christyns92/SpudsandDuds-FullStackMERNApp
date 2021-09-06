import axios from 'axios';

const BASEURL = process.env.REACT_APP_BASEURL;
const APIKEY = process.env.REACT_APP_APIKEY;

// const BASEURL = "https://www.omdbapi.com/?t="
// const APIKEY = "&apikey=trilogy"


export default {
  search(query) {
    return axios.get(`${BASEURL}${query}${APIKEY}&rating=pg`);
  },
};
