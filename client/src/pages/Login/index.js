import { useState } from "react";
import Cookies from "js-cookie";

import Input from "../../components/Form/Input";

import { loginUser } from "../../api/auth";

const Login = () => {
  const [loginForm, setLoginForm] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser(loginForm).then(
      ({ data }) =>
        data.token &&
        Cookies.set("isLoggedIn", true, { expires: 30, path: "/" })
    );
  };

  const handleChange = (e) =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  return (
    <div className="flex items-center justify-center mt-12">
      <form onSubmit={onSubmit} className="flex flex-col space-y-3">
        <Input
          onChange={handleChange}
          name="email"
          type="text"
          placeholder="Email"
        />
        <Input
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
