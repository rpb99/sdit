import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import styled from "styled-components";

// import Input from "../../components/Form/Input";

import { loginUser, currentUser } from "../../api/auth";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const [loginForm, setLoginForm] = useState({});

  useEffect(() => {
    user && history.push("/");
  }, [user]);

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser(loginForm).then(({ data }) => {
      if (data.token) {
        Cookies.set("isLoggedIn", true, { expires: 30, path: "/" });
        currentUser().then(({ data }) =>
          dispatch({
            type: "LOGGED_IN_USER",
            payload: data,
          })
        );
      }
    });
  };

  const handleChange = (e) =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  const Input = styled.input`
    border-bottom: 1px solid gray;
  `;

  return (
    <div className="flex items-center justify-center mt-12">
      <form onSubmit={onSubmit} className="flex flex-col space-y-3">
        <input
          onChange={handleChange}
          name="email"
          type="text"
          placeholder="Email"
        />
        <input
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Password"
        />
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
