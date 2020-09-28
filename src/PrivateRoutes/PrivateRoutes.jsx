import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoutes = ({ component: Component, ...rest }) => {
  //console.log(rest)
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("UserEmail") ||
        localStorage.getItem("googleAuthToken") ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/" />
        )
      }
    ></Route>
  );
};

export default PrivateRoutes;
