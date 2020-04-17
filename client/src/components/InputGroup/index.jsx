// ----------------- Dependencies ------------------

import React from 'react';

// ----------------- Stylesheet ------------------

// import './style.css';

// ----------------- InputGroup ------------------

const InputGroup = (props) => {
  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type={props.type}
        id={props.name}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>
  );
};

export default InputGroup;