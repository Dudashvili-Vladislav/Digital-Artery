import axios from "../instanse";

export default {
  get(page) {
    console.log(axios.defaults.headers)
    return axios.get(`http://127.0.0.1:8000/api/feed/posts/ `, {
      headers: {
        page: 1,

      }
    });
  },
};
