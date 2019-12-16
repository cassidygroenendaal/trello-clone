import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

function _404() {
  return (
    <div>
      <h1>This is the 404 page!</h1>
      <Link className="pink" to="/">Home</Link>
    </div>
  );
}

export default _404;
