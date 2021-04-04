import { useEffect } from "react";
import Cookies from "js-cookie";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Layout from "./components/global/Layout";
import { currentUser } from "./api/auth";
import UserRoute from "./components/routes/UserRoute";

// Define Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/404NotFound";
// User Routes
import UserProfile from "./pages/UserProfile";

import * as ROUTES from "./constants";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = Cookies.get("isLoggedIn");
  useEffect(() => {
    if (isLoggedIn) {
      currentUser().then(({ data }) =>
        dispatch({
          type: "LOGGED_IN_USER",
          payload: data,
        })
      );
    }
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path={ROUTES.REGISTER} component={Register} />
          <Route exact path={ROUTES.LOGIN} component={Login} />
          <Route exact path={ROUTES.HOME} component={Home} />
          <UserRoute exact path={ROUTES.PROFILE} component={UserProfile} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
