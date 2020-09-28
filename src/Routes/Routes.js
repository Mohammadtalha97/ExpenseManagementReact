import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
// import '../index.css';
import "../index.css";
// import App from './App';
// import * as serviceWorker from './serviceWorker';
import Registration from "../Component/Registration/Registeration";
import Activate from "../Component/Activate/Activate";
import Login from "../Component/Login/Login";
import Forgot from "../Component/Forgot/Forgot";
import Reset from "../Component/Reset/Reset";
import NotFound from "../Component/NotFound/NotFound";
import Dashboard from "../Component/Dashboard/Dashboard";
import { Provider } from "react-redux";
import { configureStore } from "../Redux/Store/Store";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import Survay from "../Component/Survay/Survay.jsx";

const store = configureStore();

class Routes extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <PrivateRoutes path="/dashboard" exact component={Dashboard} />
            <Route
              path="/"
              exact
              render={(props) => <Registration {...props} />}
            />
            <Route
              path="/login"
              exact
              render={(props) => <Login {...props} />}
            />
            <Route
              path="/survay"
              exact
              render={(props) => <Survay {...props} />}
            />
            <Route
              path="/users/password/forget"
              exact
              render={(props) => <Forgot {...props} />}
            />
            <Route
              path="/users/activate/:token"
              exact
              render={(props) => <Activate {...props} />}
            />
            <Route
              path="/users/password/reset/:token"
              exact
              render={(props) => <Reset {...props} />}
            />
            <Route path="*" exact render={(props) => <NotFound {...props} />} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Routes;
