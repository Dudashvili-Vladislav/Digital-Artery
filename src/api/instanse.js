import axios from "axios";

export const setDefaultHeaders = (token) => {
  console.log(token)
  axios.defaults.headers.Authorization = `Token ${token}`;

};

