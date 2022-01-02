import axios from "axios";


export default {
  get(page) {
    return axios.get(`http://127.0.0.1:8000/api/feed/posts/ `, {
      headers: {
        page
      }
    })
  },
};
