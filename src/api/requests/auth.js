import axios from "axios";

export default {
  get() {
    return axios.get("user/detail/default/");
  },

  create(username = "default", password = "HLhm*Ppsv2q!AXG") {
    return axios.post("user/token/", {
      username,
      password,
    });
  },

  createUsersInDb(username, password) {
    return axios.post("user/create/", {
      username,
      password,
    });
  },
};


