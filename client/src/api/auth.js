import axios from "axios";

export const loginUser = async (user) =>
  await axios.post(`${process.env.REACT_APP_API}/login`, user, {
    withCredentials: true,
  });

export const createUser = async (user) =>
  await axios.post(`${process.env.REACT_APP_API}/register`, user, {
    withCredentials: true,
  });

export const logoutUser = async () =>
  await axios.get(`${process.env.REACT_APP_API}/logout`, {
    withCredentials: true,
  });

export const currentUser = async () =>
  await axios.get(`${process.env.REACT_APP_API}/current-user`, {
    withCredentials: true,
  });
