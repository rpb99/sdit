import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

import { createUser, currentUser } from "../../api/authApi";

const Register = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const [registerForm, setRegisterForm] = useState({});

  useEffect(() => {
    user && history.push("/");
  }, [user, history]);

  const onSubmit = (e) => {
    e.preventDefault();
    createUser(registerForm).then(({ data }) => {
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

  const handleChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center mt-12">
      <form onSubmit={onSubmit} className="flex flex-col space-y-3">
        <input
          onChange={handleChange}
          name="username"
          type="text"
          placeholder="Username"
        />
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
