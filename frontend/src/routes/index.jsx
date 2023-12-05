import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Home from "../Components/Home";
import Dashboard from "../Components/Dashboard";
import Overview from "../Components/dashboard/pages/Overview";
import Project from "../Components/dashboard/pages/Project";
import Profile from "../Components/dashboard/pages/Profile";

function Routes() {
  return (
    <Switch>
      <Route path="/home" exact component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      {/* <Route path="/dashboard/overview" exact component={Overview} />
      <Route path="/dashboard/project" exact component={Project} />
      <Route path="/dashboard/profile" exact component={Profile} /> */}
      <Redirect to="/home" />
    </Switch>
  );
}

export default Routes;
