const apiAdapter = require('./apiAdapter')

const api = apiAdapter()


export const loginUser = async (user) =>
  await api.post("/login", user);

export const createUser = async (user) =>
  await api.post("/register", user);

export const logoutUser = async () =>
  await api.get("/logout");

export const currentUser = async () =>
  await api.get("/current-user");
