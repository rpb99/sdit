import React from "react";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { logoutUser } from "../../../api/auth";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const handleLogout = () =>
    logoutUser().then(() => {
      Cookies.remove("isLoggedIn", {
        path: "",
        expires: new Date(new Date().getTime() + 5 * 1000),
      });
      dispatch({ type: "LOGOUT", payload: null });
      history.push("/login");
    });

  const HeaderContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    background: rgba(0, 0, 0, 0.24);
    padding: 14px 0;
  `;

  return (
    <HeaderContainer>
      {user ? (
        <>
          <Link to="/profile">{user?.username}</Link>
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
    </HeaderContainer>
  );
};

export default Header;
