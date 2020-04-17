// ----------------- Dependencies ------------------

import React, { useState } from 'react';

// ----------------- Stylesheet ------------------

// import './style.css';

// ----------------- InputGroup ------------------

const InputGroupPassword = (props) => {
  const [mask, setMask] = useState(true);

  const toggleMask = (e) => {
    e.preventDefault();
    setMask(!mask);
  };

  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type={mask ? 'password' : 'text'}
        id={props.name}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      <button onClick={toggleMask}>{mask ? props.showGlyph : props.hideGlyph}</button>
    </div>
  );
};

export default InputGroupPassword;