import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from "./components/global/Layout";

// Define Pages
import Home from "./pages/Home";
import Login from "./pages/Login";

import * as ROUTES from "./constants";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path={ROUTES.LOGIN} component={Login} />
          <Route exact path={ROUTES.HOME} component={Home} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
