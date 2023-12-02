import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Home from "../Components/Home";

function Routes() {
  return (
    <Switch>
      <Route path="/home" exact component={Home} />
      <Redirect to="/home" />
    </Switch>
  );
}

export default Routes;
