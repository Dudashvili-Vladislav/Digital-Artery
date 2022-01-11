import axios from "axios";

export default {
  get() {
    return axios.get("http://127.0.0.1:8000/api/user/detail/default/");
  },

  create(username = "default", password = "HLhm*Ppsv2q!AXG") {
    return axios.post("http://127.0.0.1:8000/api/user/token/", {
      username,
      password,
    });
  },

  createUsersInDb(username, password) {
    return axios.post("http://127.0.0.1:8000/api/user/create/", {
      username,
      password,
    });
  },
};
