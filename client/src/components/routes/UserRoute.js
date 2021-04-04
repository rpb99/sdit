import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return user ? <Route {...rest} /> : <Redirect to="/login" />;
};

export default UserRoute;
