import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

function Contact() {
  return (
    <div>
      <h1>This is the Contact page!</h1>
      <Link to="/">Home</Link>
    </div>
  );
}

export default Contact;
