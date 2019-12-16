import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
// import logo from './logo.svg';
// import './style.css';

// ----------------- Pages ------------------
import Landing from "../../pages/Landing";
import Contact from "../../pages/Contact";
import _404 from "../../pages/_404";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/contact" component={Contact} />
        <Route component={_404} />
      </Switch>
    </div>
  );
}

export default App;
