import React from "react";
import Cookies from "js-cookie";
import { Route, Redirect } from "react-router-dom";

const UserRoute = ({ children, ...rest }) => {
  const isLoggedIn = Cookies.get("isLoggedIn");

  return isLoggedIn ? <Route {...rest} /> : <Redirect to="/login" />;
};

export default UserRoute;
