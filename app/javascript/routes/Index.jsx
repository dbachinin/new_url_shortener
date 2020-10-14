import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Navbar from "../components/Navbar";


export default (
  <>
  <Navbar />
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
    </Switch>
  </Router>
  </>
);