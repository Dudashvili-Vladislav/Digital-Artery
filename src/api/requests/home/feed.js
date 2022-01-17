import axios from "axios";


export default {
  get(page) {
    return axios.get(`/feed/posts/`, {
      params: {
        page
      }
    })
  },

};
