import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Home from "../Components/Home";
import Dashboard from "../Components/Dashboard";

function Routes() {
  return (
    <Switch>
      <Route path="/home" exact component={Home} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Redirect to="/home" />
    </Switch>
  );
}

export default Routes;
