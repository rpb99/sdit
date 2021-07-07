import { useEffect } from "react";
import Cookies from "js-cookie";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";


import { currentUser } from "./api/authApi";
import PrivateRoute from "./components/routes/PrivateRoute";

// Define Pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Student from "./pages/Students";
import Teacher from "./pages/Teacher";
import StudentDetails from "./pages/StudentDetails";
import NotFound from "./pages/404NotFound";
// User Routes
import Profile from "./pages/Profile";

import * as ROUTES from "./constants";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = Cookies.get("isLoggedIn");


  useEffect(() => {
    if (isLoggedIn) {
      currentUser()
        .then(({ data }) =>
          dispatch({
            type: "LOGGED_IN_USER",
            payload: data.data,
          })
        )
        .catch((({ response }) => {
          console.log(response)
        }));
    }
  }, [dispatch, isLoggedIn]);

  const adminRoutes = [
    {
      path: ROUTES.HOME,
      component: Home,
      exact: true,
      roles: ['admin', 'student']
    },
    {
      path: ROUTES.STUDENTDETAILS,
      component: StudentDetails,
      roles: ['admin']

    },
    {
      path: ROUTES.STUDENTS,
      component: Student,
      roles: ['admin']

    },
    {
      path: ROUTES.TEACHERS,
      component: Teacher,
      roles: ['admin']

    },

    {
      path: ROUTES.PROFILE,
      component: Profile,
      roles: ['admin', 'student']
    },
  ];

  return (
    <BrowserRouter>
      <Switch>
        {adminRoutes.map((route, i) => (
          <PrivateRoute key={i}  {...route} />
        ))}
        <Route path={ROUTES.REGISTER} component={Register} />
        <Route path={ROUTES.LOGIN} component={Login} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
