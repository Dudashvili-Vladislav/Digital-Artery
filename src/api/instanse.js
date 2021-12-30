import axios from "axios";

export const setDefaultHeaders = (token) => {
  axios.defaults.headers.token = token;
};

export default axios;
