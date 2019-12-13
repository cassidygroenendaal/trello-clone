import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

function Landing() {
  return (
    <div>
      <h1>This is the Landing page!</h1>
      <Link to="/Contact">Contact</Link>
      <Link to="/Contacts">Contacts?</Link>
    </div>
  );
}

export default Landing;
