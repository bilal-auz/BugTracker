import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

function Routes() {
  return (
    <Switch>
      <Route path="/home" exact component={null} />
      <Redirect to="/home" />
    </Switch>
  );
}

export default Routes;
