const axios = require("axios");

module.exports = () => {
  return axios.create({
    baseURL: process.env.REACT_APP_API,
    timeout: 5000,
    withCredentials: true,
  });
};