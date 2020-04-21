// ----------------- Dependencies ------------------

import React from 'react';

// ----------------- Stylesheet ------------------

// import './style.css';

// ----------------- Button ------------------

const Button = (props) => {
  return <button className={props.className} disabled={props.disabled} onClick={props.onClick}>{props.value}</button>;
};

export default Button;