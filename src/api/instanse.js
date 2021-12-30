import axios from "axios";

export const setDefaultHeaders = (token) => {

  axios.defaults.headers.Authorization = `Token ${token}`;

};

export default axios;
