import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";

import { logoutUser } from "../../../api/auth";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const handleLogout = () =>
    logoutUser().then(() => {
      Cookies.remove("isLoggedIn", {
        path: "",
        expires: new Date(new Date().getTime() + 5 * 1000),
      });
      dispatch({ type: "LOGOUT", payload: null });
    });

  const isLoggedIn = Cookies.get("isLoggedIn");

  return (
    <div className="flex justify-end bg-red-100 space-x-4 p-6">
      {isLoggedIn ? (
        <>
          {user?.username}
          <div onClick={handleLogout} className="cursor-pointer ml-12">
            Logout
          </div>
        </>
      ) : (
        <>
          <Link className="text-gray-600 hover:text-blue-800" to="/login">
            Login
          </Link>
          <Link className="text-gray-600 hover:text-blue-800" to="/register">
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default Header;
