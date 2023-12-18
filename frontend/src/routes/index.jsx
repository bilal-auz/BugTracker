import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Home from "../Components/Home";
import Dashboard from "../Components/Dashboard";
import Overview from "../Components/dashboard/pages/Overview";
import Project from "../Components/dashboard/pages/Project";
import Profile from "../Components/dashboard/pages/Profile";
import Tst from "../Components/tst";

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/tst" exact component={Tst} />
      <Route path="/" component={Dashboard} />
      {/* <Route path="/dashboard/overview" exact component={Overview} />
      <Route path="/dashboard/project" exact component={Project} />
      <Route path="/dashboard/profile" exact component={Profile} /> */}
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
