import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";

import { loginUser, currentUser } from "../../api/authApi";


const Login = ({ history, location }) => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    user && history.push(location.state?.from.pathname || '/')
  }, [user, history, location])

  const [loginForm, setLoginForm] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser(loginForm).then(({ data }) => {
      if (data.success) {
        Cookies.set("isLoggedIn", true, { expires: 30, path: "/", secure: true });
        currentUser().then(({ data }) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: data.data,
          })
        }
        );
      }
    });
  };

  const handleChange = (e) =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

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
