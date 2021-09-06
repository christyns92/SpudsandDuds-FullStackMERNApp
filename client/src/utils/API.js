import axios from 'axios';

const BASEURL = process.env.REACT_APP_BASEURL_OMDB;
const APIKEY = process.env.REACT_APP_APIKEY_OMDB;

export default {
    search(query) {
        return axios.get(`${BASEURL}${query}${APIKEY}&rating=pg`);
    },
};